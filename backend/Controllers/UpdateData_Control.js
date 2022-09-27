var user = require("../Models/accounts")
const bcrypting = require("./security/bcrypting")

function updateOwnEmail (req, res) {

    //Unpack Data
    let username = req.body.username
    let email = req.body.email

    user.updateOwnEmail(username, email, (err, results)=>{
        // return (results)
        res.send({errMsg:err, success: results})
    })

}

async function updateOwnPassword (req, res) {

    //Unpack Data
    let username = req.body.username
    const originalPassword = req.body.password;

    //hashing
    const hashedPassword = await bcrypting.hash_password(originalPassword)

    user.updateOwnPassword(username, hashedPassword, (err, results)=>{
        // return (results)
        res.send({errMsg:err, success: results})
    })

}

async function updateAllUsers (req, res) {

    //Unpack Data
    let username = req.body.username
    let password = req.body.password;
    let email = req.body.email
    let active_status = req.body.active_status
    let group_name = req.body.group_name
    
    //hashing
    if(password){
    password = await bcrypting.hash_password(password)
    }

    user.updateAllUsers(username, password, email, active_status, group_name, (err, results)=>{
        res.send({errMsg:err, success: results})
    })

}

function updateTaskState_LeftBTN (req, res) {

    //Unpack Data
    let Username = req.body.Username
    let Task_name = req.body.Task_name
    let Task_state = req.body.Task_state;
    let Task_notes_old = req.body.Task_notes
    var TaskStateToSet = ""
    

    if(Task_state == "Doing"){
        TaskStateToSet = "ToDo"
    }
    else if(Task_state == "Done"){
        TaskStateToSet = "Doing"
    }

    let tempDate = new Date()
    let Task_notes_updated = '- Shifted from '+Task_state+' state to '+TaskStateToSet+' state by '+Username+`\n`+"       Time Stamp: "+tempDate+'\n\n'+Task_notes_old

    user.updateTaskState_LeftRightBTN(Username, Task_name, TaskStateToSet, Task_notes_updated, (err, results)=>{
        res.send({errMsg:err, success: results})
    })

}

function updateTaskState_RightBTN (req, res) {

    //Unpack Data
    let Username = req.body.Username
    let Task_name = req.body.Task_name
    let Task_state = req.body.Task_state;
    let Task_notes_old = req.body.Task_notes
    var TaskStateToSet = ""

    if(Task_state == "Open"){
        TaskStateToSet = "ToDo"
    }
    else if(Task_state == "ToDo"){
        TaskStateToSet = "Doing"
    }
    else if(Task_state == "Doing"){
        TaskStateToSet = "Done"
    }
    else if(Task_state == "Done"){
        TaskStateToSet = "Close"
    }

    let tempDate = new Date()
    let Task_notes_updated = '- Shifted from '+Task_state+' state to '+TaskStateToSet+' state by '+Username+`\n`+"       Time Stamp: "+tempDate+'\n\n'+Task_notes_old

    user.updateTaskState_LeftRightBTN(Username, Task_name, TaskStateToSet, Task_notes_updated, (err, results)=>{
        res.send({errMsg:err, success: results})
    })

}

function EditKBApp (req, res) {

    //Unpack Data
    let ActiveApp = req.body.ActiveApp
    let AppDescription = req.body.AppDescription
    let AppStartDate = req.body.AppStartDate
    let AppEndDate = req.body.AppEndDate

    let AppPermit_Create = req.body.AppPermit_Create[0].group_name
    let AppPermit_Open = req.body.AppPermit_Open[0].group_name
    let AppPermit_toDoList = req.body.AppPermit_toDoList[0].group_name
    let AppPermit_Doing = req.body.AppPermit_Doing[0].group_name
    let AppPermit_Done = req.body.AppPermit_Done[0].group_name
    
    user.EditKBApp(ActiveApp,AppDescription,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done, (err, results)=>{
        res.send({errMsg:err, success: results})
    })

}

function EditKBTask (req, res) {

    //Unpack Data
    let TaskName = req.body.TaskName
    let TaskDescription = req.body.TaskDescription

    var TaskPlan 
    
    if(req.body.TaskPlan){
        TaskPlan = req.body.TaskPlan[0]
    }
    if(TaskPlan){
        TaskPlan = TaskPlan.Plan_MVPName
    }
    
    user.EditKBApp(TaskName,TaskDescription,TaskPlan, (err, results)=>{
        res.send({errMsg:err, success: results})
    })

}

module.exports = {updateOwnEmail, updateOwnPassword, updateAllUsers, updateTaskState_LeftBTN, updateTaskState_RightBTN, EditKBApp, EditKBTask}