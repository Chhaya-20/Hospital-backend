const Patient = require("../../models/Patient");

exports.ViewBookSlot = async(req,res)=>{
    
    const id = req.user.id;

    try {
        const patient = await Patient.findOne({_id:id});
       
        if(patient.bookslots.length==0)
        {
            return res.status(400).json({ success: false, message: "No booked slot yet...." });
        }
        else{
            return res.status(200).json(patient.bookslots)
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
}