const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({
  //tipo de cadastro
  userType: { type: String, required: true, default: "person" },
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
  // avaliações sobre o jogador
  assessments: [{ type: mongoose.Types.ObjectId, ref: "AssessmentUser" }],
  // times onde ele ja jogou
  teams: [{ type: mongoose.Types.ObjectId, ref: "Team" }],
  // partidas ja jogadas
  matches: [{ type: mongoose.Types.ObjectId, ref: "Match" }],
  //foto do jogador
  pictureUrl: {
    type: String,
    trim: true,
    default:
      "https://amar.amr.org.br/packages/trustir/exclusiva/img/user_placeholder.png",
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
