const isAuthenticated = require("../middlewares/isAuthenticated");
const express = require("express");
const router = express.Router();
const FieldModel = require("../models/Field.model")
const uploader = require("../config/cloudinary.config");


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

router.post("/", isAuthenticated, async (req, res) => {
  try {

    const result = await FieldModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {

    res.status(500).json(err);
  }
});

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const field = await FieldModel.find();

    res.status(200).json(field);
  } catch (err) {

    res.status(500).json(err);
  }
});

router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const field = await FieldModel.findOne({ _id: req.params.id });

    if (!field) {
      return res.status(404).json({ msg: "Quadra não encontrado." });
    }

    res.status(200).json(field);
  } catch (err) {

    res.status(500).json(err);
  }
});

router.patch("/:id", isAuthenticated, async (req, res) => {
  try {
    const field = await FieldModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!field) {
      return res.status(404).json({ msg: "Quadra não encontrado." });
    }

    res.status(200).json(field);
  } catch (err) {

    res.status(500).json(field);
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const field = await FieldModel.deleteOne({ _id: req.params.id });

    if (field.deletedCount < 1) {
      return res.status(404).json({ msg: "Não encontrado" });
    }

    res.status(200).json({});
  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router;