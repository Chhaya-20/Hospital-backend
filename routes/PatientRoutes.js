const express = require('express');
const router = express.Router();
const { fetchPatient } = require('../controllers/middleware');

const {LoginUser,SignupUser,Forget} = require('../controllers/Patient/Authenticate');
const { EditProfile } = require('../controllers/Patient/EditProfile');
const {GetPatients} = require("../controllers/Patient/GetPatients");
const {BookSlot} = require("../controllers/Patient/BookSlot");
const {CancelSlot} = require("../controllers/Patient/CancelSlot");
const { ViewBookSlot } = require('../controllers/Patient/ViewBookSlots');
const {ViewAllSlot}= require("../controllers/Doctor/ViewSlot")


//LOGIN USER
router.post('/login',LoginUser)


//SIGNUP USER
router.post('/signup',SignupUser)


//Forget password
router.post('/forget',Forget)


//EDIT PROFILE
router.put("/editprofile",fetchPatient,EditProfile)


//GET ALL PATIENTS
router.get("/getpatients",GetPatients)


//UPDATE PASSWORD
router.put("/forget",Forget)

//VIEW BOOK SLOTS
router.get("/bookslots",fetchPatient,ViewBookSlot)


//VIEW ALL AVAILABLE SLOTS
router.get("/viewslots",ViewAllSlot)



//CANCEL A SLOT
router.post("/cancel/:slotid",fetchPatient,CancelSlot)
//BOOK A SLOT
router.post("/book/:slotid",fetchPatient,BookSlot)
module.exports = router;
