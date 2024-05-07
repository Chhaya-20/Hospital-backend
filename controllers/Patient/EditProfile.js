const Patient = require("../../models/Patient");
const validator = require('validator');

exports.EditProfile=async(req,res)=>{
    const id = req.user.id;
  const {name,email,password,age,Contact} = req.body;
  try {
    const patient = await Patient.findOne({ _id: id });
  
    // Check if the doctor exists
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    if(name)
    {
patient.name=name;
    }
    if(email)
    {
      patient.email=email;
    }
    if(password)
    {
      patient.password = password;
    }
  
    
  
    if(age)
    {
        patient.age = age;
    }
    if(Contact)
    {
        if (!validator.isLength(Contact, { min: 10 })) {
            return res.status(400).json({
              success: false,
              message: "Contact's Length should be 10",
            });
          }
        patient.Contact = Contact;
    }
   
    
    await patient.save();
  
    return res.status(200).json({ success: true, message: "Profile Successfully Updated" });
  
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server error");
  }
  
  }