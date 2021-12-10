const { Schema, model } = require("mongoose");

const EstablishmentSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true, trim: true },
  pictureUrl: { type: String, trim: true },
  adress: {
    street: { type: String, required: true, trim: true },
    number: { type: Number, required: true, trim: true },
    Bairro: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    cep: { type: Number, required: true, trim: true },
  },
  phone: { type: Number, required: true, trim: true },
  openingTime: {
    domingo: { type: Date, required: true, trim: true },
    segunda: { type: Date, required: true, trim: true },
    terça: { type: Date, required: true, trim: true },
    quarta: { type: Date, required: true, trim: true },
    quinta: { type: Date, required: true, trim: true },
    sexta: { type: Date, required: true, trim: true },
    sabado: { type: Date, required: true, trim: true },
  },
  closingTime: {
    domingo: { type: Date, required: true, trim: true },
    segunda: { type: Date, required: true, trim: true },
    terça: { type: Date, required: true, trim: true },
    quarta: { type: Date, required: true, trim: true },
    quinta: { type: Date, required: true, trim: true },
    sexta: { type: Date, required: true, trim: true },
    sabado: { type: Date, required: true, trim: true },
  },
  availableEquipment: [{ type: String, trim: true }],
  fieldTypes: [{ type: String, required: true, trim: true }],
  fields: [
    {
      name: { type: String, required: true, trim: true },
      fieldType: { type: String, required: true, trim: true },
      fieldImage: { type: String, trim: true },
    },
  ],
});

const UserModel = model("Establishment", EstablishmentSchema);

module.exports = EstablishmentModel;
