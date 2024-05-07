const Doctor = require("../../models/Doctor");
const Slot = require("../../models/Slots")

exports.editSlot = async (req, res) => {
  const id = req.user.id;                //doctor id
  const slotid = req.params.slotid;
  const {startTime , endTime} = req.body;

  if(!startTime || !endTime)
  {
      return res.status(400).json({
          success: false,
          message: "Please enter new  StartTime as well as EndTime...",
        });
  }
  
  try {
    
    const slot = await Slot.findOne({_id: slotid });

    // Check if the doctor exists
    if (!slot) {
      return res.status(404).json({ success: false, message: "No slot available with this id...." });
    }



    slot.startTime = startTime;
    slot.endTime = endTime;


    await slot.save();

    return res.status(200).json({ success: true, message: "Slot Successfully Updated" });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server error");
  }
}


exports.EditProfile=async(req,res)=>{
  const id = req.user.id;
const {name,email,password,specialities,experience,qualification} = req.body;
try {
  const doctor = await Doctor.findOne({ _id: id });

  
  if (!doctor) {
    return res.status(404).json({ success: false, message: "Doctor not found" });
  }

  if(name){
    doctor.name=name;
  }
  if(email)

  {
    doctor.email=email;
  }
  if(password)
  {
    doctor.password=password
  }
  if(specialities)
  {
    doctor.specialities = specialities;
  }
  if(qualification)
  {
    doctor.qualification = qualification;
  }
  if(experience)
  {
    doctor.experience = experience;
  }
  
  await doctor.save();

  return res.status(200).json({ success: true, message: "Profile Successfully Updated" });

} catch (error) {
  console.error(error);
  return res.status(500).send("Internal Server error");
}

}
