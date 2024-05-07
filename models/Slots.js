const mongoose = require("mongoose");
const { Schema } = mongoose;
const Doctor = require("./Doctor")

const SlotSchema = new Schema({
  id:{                                  //doctor id
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      available:{
        type:Boolean,
        default:true
      }
    
      
});

const Slot = mongoose.model("Slot", SlotSchema);
module.exports = Slot;
