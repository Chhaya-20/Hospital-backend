const express = require('express');
const router = express.Router();
const { fetchDoctor,fetchDoctor1} = require('../controllers/middleware');
const {AddSlot , getDoctor ,getDoctor1} = require("../controllers/Doctor/AddSlot");
const {deletSlot} = require("../controllers/Doctor/DeleteSlot");
const {editSlot,EditProfile} = require("../controllers/Doctor/Edit");
const {ViewSlot,ViewAllSlot,ViewBookSlot}= require("../controllers/Doctor/ViewSlot")
const {LoginUser,SignupUser,Forget} = require('../controllers/Doctor/Authenticate');


//LOGIN USER
router.post('/login',LoginUser)


//SIGNUP USER
router.post('/signup',SignupUser)


//Forget password
router.post('/forget',Forget)


//Doctor Add A Slot
router.post('/addslot',fetchDoctor,AddSlot)


//GET ALL DOCTORS
router.get("/getDoctors",getDoctor)


//UPDATE PROFILE OF DOCTOR
router.put("/updateprofile",fetchDoctor,EditProfile)


//VIEW SLOT OF A DOCTOR BY DOCTOR ID
router.get("/viewslot",fetchDoctor,ViewSlot)



//View slot 2
router.get("/viewslot1",fetchDoctor1,ViewSlot)


//View all slots
router.get("/viewslots",ViewAllSlot)

//View Booked Slots done by patient
router.get("/viewbooked",fetchDoctor,ViewBookSlot)

//DELETE A SLOT BY SLOT ID
router.delete("/delete/:slotid",fetchDoctor,deletSlot);


//UPDATE SLOT OF DOCTOR
router.put("/editslot/:slotid",fetchDoctor,editSlot)

router.get("/getbyId",fetchDoctor1,getDoctor1)

module.exports = router;
