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

    user.updateTaskState_LeftRightBTN(Task_name, TaskStateToSet, Task_notes_updated, (err, results)=>{
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

    user.updateTaskState_LeftRightBTN(Task_name, TaskStateToSet, Task_notes_updated, (err, results)=>{
        res.send({errMsg:err, success: results})
    })

}

module.exports = {updateOwnEmail, updateOwnPassword, updateAllUsers, updateTaskState_LeftBTN, updateTaskState_RightBTN}