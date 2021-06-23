import React from 'react'
import MUIDataTable from 'mui-datatables';
import Paper from "@material-ui/core/Paper"
import { useState } from 'react';
import { useEffect } from 'react';

import studentsData from "../../../data/students.data.json"
import api from '../../services/api'
import { StudentsTableColumns, StudentsTableOptions } from "./students-table.helpers"

const Dashboard = () => {
  const [students, setStudents] = useState([])

  const fetchAllStudents = async () => {
    try {
      const { data } = await api.get("/students");
      setStudents(data || []);
    } catch (error) {
      // setStudents(   []  );
      // window.alert('Ocorreu um erro ao carregar lista de estudantes!')
    }
  }

  useEffect(() => {
    fetchAllStudents()
  }, []);


  return (
    <Paper elevation={3} className="p-4">
      <MUIDataTable
        title="Lista de Estudantes"
        data={studentsData || students}
        columns={StudentsTableColumns}
        options={StudentsTableOptions}
      />
    </Paper>
  );
}

export default Dashboard;
