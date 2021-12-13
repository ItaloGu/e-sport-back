const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

const GroupModel = require("../models/Group.model");

// CRUD

// Crud Create (POST)

router.post("/new", isAuthenticated, async (req, res) => {
  try {
    // Extrair as informações do corpo da requisição
    console.log(req.body);

    // Inserir no banco
    const group = await GroupModel.create(req.body);

    // Responder a requisição
    res.status(201).json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Lista)

router.get("/list", isAuthenticated, async (req, res) => {
  try {
    // Buscar as informações no banco
    const group = await GroupModel.find();

    // Responder a requisição
    res.status(200).json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Lista por estabelecimento)

router.get("/list/:id", isAuthenticated, async (req, res) => {
    try {
      // Buscar as informações no banco
      // este id é do estabelecimento que o grupo se encontra
      const group = await GroupModel.find({ establishment: [req.params.id] });
  
      // Responder a requisição
      res.status(200).json(group);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// cRud Read (GET) (Detalhe)

router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    // Buscar as informações no banco
    const group = await GroupModel.findOne({ _id: req.params.id });

    // Verificar se o banco encontrou o produto
    if (!group) {
      return res.status(404).json({ msg: "Grupo não encontrado." });
    }

    // Responder a requisição
    res.status(200).json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// crUd Update (PATCH)
router.patch("/:id", isAuthenticated, async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição

    // Atualizar o registro
    const group = await GroupModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!group) {
      return res.status(404).json({ msg: "Grupo não encontrado." });
    }

    res.status(200).json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cruD Delete (DELETE)

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const group = await GroupModel.deleteOne({ _id: req.params.id });

    if (group.deletedCount < 1) {
      return res.status(404).json({ msg: "Grupo não encontrado" });
    }

    // Pela regra do REST, deleções devem retornar um objeto vazio
    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;