const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const vaSchema = new Schema({
  ifsc: {
    type: String
  },
  bank_id: {
    type: String
  },
  branch: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  district: {
    type: String
  },
  state: {
    type: String
  },
  bank_name: {
    type: String
  }
});

mongoose.model("newdata", vaSchema, "newdata");
