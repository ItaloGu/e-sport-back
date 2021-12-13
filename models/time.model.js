const { Schema, model } = require("mongoose");

const timeSchema = new Schema({
  // Nome completo 
  name: { type: String, trim: true },
  // Sigla para uso em tela resumida
  sigla: { type: String, trim: true },
  // ULR imagem do time
  ulrImagem: { type: String, trim: true },  
});

const timeModel = model("time", timeSchema);
module.exports = timeModel;