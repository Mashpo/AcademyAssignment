var A3Models = require("../Models/Assignment3_RestAPI_Models")
var user = require("../Models/accounts")
var bcrypting = require("../Controllers/security/bcrypting")

function apiCreateTask (req, res){

    let bodyKeys = Object.keys(req.body)
    if(!bodyKeys.includes("username") || 
        !bodyKeys.includes("password") || 
        !bodyKeys.includes("Task_name") || 
        !bodyKeys.includes("Task_app_Acronym") || 
        !bodyKeys.includes("Task_description") || 
        !bodyKeys.includes("Task_plan")  ){
            return res.send({code: 400})
        }

    let username = req.body.username
    let password = req.body.password

    let Task_name = req.body.Task_name
    let Task_app_Acronym = req.body.Task_app_Acronym
    let Task_description = req.body.Task_description
    let Task_plan = req.body.Task_plan

    if(!password.trim() || !username.trim() || !Task_name.trim() || !Task_app_Acronym.trim()){
       return res.send({code: 411})
    }
    // Check loging
    user.checkLogin(username, password, (err, login_results)=>{
        // Login fail
        if(!login_results){
            // Login fail due to disabled
            if (err===22) {
                return res.send({code: 403})
            }
            // Login fail due to wrong username or password
            return res.send({code: 401})
        }

        // Login pass
        user.getOneKBApp(Task_app_Acronym, (err, App_results)=>{
            //Task App Acronym not found
            if(App_results.length===0){
                return res.send({code: 404})
            }
            //found Task App Acronym
            user.getOneKBTask(Task_name, (err, Task_results)=>{
                //Duplicated Task Name
                if(Task_results.length>0){
                    return res.send({code: 400})
                }
                //Pass Task Name check
                user.getAllKBTask_Task_app_Acronym(Task_app_Acronym, (err, AllTask_results)=>{
                    let tempDate = new Date()
                    console.log(Task_app_Acronym)
                    let TaskID = Task_app_Acronym+"_"+(App_results[0].App_Rnumber+1+AllTask_results.length).toString()
                    let TaskNotes = "- Created by"+" "+username+`\n`+"       Time Stamp: "+tempDate+`\n\n`+"-End of Audit Trail-"
                    let TaskState = "Open"
                    let TaskCreator = username
                    let TaskOwner = username
                    let TaskCreateDate = tempDate.toISOString().split('T')[0]
                    if(Task_plan.trim().length>0){
                        user.CreateKBTask(Task_name,Task_description,TaskNotes,TaskID,Task_plan,Task_app_Acronym,TaskState,TaskCreator,TaskOwner,TaskCreateDate, (err, results)=>{
                            if(results){
                               return res.send({code: 201, msg: TaskID})
                            }
                        })
                    }
                    if(Task_plan.trim().length===0){
                        user.CreateKBTask(Task_name,Task_description,TaskNotes,TaskID,null,Task_app_Acronym,TaskState,TaskCreator,TaskOwner,TaskCreateDate, (err, results)=>{
                            if(results){
                               return res.send({code: 201, msg: TaskID})
                            }
                        })
                    }
                })
            })
        })
    })
}

function apiGetTaskByState (){

}

function apiPromoteTask2Done (){

}

module.exports = {apiCreateTask, apiGetTaskByState, apiPromoteTask2Done}