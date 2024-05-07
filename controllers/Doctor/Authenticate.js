const Doctor= require("../../models/Doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator');
require('dotenv').config({ path: '../../config/.env' });

exports.LoginUser = async (req, res) => {
  
  const { email, password } = req.body;

  try {
    const user = await Doctor.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id },process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Set the token to the header
    res.setHeader("Authorization", `Bearer ${token}`);

    return res
      .status(200)
      .json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.SignupUser = async (req, res) => {
  const { name, email, password ,experience , specialities , qualification,gender,seat,locality} = req.body;
  
 
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the details carefully",
    });
  }


  // if (name.length<3) {
   
  //   return res.status(400).json({
  //     success: false,
  //     message: "Name should be at least 3 characters long",
  //   });
  // }

  // if (!validator.isEmail(email)) {
   
  //   return res.status(400).json({
  //     success: false,
  //     message: "Invalid email address",
  //   });
  // }

  // if (password.length<5) {
  //   //console.log("kdgfkngvkwns");
  //   return res.status(400).json({
  //     success: false,
  //     message: "Password should be at least 5 characters long",
  //   });
  // }

  try {
    const result = await Doctor.findOne({ email });
    if (result != null) {
      return res
        .status(500)
        .json({ success: false, message: "Already User Exist" });
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("Internal Server error");
      }
      try {
      
        const user = new Doctor({ name, email, password: hash ,experience , specialities , qualification,gender,seat,locality});
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });

        // Set the token to the header
        res.setHeader("Authorization", `Bearer ${token}`);

        return res
          .status(200)
          .json({ success: true, message: "Register successful", token });
      } catch (err) {
        console.error("Error saving user:", err);
        return res.status(500).send("Internal Server error");
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server error");
  }
};

exports.Forget = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the details carefully",
    });
  }
  try {
    const result = await Doctor.findOne({ email });
    if (result == null) {
      return res
        .status(500)
        .json({ success: false, message: "User do not Exist" });
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("Internal Server error");
      }
      try {
        result.password = hash;
        await result.save();
        return res
          .status(200)
          .json({ success: true, message: "Password Reset Successfully " });
      } catch (err) {
        console.error("Error saving user:", err);
        return res.status(500).send("Internal Server error");
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server error");
  }
};
