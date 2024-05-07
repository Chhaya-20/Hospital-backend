const mongoose = require("mongoose");
const { Schema } = mongoose;

const PatientSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  Contact:{
   type:String,
   require:true
 },
 bookslots:[]
});

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
