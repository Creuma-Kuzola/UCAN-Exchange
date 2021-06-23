import React, { useEffect, useState } from 'react'

import api from '../../services/api'

const Stats = () => {

  const [stats, setStats] = useState({
    ucan1: { price: 53.32005 },
    ucan2: { price: 3.53323 },
    ucan3: { price: 7.11125 },
  });

  const fetchStats = async () => {
    console.log("chamou")
    try {
      const { data } = await api.get("/stats");
      setStats(data || {});
    } catch (error) {
      // setstats(   []  );
      // window.alert('Ocorreu um erro ao carregar lista de estudantes!')
    }
  }

  useEffect(() => {

    setTimeout(() => {
      fetchStats()
    }, 300);

  }, []);


  return (
    <div className="container p-5" style={{ maxWidth: "700px" }}>

      <div className="card shadow-sm p-5 text-center">
        <p className="h5 mb-3 text-center font-weight-bold">
          PATRIMÓNIO TOTAL
        </p>
        <p>
          Preço por token:
        </p>
        <table className="table table-borderless text-center">
          <thead>
            <tr>
              <th scope="col">UCAN1 Token</th>
              <th scope="col">UCAN2 Token</th>
              <th scope="col">UCAN3 Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="h4 font-weight-bold">{stats.ucan1.price || 0}</td>
              <td className="h4 font-weight-bold">{stats.ucan2.price || 0}</td>
              <td className="h4 font-weight-bold">{stats.ucan3.price || 0}</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-5">
          Fórmula para cálculo do património:
        </p>
        <p className="h4 font-weight-bold">
          num. token + valor (unid) / burned
        </p>
      </div>
    </div>
  );
}

export default Stats;
