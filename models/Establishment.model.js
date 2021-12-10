const { Schema, model } = require("mongoose");

const EstablishmentSchema = new Schema({
  // nome do local
  name: { type: String, required: true, trim: true },
  // email de cadastro
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true, trim: true },
  // foto da fachada
  pictureUrl: { type: String, trim: true },
  // endereço detalhado
  adress: {
    street: { type: String, required: true, trim: true },
    number: { type: Number, required: true, trim: true },
    Bairro: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    cep: { type: Number, required: true, trim: true },
  },
  // números para contato
  phone: [{ type: Number, required: true, trim: true }],
  // abertura de fechamento diário
  openingTime: {
    domingo: { type: Date, required: true, trim: true },
    segunda: { type: Date, required: true, trim: true },
    terça: { type: Date, required: true, trim: true },
    quarta: { type: Date, required: true, trim: true },
    quinta: { type: Date, required: true, trim: true },
    sexta: { type: Date, required: true, trim: true },
    sabado: { type: Date, required: true, trim: true },
  },
  // horário de fechamento diário
  closingTime: {
    domingo: { type: Date, required: true, trim: true },
    segunda: { type: Date, required: true, trim: true },
    terça: { type: Date, required: true, trim: true },
    quarta: { type: Date, required: true, trim: true },
    quinta: { type: Date, required: true, trim: true },
    sexta: { type: Date, required: true, trim: true },
    sabado: { type: Date, required: true, trim: true },
  },
  // equipamentos tipo bola, colete, taco raquete etc...
  availableEquipment: [{ type: String, trim: true }],
  // tipos de campos que se tem disponivel para poder filtrar por esporte que se quer jogar
  fieldTypes: [{ type: String, required: true, trim: true }],
  // lista de campos para selecionar na reserva
  fields: [{ type: mongoose.Types.ObjectId, ref: "Field" }],
  available: { type: Boolean, required: true, enum: [true, false] },
});

const EstablishmentModel = model("Establishment", EstablishmentSchema);

module.exports = EstablishmentModel;
