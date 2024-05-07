const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient")

exports.fetchDoctor = async (req, res, next) => {
  const doctor = req.headers.authorization; 
  console.log("here")

 
  if (!doctor) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }
  const tokenParts = doctor.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token format" });
  }

  const tokenValue = tokenParts[1];

  jwt.verify(tokenValue, "Chhaya@10", async (err, decodedToken) => {
    if (err) {
      // Token is invalid or expired
      return res.status(401).json({ success: false, message: "Unauthorized" });
    } else {
      const userId = decodedToken.userId;
     
      const user = await Doctor.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      } else {
        req.user = user; 
        next(); 
      }
    }
  });
};


exports.fetchPatient = async (req, res, next) => {
  const patient = req.headers.authorization; 
 
  if (!patient) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }
  const tokenParts = patient.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token format" });
  }

  const tokenValue = tokenParts[1];

  jwt.verify(tokenValue, "Chhaya@10", async (err, decodedToken) => {
    if (err) {
      // Token is invalid or expired
      return res.status(401).json({ success: false, message: "Unauthorized" });
    } else {
      const userId = decodedToken.userId;
     
      const user = await Patient.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      } else {
        req.user = user; 
        next(); 
      }
    }
  });
};



exports.fetchDoctor1 = async(req,res,next)=>{
  console.log("here")
  const doctor = req.headers.authorization;
  console.log(doctor);
  const tokenParts = doctor.split(" ");
 

  const tokenValue = tokenParts[1];
  
  const user = await Doctor.findById(tokenValue);
  console.log(user)
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found" });
  } else {
    req.user = user; 
    next(); 
  }

}