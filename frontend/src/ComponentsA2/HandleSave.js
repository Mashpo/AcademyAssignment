import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';


async function SaveCreateApp(AppAcronym,AppDescription,AppRNumber,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done, callback){

    console.log(AppAcronym,AppDescription,AppRNumber,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done)

    let validity = 1

    if(!AppAcronym || !AppRNumber || !AppStartDate || !AppEndDate || !AppPermit_Create || !AppPermit_Open || !AppPermit_toDoList || !AppPermit_Doing || !AppPermit_Done){
        // seteditStatus("0")
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

async function SaveCreatePlan(AppAcronym,AppDescription,AppRNumber,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done,setAppPermit_Create,setAppPermit_Open,setAppPermit_toDoList,setAppPermit_Doing,setAppPermit_Done, callback){

    console.log(AppAcronym,AppDescription,AppRNumber,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done)

    let validity = 1

    if(!AppAcronym || !AppRNumber || !AppStartDate || !AppEndDate || !AppPermit_Create || !AppPermit_Open || !AppPermit_toDoList || !AppPermit_Doing || !AppPermit_Done){
        // seteditStatus("0")
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



export default {SaveCreateApp, SaveCreatePlan};