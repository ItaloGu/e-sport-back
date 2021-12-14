const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const MatchModel = require("../models/Match.model");

// CRUD
// Crud Create (POST)
router.post("/match/new", isAuthenticated, async (req, res) => {
  try {
    console.log(req.body);
    const match = await MatchModel.create(req.body);
    res.status(201).json(match);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET)

router.get("/match/list", isAuthenticated, async (req, res) => {
  try {
    // Buscar as informações no banco
    const match = await MatchModel.find();
    // Responder a requisição
    res.status(200).json(match);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Detalhe)

router.get("/match/:id", isAuthenticated, async (req, res) => {
  try {
    const match = await MatchModel.findOne({ _id: req.params.id });
    if (!match) {
      return res.status(404).json({ msg: "Partida não encontrada." });
    }
    res.status(200).json(match);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.patch("/match/:id", isAuthenticated, async (req, res) => {
  try {

    const match = await MatchModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!match) {
      return res.status(404).json({ msg: "Partida não encontrada." });
    }

    res.status(200).json(match);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cruD Delete (DELETE)

router.delete("/match/:id", isAuthenticated, async (req, res) => {
  try {
    const match = await MatchModel.deleteOne({ _id: req.params.id });
    if (match.deletedCount < 1) {
      return res.status(404).json({ msg: "Partida não encontrada" });
    }

    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;