const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const DetailUserSchema = new Schema({
  // para associar o registro de usuario a tabela 
  user: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  // data de nascimento
  birthday: { type: String, trim: true },
  // Genero
  gender: { type: String, trim: true },
  // Estado
  district: { type: String, trim: true },
  // Municipio
  city: { type: String, trim: true },
  // ambidestro
  ambidextrous: { type: String, trim: true },
  // Goleiro, atacante, zagueiro etc...
  position: { type: String, trim: true },
});

const DetailUserModel = model("DetailUser", DetailUserSchema);
module.exports = DetailUserModel;