import React, { useState, useEffect } from 'react'


function TaskDisplayTemplate(data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
    , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask
    , ActiveOSTD, setActiveOSTD, setSelectedTaskData_OSTD, isOpen_OSTD, setIsOpen_OSTD
    , ActiveSelectedTask_LeftBTN, setActiveSelectedTask_LeftBTN, ActiveSelectedTask_RightBTN, setActiveSelectedTask_RightBTN, setSelectedTaskData_LeftBTN, setSelectedTaskData_RightBTN
    , PermitShiftTaskFromOpen, PermitShiftTaskFromToDo, PermitShiftTaskFromDoing, PermitShiftTaskFromDone){

    const token = JSON.parse(sessionStorage.getItem('token')).token
    
    function FormatDate(date) { /* e.g. 20 Sept 2022*/
        let f_date = new Date(date)
        return f_date.toLocaleDateString("en-GB", {day: 'numeric', month: 'short' /*or long*/, year: 'numeric'})
    }


    //================ Task Display ================
    const [IsHover, setIsHover] = useState(false)
    const [IsHover2, setIsHover2] = useState()

    //================ Audit Trail button ================
    const [IsHover3, setIsHover3] = useState(false)
    const [IsHover4, setIsHover4] = useState()

    //================ Edit Selected Task button ================
    const [IsHover5, setIsHover5] = useState(false)
    const [IsHover6, setIsHover6] = useState()

    //================ Right button ================
    const [IsHover7, setIsHover7] = useState(false)
    const [IsHover8, setIsHover8] = useState()

    //================ Left button ================
    const [IsHover9, setIsHover9] = useState(false)
    const [IsHover10, setIsHover10] = useState()

    //================ Audit Trail Popup display ================
    const togglePopup_AT = () => {
        setIsOpen_AuditTrail(!isOpen_AuditTrail);
    }

    //================ Edit Selected Task Popup display ================
     const togglePopup_EST = () => {
        setIsOpen_EditSelectedTask(!isOpen_EditSelectedTask);
    }

    // Shift Task button
        const shiftTask_Rightbutton = async (taskName, fromState, existing_taskNotes) => {
            
            let toState = ""
            let tempDate = ""

            if(fromState == "Open"){
                toState = "ToDo"
            }
            else if(fromState == "ToDo"){
                toState = "Doing"
            }
            else if(fromState == "Doing"){
                toState = "Done"
            }
            else if(fromState == "Done"){
                toState = "Close"
            }

            // Crafting task note and fielding them nicely
            let new_taskNote = '- '+taskName+' was shifted from '+fromState+' state to '+toState+' state  by '+token.username+`\n`+"       Time Stamp: "+tempDate+'\n\n'+existing_taskNotes            
            // let fieldsData = [taskName, undefined, new_taskNote, undefined, undefined, undefined, toState, undefined, username, undefined]
            // // Packing the data
            // let taskData = PackTaskData(fieldsData)
            // // Update backend and render frontend
            // if (UpdateTask(taskData, 2)){
            // }
    }






    //================ OnClick Selected Task Description (OSTD) Popup display ================
    const togglePopup_OSTD = () => {
        setIsOpen_OSTD(!isOpen_OSTD);
    }
   
    return(
        <>
            {data.map((row)=>
                <div 
                    key = {row.Task_name}
                    className='col-6 tooltip' 
                    style={{borderRadius: "25px", border: '2px solid black', paddingLeft: "5px", paddingRight: "5px", marginBottom:"5px",backgroundColor:(((IsHover === true)&&(IsHover2 === row.Task_name))?  "#6b81cd" : "#b4bfe8")}}
                    onMouseEnter={()=>{setIsHover(true); setIsHover2(row.Task_name)}}
                    onMouseLeave={()=>{setIsHover(false); setIsHover2(row.Task_name)}}
                >
                    {/*============ task name ============*/}
                    <p style={{fontSize: "small", textAlign:"center"}}>
                        <b>{row.Task_name}</b>
                    </p>
                    {/*============ task id ============*/}
                    <p style={{fontSize: "small", textAlign:"right"}}>
                        Owner: {row.Task_owner}
                        <br/>
                        Plan: {row.Task_plan? row.Task_plan:"-"}
                    </p>
                    {/*============ task other info ============*/}
                    <p style={{fontSize: "small"}}>
                        Description: 
                        <br/>
                        {/* <span onClick={togglePopup_OSTD()}> */}
                        <textarea 
                            rows="3" 
                            style={{width:'96%', resize:'vertical', marginTop:"5px", marginLeft:"5px", padding:"10px"}} 
                            disabled 
                            defaultValue={row.Task_description? row.Task_description:"-"}
                        />
                        {/* </span> */}
                    </p>

                    {/*============ task hover over info ============*/}
                    <span className="tooltiptext" style={{backgroundColor:"lightgray"}}>
                        <p style={{fontSize: "small", textAlign:"center", padding:"5px"}}>
                            <b>id:</b> {row.Task_id}
                            <br/>
                            <b>Creator:</b> {row.Task_creator}
                            <br/>
                            <b>Date Created:</b> <br/> {FormatDate(row.Task_createDate)}
                        </p>
                    </span>

                    <div className='col-6'>
                    {/*============ Right Button ============*/}
                    {(((row.Task_state==="Open")&&PermitShiftTaskFromOpen) || ((row.Task_state==="ToDo")&&PermitShiftTaskFromToDo) || ((row.Task_state==="Doing")&&PermitShiftTaskFromDoing) || ((row.Task_state==="Done")&&PermitShiftTaskFromDone)) && (row.Task_state!="Close") && (<button 
                        style={{
                            float:"right"
                            ,marginInline: "5px"
                            ,marginBottom: "10px"
                            ,border: "1.5px solid darkslategray"
                            ,borderRadius: "100px"
                            ,color:((ActiveSelectedTask_RightBTN === row.Task_name)||((IsHover7)&&(IsHover8 === row.Task_name))?  "white" : "black")
                            ,backgroundColor:((ActiveSelectedTask_RightBTN === row.Task_name)||((IsHover7)&&(IsHover8 === row.Task_name))?  "lightslategray" : "lightgray")
                        }}
                        
                        onClick={()=>{
                            // shiftTask_Rightbutton(row.Task_name, row.Task_state, row.Task_notes)
                            setActiveSelectedTask_RightBTN(row.Task_name)
                            setSelectedTaskData_RightBTN(row)
                        }}

                        onMouseEnter={()=>{setIsHover7(true); setIsHover8(row.Task_name)}}
                        onMouseLeave={()=>{setIsHover7(false); setIsHover8(row.Task_name)}}
                    >
                        &rarr; {/*HTML Entity for right arrow */}
                    </button>)}

                    {/*============ Left Button ============*/}
                    {(((row.Task_state==="Doing")&&PermitShiftTaskFromDoing) || ((row.Task_state==="Done")&&PermitShiftTaskFromDone)) && (<button 
                        style={{
                            float:"right"
                            ,marginInline: "5px"
                            ,marginBottom: "10px"
                            ,border: "1.5px solid darkslategray"
                            ,borderRadius: "100px"
                            ,color:((ActiveSelectedTask_LeftBTN === row.Task_name)||((IsHover9)&&(IsHover10 === row.Task_name))?  "white" : "black")
                            ,backgroundColor:((ActiveSelectedTask_LeftBTN === row.Task_name)||((IsHover9)&&(IsHover10 === row.Task_name))?  "lightslategray" : "lightgray")
                        }}
                        
                        onClick={()=>{
                            setActiveSelectedTask_LeftBTN(row.Task_name)
                            setSelectedTaskData_LeftBTN(row)
                        }}

                        onMouseEnter={()=>{setIsHover9(true); setIsHover10(row.Task_name)}}
                        onMouseLeave={()=>{setIsHover9(false); setIsHover10(row.Task_name)}}
                    >
                        &larr; {/*HTML Entity for left arrow */}
                    </button>)}

                    </div>

                    <div className='col-6'>
                    {/*============ Edit Task Button ============*/}
                    <button 
                        style={{
                            float:"right"
                            ,marginInline: "5px"
                            ,marginBottom: "10px"
                            ,border: "1.5px solid darkslategray"
                            ,borderRadius: "3px"
                            ,color:((ActiveEditSelectedTask === row.Task_name)||((IsHover5)&&(IsHover6 === row.Task_name))?  "white" : "black")
                            ,backgroundColor:((ActiveEditSelectedTask === row.Task_name)||((IsHover5)&&(IsHover6 === row.Task_name))?  "lightslategray" : "lightgray")
                        }}
                        
                        onClick={()=>{
                            setActiveEditSelectedTask(row.Task_name)
                            setSelectedTaskData_EST(row.Task_name)
                            //Selected Task stuff to display
                            togglePopup_EST()
                        }}

                        onMouseEnter={()=>{setIsHover5(true); setIsHover6(row.Task_name)}}
                        onMouseLeave={()=>{setIsHover5(false); setIsHover6(row.Task_name)}}
                    >
                        Edit Task
                    </button>

                    {/*============ Audit Trail Button ============*/}
                    <button 
                        style={{
                            float:"right"
                            ,marginInline: "5px"
                            ,marginBottom: "10px"
                            ,border: "1.5px solid darkslategray"
                            ,borderRadius: "3px"
                            ,color:((ActiveAuditTrail === row.Task_name)||((IsHover3)&&(IsHover4 === row.Task_name))?  "white" : "black")
                            ,backgroundColor:((ActiveAuditTrail === row.Task_name)||((IsHover3)&&(IsHover4 === row.Task_name))?  "lightslategray" : "lightgray")
                        }}
                        
                        onClick={()=>{
                            setActiveAuditTrail(row.Task_name)
                            setSelectedTaskData_AT(row)
                            //Audit trail stuff to display
                            togglePopup_AT()
                        }}

                        onMouseEnter={()=>{setIsHover3(true); setIsHover4(row.Task_name)}}
                        onMouseLeave={()=>{setIsHover3(false); setIsHover4(row.Task_name)}}
                    >
                        Audit Trail
                    </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default TaskDisplayTemplate;