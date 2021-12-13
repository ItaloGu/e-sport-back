const { Schema, model } = require("mongoose");

const groupSchema = new Schema({
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

const groupModel = model("group", groupSchema);
module.exports = groupModel;