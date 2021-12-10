const { Schema, model } = require("mongoose");

const FieldSchema = new Schema({
  name: { type: String, required: true, trim: true },
  fieldType: { type: String, required: true, trim: true },
  fieldImage: { type: String, trim: true },
  pricePerHour: { type: Number, required: true, trim: true },
  establishment: [{ type: mongoose.Types.ObjectId, ref: "Establishment" }],
});

const FieldModel = model("Field", FieldSchema);

module.exports = FieldModel;
