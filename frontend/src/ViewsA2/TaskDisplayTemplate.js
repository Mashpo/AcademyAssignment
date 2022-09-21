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
   

    return(
        <>
            {data.map((data)=>
                <div 
                    key = {data}
                    className='col-6 tooltip' 
                    style={{borderRadius: "25px", border: '2px solid black', padding: "10px", marginBottom:"5px",backgroundColor:(((IsHover === true)&&(IsHover2 === data))?  "#6b81cd" : "#b4bfe8")}}
                    onMouseEnter={()=>{setIsHover(true); setIsHover2(data)}}
                    onMouseLeave={()=>{setIsHover(false); setIsHover2(data)}}
                >
                    {/*============ task name ============*/}
                    <p style={{fontSize: "small", textAlign:"center"}}>
                        <b>{data}</b>
                    </p>
                    {/*============ task id ============*/}
                    <p style={{fontSize: "small", textAlign:"right"}}>
                        Owner: {data}
                        <br/>
                        Plan: {data}
                    </p>
                    {/*============ task other info ============*/}
                    <p style={{fontSize: "small"}}>
                        Description: {data}
                        <br/>
                        <textarea 
                            rows="3" 
                            style={{width:'96%', resize:'none', marginTop:"5px", marginLeft:"5px", padding:"10px"}} 
                            disabled 
                            defaultValue={data? data:"-"}
                        />
                    </p>

                    {/*============ task hover over info ============*/}
                    <span className="tooltiptext" style={{backgroundColor:"lightgray"}}>
                        <p style={{fontSize: "small", textAlign:"center", padding:"5px"}}>
                            id: {data}
                            <br/>
                            Creator: {data}
                            <br/>
                            Date Created: {data}
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
                            ,color:((ActiveEditSelectedTask === data)||((IsHover5)&&(IsHover6 === data))?  "white" : "black")
                            ,backgroundColor:((ActiveEditSelectedTask === data)||((IsHover5)&&(IsHover6 === data))?  "lightslategray" : "lightgray")
                        }}
                        
                        onClick={()=>{
                            setActiveEditSelectedTask(data)
                            setSelectedTaskData_EST(data)
                            //Audit trail stuff to display
                            togglePopup_EST()
                        }}

                        onMouseEnter={()=>{setIsHover5(true); setIsHover6(data)}}
                        onMouseLeave={()=>{setIsHover5(false); setIsHover6(data)}}
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
                            ,color:((ActiveAuditTrail === data)||((IsHover3)&&(IsHover4 === data))?  "white" : "black")
                            ,backgroundColor:((ActiveAuditTrail === data)||((IsHover3)&&(IsHover4 === data))?  "lightslategray" : "lightgray")
                        }}
                        
                        onClick={()=>{
                            setActiveAuditTrail(data)
                            setSelectedTaskData_AT(data)
                            //Audit trail stuff to display
                            togglePopup_AT()
                        }}

                        onMouseEnter={()=>{setIsHover3(true); setIsHover4(data)}}
                        onMouseLeave={()=>{setIsHover3(false); setIsHover4(data)}}
                    >
                        Audit Trail
                    </button>

                </div>
            )}
        </>
    )
}

export default TaskDisplayTemplate;