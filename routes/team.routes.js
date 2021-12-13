
const express = require("express");
const router = express.Router();
const TeamModel = require("../models/Team.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const uploader = require("../config/cloudinary.config");

// CRUD

// Upload
router.post(
    "/upload",
    isAuthenticated,
    uploader.single("picture"),
    (req, res) => {
      if (!req.file) {
        return res.status(500).json({ msg: "Upload de arquivo falhou." });
      }
  
      return res.status(201).json({ url: req.file.path });
    }
  );

// Crud Create (POST)

router.post("/new", async (req, res) => {
  try {
    // Extrair as informações do corpo da requisição
    console.log(req.body);

    // Inserir no banco
    const team = await TeamModel.create(req.body);

    // Responder a requisição
    // Pela regra do REST, a resposta de uma inserção deve conter o registro recém-inserido com status 201 (Created)
    res.status(201).json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Lista)

router.get("/list", async (req, res) => {
  try {
    // Buscar as informações no banco
    const team = await TeamModel.find();

    // Responder a requisição
    res.status(200).json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Detalhe)

router.get("/:id", async (req, res) => {
  try {
    // Buscar as informações no banco
    const team = await TeamModel.findOne({ _id: req.params.id });

    // Verificar se o banco encontrou o time
    if (!team) {
      return res.status(404).json({ msg: "Time não encontrado." });
    }

    // Responder a requisição
    res.status(200).json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT => substituição (destrutiva)
// PATCH => atualização (não-destrutiva)

// crUd Update (PATCH)
router.patch("/:id", async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição

    // Atualizar o registro
    const team = await TeamModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!team) {
      return res.status(404).json({ msg: "Time não encontrado." });
    }

    res.status(200).json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cruD Delete (DELETE)

router.delete("/:id", async (req, res) => {
  try {
    const team = await TeamModel.deleteOne({ _id: req.params.id });

    if (team.deletedCount < 1) {
      return res.status(404).json({ msg: "Time não encontrado" });
    }

    // Pela regra do REST, deleções devem retornar um objeto vazio
    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;