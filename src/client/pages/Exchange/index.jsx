import { Button } from '@material-ui/core';
import React from 'react'
import dai from '../../assets/dai.png'

const Exchange = ({
  stakingBalance,
  dappTokenBalance,
  daiTokenBalance,
  unstakeTokens
}) => {

  return (
    <div className="container p-5" style={{ maxWidth: "600px" }}>

      <table className="table table-borderless text-muted text-center">
        <thead>
          <tr>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{window.web3.utils.fromWei(stakingBalance, 'Ether')} mDAI</td>
            <td>{window.web3.utils.fromWei(dappTokenBalance, 'Ether')} DAPP</td>
          </tr>
        </tbody>
      </table>

      <div className="card shadow-sm p-4">

        <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let amount
          amount = this.input.value.toString()
          amount = window.web3.utils.toWei(amount, 'Ether')
          this.props.stakeTokens(amount)
        }}>
          <div>
            <label className="float-left"><b>Stake Tokens</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(daiTokenBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              ref={(input) => { this.input = input }}
              className="form-control form-control-lg"
              placeholder="0"
              required />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={dai} height='32' alt="" />
                &nbsp;&nbsp;&nbsp; mDAI
              </div>
            </div>
          </div>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className="p-2"
          >
            STAKE!
          </Button>
        </form>

        <Button
          variant="text"
          className="p-2"
          onClick={(event) => {
            event.preventDefault()
            unstakeTokens()
          }}>
          UN-STAKE...
        </Button>

      </div>
    </div>
  );
}

export default Exchange;
