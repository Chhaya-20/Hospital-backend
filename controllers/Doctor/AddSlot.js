const Doctor= require("../../models/Doctor");
const Slot = require("../../models/Slots")


//CHECK THAT TIME IS IN RIGHT FORMAT (YYYY-MM-DDTHH:MM:SS) OR NOT 
const isValidTimeFormat = (timeString) => {
    const timeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return timeRegex.test(timeString);
};


//ADD NEW SLOT OF DOCTOR
exports.AddSlot = async (req, res) => {
   
    const DoctorId = req.user.id;   //get doctor id
 console.log("ddd",DoctorId);
    let { startTime, endTime } = req.body;
   

    if (!startTime || !endTime) {
        return res.status(400).json({
            success: false,
            message: "Please enter StartTime as well as EndTime...",
        });
    }

    if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
        return res.status(400).json({
            success: false,
            message: "Please enter StartTime as well as EndTime in (YYYY-MM-DD HH:MM:SS) format...",
        });
    }

   
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Check  endDate is greater than or equal to startDate
    if (endDate <= startDate) {
        return res.status(400).json({
            success: false,
            message: "EndTime must be greater than StartTime.",
        });
    }

    try {
    
            const slot = new Slot({ id: DoctorId, startTime , endTime });
        
        
        await slot.save();
    
        return res.status(200).json({ success: true, message: "Slot Successfully Added..." });
    
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
};



//GET ALL DOCTORS
exports.getDoctor = async(req,res)=>{
    const doctor = await Doctor.find();
    if(!doctor)
    {
        return res
        .status(404)
        .json({ success: false, message: "No doctor present..." });
        
    }
    return res
       .status(200)
       .json(doctor);
   
}

exports.getDoctor1 = async(req,res)=>{
    const DoctorId = req.user.id;

    const doctor = await Doctor.findById(DoctorId);
    if(!doctor)
    {
        return res
        .status(404)
        .json({ success: false, message: "No doctor present..." });
        
    }
    return res
       .status(200)
       .json(doctor);
   
}