//NPM modules
var express = require("express");
// Custom modules
var user = require("../Models/accounts")
//Controllers
var LogInOutControl = require("../Controllers/Log_InOut_Control")
var RetrieveDataContorl = require("../Controllers/RetrieveData_Control")
var UpdateDataControl = require("../Controllers/UpdateData_Control")
var InsertData_Control = require("../Controllers/InsertData_Control")
var CheckGroup_Control = require("../Controllers/CheckGroup_Control")
var Mail_Control = require("../Controllers/Mail_Control")

// const cors = require("cors");
const { application } = require("express");

//Activateng router
var router = express.Router();

// router.use(cors());

//Checking if user is login into to database side
router.use((req,res,next) => {
    res.locals.currentUser = req.user;
    next();
});

// =====Routes=====

//Log in & out
router.post("/login", LogInOutControl.loginUser)
router.post("/logout", LogInOutControl.logoutUser
// (req, res)=>{
//     res.send({so: 'ss'});
//     console.log("???")
// }
)

//Retrieve from SQL
router.post("/GetUserData", RetrieveDataContorl.GetUserData)
router.post("/getAllExceptSelf", RetrieveDataContorl.getAllExceptSelf)
router.post("/getAllG", RetrieveDataContorl.getAllG)
router.post("/getAllKBApp", RetrieveDataContorl.getAllKBApp)
router.post("/getAllKBPlan", RetrieveDataContorl.getAllKBPlan)
router.post("/getAllKBTask", RetrieveDataContorl.getAllKBTask)
router.post("/getPermitCheck", CheckGroup_Control.getPermitCheck)

//Update on SQL
router.post("/updateOwnEmail", UpdateDataControl.updateOwnEmail)
router.post("/updateOwnPassword", UpdateDataControl.updateOwnPassword)
router.post("/updateAllUsers", UpdateDataControl.updateAllUsers)
router.post("/updateTaskState_LeftBTN", UpdateDataControl.updateTaskState_LeftBTN)
router.post("/updateTaskState_RightBTN", UpdateDataControl.updateTaskState_RightBTN)
router.post("/EditKBApp", UpdateDataControl.EditKBApp)

//Insert to SQL
router.post("/insertG", InsertData_Control.insertG)
router.post("/insertCreatedUser", InsertData_Control.insertCreatedUser)
router.post("/CreateKBApp", InsertData_Control.CreateKBApp)
router.post("/CreateKBPlan", InsertData_Control.CreateKBPlan)
router.post("/CreateKBTask", InsertData_Control.CreateKBTask)

//Mail with nodemailer
router.post("/sendMail", Mail_Control)



module.exports = router;