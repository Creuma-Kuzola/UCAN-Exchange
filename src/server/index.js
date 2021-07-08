const BodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const cors = require("cors");
const { Router } = require('express')

const {
  getStudents,
  getStudentById,
  createManyStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("./controllers/students-controller");

const router = Router()
const app = express()
const port = 8000
const url = "mongodb://127.0.0.1:27017/exchange"

// eslint-disable-next-line no-unused-expressions
require("./controllers/students-controller").StudantModel;

mongoose.Promise = global.Promise
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("BD Conectado com sucesso!")
}).catch((erro) => {
  console.log("Erro ao conectar à BD")
})

app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors());

app.get('/api/', (req, res) => {
  res.render('index')
})

app.get('/api/stats', (req, res) => {
  res.render('index')
})

const studentRoute = '/api/students';
app.use(studentRoute, router.get("/", getStudents));
app.use(studentRoute, router.post("/", createStudent));
app.use(studentRoute, router.post("/create-many", createManyStudents));
app.use(studentRoute, router.get("/:id", getStudentById));
app.use(studentRoute, router.delete("/:id", deleteStudent));
app.use(studentRoute, router.put("/:id", updateStudent));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
