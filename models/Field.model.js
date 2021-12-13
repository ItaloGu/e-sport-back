const { Schema, model } = require("mongoose");

const FieldSchema = new Schema({
  // para diferencial quadras no estabelecimento
  name: { type: String, required: true, trim: true },
  // esportes suportados na quadra
  fieldType: [{ type: String, required: true, trim: true },],
  // imagem da quadra
  fieldImage: { type: String, trim: true },
  // preço da reserva da quadra
  pricePerHour: { type: Number, required: true, trim: true },
  // referencia de qual estabelecimento se refere a quadra
  establishment: [{ type: mongoose.Types.ObjectId, ref: "Establishment" }],
  // se a quadra esta disponivel para reserva
  available: { type: Boolean, required: true, enum: [true, false] },
});

const FieldModel = model("Field", FieldSchema);

module.exports = FieldModel;
