const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const mockedStudents = require("../../data/students.data.json");

exports.StudantModel = mongoose.model(
  "Student",
  new Schema({
    idEstudante: { type: Number, required: true },
    nome: { type: String, required: true, trim: true },
    idConta: { type: String, trim: true },
    privateKey: { type: String, trim: true },
    email: { type: String, trim: true },

    token1: { type: Number, default: 0 },
    token2: { type: Number, default: 0 },
    token3: { type: Number, default: 0 },
    patrimonio: { type: Number, default: 0 },
    nota: { type: Number, default: 0 },
  })
);

const Student = mongoose.model("Student");

exports.getStudents = async (req, res) => {
  try {
    const data = await Student.find();
    return res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const data = await Student.findById(req.params.id);
    return res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.createStudent = async (req, res) => {
  try {
    const data = await Student.create({ ...req.body });
    res.status(201).send({ message: "Entidade salvo com sucesso!", data });
  } catch (error) {
    res.status(400).send({ message: "Falha ao salvar Entidade!", error });
  }
};

exports.createManyStudents = async (req, res) => {
  try {
    req.body.students.forEach(async(student) => {
      await Student.create({ ...student });
    });
    res.status(201).send({ message: "Entidades salvas com sucesso!" });
  } catch (error) {
    res.status(400).send({ message: "Falha ao salvar Entidades!", error });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const data = await Student.findByIdAndUpdate(req.params.id, {
      $set: { ...req.body },
    });
    res
      .status(200)
      .send({ message: "Entidade actualizado com sucesso!", data }); //sucesso
  } catch (error) {
    res
      .status(400)
      .send({ message: "ERRO: Falha ao atualizar Entidade", error });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const data = await Student.findByIdAndRemove(req.params.id);
    res.status(200).send({ message: "Entidade eliminado com sucesso!", data });
  } catch (error) {
    res
      .status(400)
      .send({ message: "ERRO: Falha ao eliminar Entidade", error });
  }
};
