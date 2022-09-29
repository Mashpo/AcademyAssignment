var A3Models = require("../Models/Assignment3_RestAPI_Models")
var user = require("../Models/accounts")
var bcrypting = require("../Controllers/security/bcrypting")
var Mail_Control = require("../Controllers/Mail_Control")

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
                user.getAllKBTask_Task_app_Acronym(Task_app_Acronym, (err, AllTask_Task_app_Acronym_results)=>{
                    let tempDate = new Date()
                    let TaskID = Task_app_Acronym+"_"+(App_results[0].App_Rnumber+1+AllTask_Task_app_Acronym_results.length).toString()
                    let TaskNotes = "- Created by"+" "+username+`\n`+"       Time Stamp: "+tempDate+`\n\n`+"-End of Audit Trail-"
                    let TaskState = "Open"
                    let TaskCreator = username
                    let TaskOwner = username
                    let TaskCreateDate = tempDate.toISOString().split('T')[0]
                    
                    //if Task_Plan input field is filled
                    if(Task_plan.trim().length>0){
                        //Check if Plan exist (so that it can be used)
                        user.getOneKBPlan(Task_plan, (err, OneKBPlan_results)=>{
                            //if Task Plan not found in mySQL
                            if(OneKBPlan_results.length===0){
                                return res.send({code: 404})
                            }
                            //if Passed all checks
                            //Create Task if Task is associated with a plan
                            user.CreateKBTask(Task_name,Task_description,TaskNotes,TaskID,Task_plan,Task_app_Acronym,TaskState,TaskCreator,TaskOwner,TaskCreateDate, (err, results)=>{
                                if(results){
                                return res.send({code: 201, msg: TaskID})
                                }
                            })
                        })
                    }
                    //if Task_Plan input field is NOT filled
                    if(Task_plan.trim().length===0){
                        //Create Task if Task is NOT associated with a plan
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

function apiGetTaskByState (req, res){
    let bodyKeys = Object.keys(req.body)
    if(!bodyKeys.includes("username") || 
        !bodyKeys.includes("password") || 
        !bodyKeys.includes("Task_app_Acronym") || 
        !bodyKeys.includes("Task_state") ){
            return res.send({code: 400})
        }

    let username = req.body.username
    let password = req.body.password
    let Task_app_Acronym = req.body.Task_app_Acronym
    let Task_state = req.body.Task_state


    if(!password.trim() || !username.trim() || !Task_app_Acronym.trim() || !Task_state.trim()){
        return res.send({code: 411})
    }
    //Checking Valid Task State
    if(Task_state.trim()!=="open" &&
        Task_state.trim()!=="todolist" &&
        Task_state.trim()!=="doing" &&
        Task_state.trim()!=="done" &&
        Task_state.trim()!=="close" ){
            return res.send({code: 400})
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
            //Retrieving
            user.getAllKBTask_Task_state(Task_state, (err, AllTask_Task_state_results)=>{
                return res.send({code: 200})
            })
        })
    })
}

function apiPromoteTask2Done (req, res){
    let bodyKeys = Object.keys(req.body)
    if(!bodyKeys.includes("username") || 
        !bodyKeys.includes("password") || 
        !bodyKeys.includes("Task_name") ){
            return res.send({code: 400})
        }

    let username = req.body.username
    let password = req.body.password
    let Task_name = req.body.Task_name

    if(!password.trim() || !username.trim() || !Task_name.trim()){
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
        user.getAllKBTask_Task_name(Task_name, (err, AllTask_Task_name_results)=>{
            //Task Name not found
            if(AllTask_Task_name_results.length===0){
                return res.send({code: 404})
            }
            //found Task Name
            //Checking if current state is at "TaskDoing"
            if(Task_name!="TaskDoing"){
                return res.send({code: 406})
            }
            Mail_Control({body:{Username: username, Task_name: Task_name}})
            return res.send({code: 200})
        })

    })
}

module.exports = {apiCreateTask, apiGetTaskByState, apiPromoteTask2Done}