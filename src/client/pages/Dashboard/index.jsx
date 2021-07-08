import React from "react";
import MUIDataTable from "mui-datatables";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// import studentsData from "../../../data/students.data.json"
import api from "../../services/api";
import {
  StudentsTableColumns,
  StudentsTableOptions,
} from "./students-table.helpers";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const Dashboard = () => {
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
        `Ocorreu um erro ao carregar lista de estudantes!: ${error.message}`
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
    //  getExchangeBalance()
  }, []);

  return (
    <Paper elevation={2} className="p-4">
      <MUIDataTable
        title="Lista de Estudantes"
        data={students}
        columns={StudentsTableColumns}
        options={StudentsTableOptions}
      />

      <Paper elevation={3} className="p-4">
        <Box mt={4} mb={3} textAlign="center">
          <Typography variant="h3" color="primary">
            TOTAIS DE CADA MOEDA
          </Typography>
        </Box>

        <Box display="flex">
          <Typography variant="h4">TOTAL DE UCANA:</Typography>
          <Typography variant="h4" color="secondary">
            {`  ${exchangeBalance.ucana || 0.0}`}
          </Typography>
        </Box>

        <Box my={3} display="flex">
          <Typography variant="h4">TOTAL DE UCANE:</Typography>
          <Typography variant="h4" color="secondary">
            {`  ${exchangeBalance.ucane || 0.0}`}
          </Typography>
        </Box>

        <Box display="flex">
          <Typography variant="h4">TOTAL DE UCANU:</Typography>
          <Typography variant="h4" color="secondary">
            {`  ${exchangeBalance.ucanu || 0.0}`}
          </Typography>
        </Box>
      </Paper>
    </Paper>
  );
};

export default Dashboard;
