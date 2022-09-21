import React, { useState, useEffect } from 'react'


function TaskDisplayTemplate(data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
    , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask){

    //================ Task Display ================
    const [IsHover, setIsHover] = useState(false)
    const [IsHover2, setIsHover2] = useState()

    //================ Audit Trail button ================
    const [IsHover3, setIsHover3] = useState(false)
    const [IsHover4, setIsHover4] = useState()

    //================ Edit Selected Task button ================
    const [IsHover5, setIsHover5] = useState(false)
    const [IsHover6, setIsHover6] = useState()

    //================ Audit Trail Popup display ================
    const togglePopup_AT = () => {
        setIsOpen_AuditTrail(!isOpen_AuditTrail);
    }

    //================ Edit Selected Task Popup display ================
     const togglePopup_EST = () => {
        setIsOpen_EditSelectedTask(!isOpen_EditSelectedTask);
    }
   
    console.log(data)
    return(
        <>
            {data.map((row)=>
                <div 
                    key = {row.Task_name}
                    className='col-6 tooltip' 
                    style={{borderRadius: "25px", border: '2px solid black', padding: "10px", marginBottom:"5px",backgroundColor:(((IsHover === true)&&(IsHover2 === row.Task_name))?  "#6b81cd" : "#b4bfe8")}}
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
                        <textarea 
                            rows="3" 
                            style={{width:'96%', resize:'none', marginTop:"5px", marginLeft:"5px", padding:"10px"}} 
                            disabled 
                            defaultValue={row.Task_description? row.Task_description:"-"}
                        />
                    </p>

                    {/*============ task hover over info ============*/}
                    <span className="tooltiptext" style={{backgroundColor:"lightgray"}}>
                        <p style={{fontSize: "small", textAlign:"center", padding:"5px"}}>
                            id: {row.Task_id}
                            <br/>
                            Creator: {row.Task_creator}
                            <br/>
                            Date Created: {row.Task_createDate}
                        </p>
                    </span>

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
                            //Audit trail stuff to display
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
                            setSelectedTaskData_AT(row.Task_name)
                            //Audit trail stuff to display
                            togglePopup_AT()
                        }}

                        onMouseEnter={()=>{setIsHover3(true); setIsHover4(row.Task_name)}}
                        onMouseLeave={()=>{setIsHover3(false); setIsHover4(row.Task_name)}}
                    >
                        Audit Trail
                    </button>

                </div>
            )}
        </>
    )
}

export default TaskDisplayTemplate;