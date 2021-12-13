const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const GroupSchema = new Schema({
  // Nome do Grupo
  name: { type: String, trim: true },
  // categoria
  category: { type: String, trim: true },
  // nivel
  level: { type: String, trim: true },
  // Data de inicio
  startDate: { type: String, trim: true },
   // Data Fim
   endDate: { type: String, trim: true },  
   Establishment: [{ type: mongoose.Types.ObjectId, ref: "Establishment" }],
});

const GroupModel = model("Group", GroupSchema);
module.exports = GroupModel;