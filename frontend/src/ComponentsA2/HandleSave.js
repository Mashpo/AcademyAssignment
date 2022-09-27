import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';


async function SaveCreateApp(AppAcronym,AppDescription,AppRNumber,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done, callback){

    let validity = 1

    if(!AppAcronym || !AppRNumber || !AppStartDate || !AppEndDate || !AppPermit_Create || !AppPermit_Open || !AppPermit_toDoList || !AppPermit_Doing || !AppPermit_Done){
        toast.warn("Empty Compulsory Fields", {hideProgressBar:true})
        validity = 0
    }
    
    if (validity === 1){

       await fetch('http://localhost:8080/CreateKBApp',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // POST content
            body: JSON.stringify({AppAcronym:AppAcronym,AppDescription:AppDescription,AppRNumber:AppRNumber,AppStartDate:AppStartDate,AppEndDate:AppEndDate,AppPermit_Create:AppPermit_Create,AppPermit_Open:AppPermit_Open,AppPermit_toDoList:AppPermit_toDoList,AppPermit_Doing:AppPermit_Doing,AppPermit_Done:AppPermit_Done})
        })
        // Server returns response from the credentials
            //.send sends the object as a string so after recieving the data, .json makes it back into an object
        .then(async (res) => { 
            const update_status = await res.json()
            callback(update_status)
        }) 
    }
}

async function SaveCreatePlan(PlanMVPName,PlanStartDate,PlanEndDate,PlanAppAcronym, callback){

    let validity = 1

    if(!PlanMVPName || !PlanStartDate || !PlanEndDate || !PlanAppAcronym){
        toast.warn("Empty Compulsory Fields", {hideProgressBar:true})
        validity = 0
    }

    if (validity === 1){

       await fetch('http://localhost:8080/CreateKBPlan',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // POST content
            body: JSON.stringify({PlanMVPName:PlanMVPName,PlanStartDate:PlanStartDate,PlanEndDate:PlanEndDate,PlanAppAcronym:PlanAppAcronym})
        })
        // Server returns response from the credentials
            //.send sends the object as a string so after recieving the data, .json makes it back into an object
        .then(async (res) => { 
            const update_status = await res.json()
            callback(update_status)
        }) 
    }
}

async function SaveCreateTask(App_Rnumber, TaskName,TaskDescription,TaskNotes,TaskID,TaskPlan,TaskAppAcronym,TaskState,TaskCreator,TaskOwner,TaskCreateDate,callback){

    let validity = 1

    if(!TaskName || !TaskNotes || !TaskID || !TaskAppAcronym || !TaskState || !TaskCreator || !TaskOwner || !TaskCreateDate ){
        toast.warn("Empty Compulsory Fields", {hideProgressBar:true})
        validity = 0
    }

    if (validity === 1){

       await fetch('http://localhost:8080/CreateKBTask',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // POST content
            body: JSON.stringify({App_Rnumber:App_Rnumber,TaskName:TaskName,TaskDescription:TaskDescription,TaskNotes:TaskNotes,TaskID:TaskID,TaskPlan:TaskPlan,TaskAppAcronym:TaskAppAcronym,TaskState:TaskState,TaskCreator:TaskCreator,TaskOwner:TaskOwner,TaskCreateDate:TaskCreateDate})
        })
        // Server returns response from the credentials
            //.send sends the object as a string so after recieving the data, .json makes it back into an object
        .then(async (res) => { 
            const update_status = await res.json()
            callback(update_status)
        }) 
    }
}

async function SaveEditApp(ActiveApp,AppDescription,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done, callback){
    
    let validity = 1

    if(!AppStartDate || !AppEndDate || !AppPermit_Create || !AppPermit_Open || !AppPermit_toDoList || !AppPermit_Doing || !AppPermit_Done){
        toast.warn("Empty Compulsory Fields", {hideProgressBar:true})
        validity = 0
    }
    
    if (validity === 1){
        await fetch('http://localhost:8080/EditKBApp',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // POST content
            body: JSON.stringify({ActiveApp:ActiveApp,AppDescription:AppDescription,AppStartDate:AppStartDate,AppEndDate:AppEndDate,AppPermit_Create:AppPermit_Create,AppPermit_Open:AppPermit_Open,AppPermit_toDoList:AppPermit_toDoList,AppPermit_Doing:AppPermit_Doing,AppPermit_Done:AppPermit_Done})
        })
        // Server returns response from the credentials
            //.send sends the object as a string so after recieving the data, .json makes it back into an object
        .then(async (res) => { 
            const update_status = await res.json()
            callback(update_status)
        }) 
    }
}
export default {SaveCreateApp, SaveCreatePlan, SaveCreateTask, SaveEditApp};