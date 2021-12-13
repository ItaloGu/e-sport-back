const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const TeamSchema = new Schema({
  // Nome completo
  name: { type: String, trim: true },
  // Sigla para uso em tela resumida
  sigla: { type: String, trim: true },
  // ULR imagem do time
  ulrImagem: { type: String, trim: true },
  //Jogadores do time
  players: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

const teamModel = model("Team", TeamSchema);
module.exports = teamModel;
