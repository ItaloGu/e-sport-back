const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const AssessmentUserSchema = new Schema({
  // Data
  data: { type: Date},
  // velocidade
  velocity: { type: Number, required: true, trim: true },
  // chute
  kick: { type: Number, required: true, trim: true },
  // passe
  pass: { type: Number, required: true, trim: true },
  // marcação
  marking: { type: Number, required: true, trim: true },
   // Drible
  dribble: { type: Number, required: true, trim: true },
  // referencia de qual usuario de refere a avaliação
  user: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

const AssessmentUserModel = model("AssessmentUser", AssessmentUserSchema);
module.exports = AssessmentUserModel;