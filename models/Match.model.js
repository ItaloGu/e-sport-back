const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const MatchSchema = new Schema({
  // Data 
  data: { type: Date},
  // Numero de gols
  resultTeam1: { type: String, trim: true },
  resulTeam2: { type: String, trim: true },
  team1: [{ type: mongoose.Types.ObjectId, ref: "Team" }],
  team2: [{ type: mongoose.Types.ObjectId, ref: "Team" }],
});

const MatchModel = model("Match", MatchSchema);
module.exports = MatchModel;