const mongoose = require("mongoose");
const { Schema } = mongoose;

const DoctorSchema = new Schema({
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
  specialities: {
    type: String,
    require: true,
  },



  
  locality:{
    type: String,
    require: true,

  },
  gender:{
    type: String,
    require: true,
  },
  seat:{
    type: String,
    require: true,
  },



  experience: {
    type: String,
    require: true,
  },
  qualification: {
    type: String,
    require: true,
  },
  bookslots:[]
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;
