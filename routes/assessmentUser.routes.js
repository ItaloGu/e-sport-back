const express = require("express");
const router = express.Router();
const AssessmentUserModel = require("../models/AssessmentUser.model");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

// CRUD
// Crud Create (POST)
router.post("/assessmentuser/new", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    console.log(req.body);
    const assessmentuser = await AssessmentUserModel.create(req.body);
    res.status(201).json(assessmentuser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET)

router.get("/assessmentuser/list", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    // Buscar as informações no banco
    const assessmentuser = await AssessmentUserModel.find();
    // Responder a requisição
    res.status(200).json(assessmentuser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Detalhe)

router.get("/assessmentuser/:id", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    const assessmentuser = await AssessmentUserModel.findOne({ _id: req.params.id });
    if (!assessmentuser) {
      return res.status(404).json({ msg: "Avaliação não encontrada." });
    }
    res.status(200).json(assessmentuser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.patch("/assessmentuser/:id", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {

    const assessmentuser = await AssessmentUserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!assessmentuser) {
      return res.status(404).json({ msg: "Avaliação não encontrada." });
    }

    res.status(200).json(assessmentuser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cruD Delete (DELETE)

router.delete("/assessmentuser/:id", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    const assessmentuser = await AssessmentUserModel.deleteOne({ _id: req.params.id });
    if (assessmentuser.deletedCount < 1) {
      return res.status(404).json({ msg: "Avaliação não encontrada" });
    }

    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;