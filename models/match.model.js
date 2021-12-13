const { Schema, model } = require("mongoose");

const matchSchema = new Schema({
  // Data 
  data: { type: Date},
  // Numero de gols
  resultTime1: { type: String, trim: true },
  resultTime2: { type: String, trim: true },
  time1: [{ type: mongoose.Types.ObjectId, ref: "time" }],
  time2: [{ type: mongoose.Types.ObjectId, ref: "time" }],
});

const matchModel = model("match", matchSchema);
module.exports = matchModel;