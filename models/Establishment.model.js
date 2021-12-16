const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const EstablishmentSchema = new Schema({
  //tipo de cadastro
  userType: { type: String, required: true, default: "establishment" },
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
  pictureUrl: { type: String, trim: true, default: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png" },
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
  phone: { type: Number, required: true, trim: true },
  // abertura de fechamento diário
  openingTime: {
    domingo: { type: String, trim: true },
    segunda: { type: String, trim: true },
    terça: { type: String, trim: true },
    quarta: { type: String, trim: true },
    quinta: { type: String, trim: true },
    sexta: { type: String, trim: true },
    sabado: { type: String, trim: true },
  },
  // horário de fechamento diário
  closingTime: {
    domingo: { type: String, trim: true },
    segunda: { type: String, trim: true },
    terça: { type: String, trim: true },
    quarta: { type: String, trim: true },
    quinta: { type: String, trim: true },
    sexta: { type: String, trim: true },
    sabado: { type: String, trim: true },
  },
  // equipamentos tipo bola, colete, taco raquete etc...
  availableEquipment: [{ type: String, trim: true }],
  // tipos de campos que se tem disponivel para poder filtrar por esporte que se quer jogar
  fieldTypes: { type: String, trim: true, required: true},
  // lista de campos para selecionar na reserva
  fields: [{ type: mongoose.Types.ObjectId, ref: "Field" }],
  
});

const EstablishmentModel = model("Establishment", EstablishmentSchema);

module.exports = EstablishmentModel;
