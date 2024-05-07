const Doctor = require("../../models/Doctor");
const Slot = require("../../models/Slots")

//VIEW SLOT OF PARTICULAR DOCTOR
exports.ViewSlot = async (req, res) => {
  
  const doctorid =req.user._id;
  console.log(doctorid);
  
  try {
    const slot = await Slot.find({id: doctorid });
    
    // console.log(slot)

    // Check if the doctor exists
    if (!slot || slot.length==0) {
      return res.status(404).json({ success: false, message: "No slot available..." });
    }

    

    return res.status(200).json(slot);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server error");
  }
}

//VIEW SLOTS OF ALL DOCTORS
exports.ViewAllSlot=async(req,res)=>{
  try{
    const slot = await  Slot.find();
    
    if(!slot)
    {
      return res.status(404).json({ success: false, message: "No slot available..." });
    }
   
      res.status(200).json(slot)
    
  }
  catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server error");
  }
 

 
}

exports.ViewBookSlot=async(req,res)=>{
  const id = req.user.id;
  try {
    const doctor = await  Doctor.findOne({_id:id});
   
    if(doctor.bookslots.length==0)
    {
      return res.status(404).json({ success: false, message: "No booked slot available..." });
    }
    else{
      res.status(200).json(doctor.bookslots);
    }
   
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server error");
  }


}
