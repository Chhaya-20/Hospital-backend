const Doctor = require("../../models/Doctor");
const Slot = require("../../models/Slots");

exports.deletSlot = async (req, res) => {

  const slotid = req.params.slotid;
  
  try {
    // Check if the doctor exists
   

    // Find the slot
    const slot = await Slot.findOne({ _id: slotid });
    
    // Check if the slot exists
    if (!slot) {
      return res.status(404).json({ success: false, message: "No slot available with this id...." });
    }
    
    // Delete the slot
    await Slot.findByIdAndDelete(slotid);

    return res.status(200).json({ success: true, message: "Slot Successfully Deleted" });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server error");
  }
};
