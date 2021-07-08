import { Box, Button, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import {
  StudentsTableColumns,
  StudentsTableOptions,
} from "./students-table.helpers";
// import studentsData from "../../../data/students.data.json"

const Dashboard = () => {
  const { push } = useHistory();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exchangeBalance, setExchangeBalance] = useState({
    ucana: 0.0,
    ucane: 0.0,
    ucanu: 0.0,
  });

  const fetchAllStudents = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await api.get("/students");
      setStudents(data || []);
    } catch (error) {
      toast.error(
        `Ocorreu um erro ao carregar lista de estudantes: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const getExchangeBalance = async () => {
    try {
      const { data } = await api.get("/balance");
      setExchangeBalance(data || {});
    } catch (error) {
      toast.error(`Ocorreu um erro ao carregar dados: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchAllStudents();
    getExchangeBalance();
  }, []);

  return (
    <Paper elevation={2} className="p-4">
      <div className="d-flex justify-content-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => push("/register")}
          className="font-weight-bold"
        >
          Novo Estudante
        </Button>
      </div>
      <MUIDataTable
        title="Lista de Estudantes"
        data={students}
        columns={StudentsTableColumns}
        options={StudentsTableOptions}
      />

      <Paper elevation={3} className="p-4">
        <Box mt={4} mb={3} textAlign="center">
          <Typography variant="h5" color="primary">
            TOTAIS DE CADA MOEDA
          </Typography>
        </Box>

        <Box display="flex">
          <Typography variant="h6">TOTAL DE UCANA: </Typography>
          <Typography className="ml-2" variant="h6" color="secondary">
            {`  ${exchangeBalance.ucana || 0.0}`}
          </Typography>
        </Box>

        <Box my={3} display="flex">
          <Typography variant="h6">TOTAL DE UCANE: </Typography>
          <Typography className="ml-2" variant="h6" color="secondary">
            {`  ${exchangeBalance.ucane || 0.0}`}
          </Typography>
        </Box>

        <Box display="flex">
          <Typography variant="h6">TOTAL DE UCANU: </Typography>
          <Typography className="ml-2" variant="h6" color="secondary">
            {`  ${exchangeBalance.ucanu || 0.0}`}
          </Typography>
        </Box>
      </Paper>
    </Paper>
  );
};

export default Dashboard;
