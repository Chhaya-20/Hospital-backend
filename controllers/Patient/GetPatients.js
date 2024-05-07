const Patient = require("../../models/Patient");

exports.GetPatients = async(req,res)=>{
    const patients = await Patient.find();
    if(!patients)
    {
        return res
        .status(404)
        .json({ success: false, message: "No patient present..." });
        
    }
    return res
       .status(200)
       .json(patients);
   
}