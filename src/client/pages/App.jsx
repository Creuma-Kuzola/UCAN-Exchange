import React, { Component } from "react";
import Web3 from "web3";
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ucana from "../../abis/ucana.json";
import ucane from "../../abis/ucane.json";
import TokenFarm from "../../abis/TokenFarm.json";
import Navbar from "../components/Navbar";

import ExchangePage from "./Exchange";
import DashboardPage from "./Dashboard";
import RegisterPage from "./Register";
import StatsPage from "./Stats";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = web3.eth ? await web3.eth.getAccounts() : [""];
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();

    // Load ucana
    const ucanaData = ucana.networks[networkId];
    if (ucanaData) {
      const ucana = new web3.eth.Contract(ucana.abi, ucanaData.address);
      this.setState({ ucana });
      let ucanaBalance = await ucana.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ ucanaBalance: ucanaBalance.toString() });
    } else {
      window.alert("ucana contract not deployed to detected network.");
    }

    // Load ucane
    const ucaneData = ucane.networks[networkId];
    if (ucaneData) {
      const ucane = new web3.eth.Contract(ucane.abi, ucaneData.address);
      this.setState({ ucane });
      let ucaneBalance = await ucane.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ ucaneBalance: ucaneBalance.toString() });
    } else {
      window.alert("ucane contract not deployed to detected network.");
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId];
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        TokenFarm.abi,
        tokenFarmData.address
      );
      this.setState({ tokenFarm });
      let stakingBalance = await tokenFarm.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert("TokenFarm contract not deployed to detected network.");
    }

    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  stakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.ucana.methods
      .approve(this.state.tokenFarm._address, amount)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.state.tokenFarm.methods
          .stakeTokens(amount)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });
          });
      });
  };

  unstakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.tokenFarm.methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      ucana: {},
      ucane: {},
      tokenFarm: {},
      ucanaBalance: "0",
      ucaneBalance: "0",
      stakingBalance: "0",
      loading: true,
      students: [],
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar account={this.state.account} />
          <main className="container-fluid mt-5 p-5">
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to={"/register"} />}
              />
              <Route path="/register" component={RegisterPage} />
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/stats" component={StatsPage} />
              <Route
                path="/exchange"
                component={() =>
                  this.state.loading ? (
                    <p id="loader" className="text-center">
                      Procurando conectar com uma rede local ...
                    </p>
                  ) : (
                    <ExchangePage
                      ucanaBalance={this.state.ucanaBalance}
                      ucaneBalance={this.state.ucaneBalance}
                      stakingBalance={this.state.stakingBalance}
                      stakeTokens={this.stakeTokens}
                      unstakeTokens={this.unstakeTokens}
                    />
                  )
                }
              />
              <Route path="*" component={<Redirect to={"/"} />} />
            </Switch>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar
            />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
