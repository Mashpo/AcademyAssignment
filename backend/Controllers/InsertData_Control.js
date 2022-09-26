var user = require("../Models/accounts")
const bcrypting = require("./security/bcrypting")

function insertG (req, res) {
    //Unpack Data
    let newGroup = req.body.newGroup

    user.insertG(newGroup, (err, results)=>{
        // return (results)
        res.send({errMsg:err, success: results})
    })

}

async function insertCreatedUser (req, res) {

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

    user.insertCreatedUser(username, password, email, active_status, group_name, (err, results)=>{
        res.send({errMsg:err, success: results})
    })

}

function CreateKBApp (req, res) {
    //Unpack Data
    let AppAcronym = req.body.AppAcronym
    let AppDescription = req.body.AppDescription
    let AppRNumber = req.body.AppRNumber
    let AppStartDate = req.body.AppStartDate
    let AppEndDate = req.body.AppEndDate
    let AppPermit_Create = req.body.AppPermit_Create[0].group_name
    let AppPermit_Open = req.body.AppPermit_Open[0].group_name
    let AppPermit_toDoList = req.body.AppPermit_toDoList[0].group_name
    let AppPermit_Doing = req.body.AppPermit_Doing[0].group_name
    let AppPermit_Done = req.body.AppPermit_Done[0].group_name
    
    user.CreateKBApp(AppAcronym,AppDescription,AppRNumber,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done, (err, results)=>{
        res.send({errMsg:err, success: results})
    })

}

function CreateKBPlan (req, res) {
    //Unpack Data
    let PlanMVPName = req.body.PlanMVPName
    let PlanStartDate = req.body.PlanStartDate
    let PlanEndDate = req.body.PlanEndDate
    let PlanAppAcronym = req.body.PlanAppAcronym
    
    user.CreateKBPlan(PlanMVPName,PlanStartDate,PlanEndDate,PlanAppAcronym, (err, results)=>{
        res.send({errMsg:err, success: results})
    })

}

function CreateKBTask (req, res) {
    //Unpack Data
    let App_Rnumber = req.body.App_Rnumber + 1
    let TaskName = req.body.TaskName
    let TaskDescription = req.body.TaskDescription
    let TaskNotes = req.body.TaskNotes
    let TaskID = req.body.TaskID

    let TaskPlan = ""
    if(req.body.TaskPlan){
        TaskPlan = req.body.TaskPlan[0].Plan_MVPName
    }
    else if(!req.body.TaskPlan){
        TaskPlan = req.body.TaskPlan
    }

    let TaskAppAcronym = req.body.TaskAppAcronym
    let TaskState = req.body.TaskState
    let TaskCreator = req.body.TaskCreator
    let TaskOwner = req.body.TaskOwner
    let TaskCreateDate = req.body.TaskCreateDate

    user.CreateKBTask(TaskName,TaskDescription,TaskNotes,TaskID,TaskPlan,TaskAppAcronym,TaskState,TaskCreator,TaskOwner,TaskCreateDate, (err, results)=>{
        if(results){
            user.updateAppRnumber(App_Rnumber, TaskAppAcronym, (err, results)=>{
                res.send({errMsg:err, success: results})
            })
        }
        else if(!results){
            res.send({errMsg:err, success: results})
        }
    })
    

}

module.exports = {insertG, insertCreatedUser, CreateKBApp, CreateKBPlan, CreateKBTask}
