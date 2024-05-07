const Slot = require("../../models/Slots");
const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");


exports.CancelSlot=async(req,res)=>{
    const slotid = req.params.slotid;   // Slot id
    const id = req.user.id;  // Patient id

    try {
        const slot = await Slot.findOne({ _id: slotid });
        if (!slot) {
            return res.status(404).json({ success: false, message: "No slot available with this id...." });
        } else {
            if (slot.available) {
                return res.status(404).json({ success: false, message: "Slot is not booked...." });
            } else {
                slot.available = true;
                await slot.save();

               
                const doctorid = slot.id;
                const doctor = await Doctor.findOne({ _id: doctorid });
                for(let i=0;i<doctor.bookslots.length;i++)
                {
                   
                    if(doctor.bookslots[i]._id == slotid)
                    {
                       
doctor.bookslots.splice(i,1);
break;
                    }
                }
               
    await doctor.save();
              

                // Add slot to patient's bookedSlots
                const patient = await Patient.findOne({ _id: id });
                for(let i=0;i<patient.bookslots.length;i++)
                {
                    if(patient.bookslots[i]._id == slotid)
                    {
patient.bookslots.splice(i,1);
break;
                    }
                }
              
                    await patient.save();
                

                return res.status(200).json({ success: true, message: "Slot successfully Unbooked...." });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }

}