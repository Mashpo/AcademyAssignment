import React, { useState, useEffect } from 'react'


function TaskDisplayTemplate(data){

    //================ Task Display ================
    const [IsHover, setIsHover] = useState(false)
    const [IsHover2, setIsHover2] = useState()

    //================ Audit Trail button ================
    const [ActiveAuditTrail, setActiveAuditTrail] = useState(false)
    const [IsHover3, setIsHover3] = useState(false)
    const [IsHover4, setIsHover4] = useState()

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
                        Notes: {data}
                        <br/>
                    </p>
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

                            // set Audit trail stuff to display
                        }}

                        onMouseEnter={()=>{setIsHover3(true); setIsHover4(data)}}
                        onMouseLeave={()=>{setIsHover3(false); setIsHover4(data)}}
                    >
                        Audit Trail
                    </button>


                    <span className="tooltiptext">
                        <p style={{fontSize: "small", textAlign:"center", padding:"5px"}}>
                            id: {data}
                            <br/>
                            Creator: {data}
                            <br/>
                            Date Created: {data}
                        </p>
                    </span>
                </div>
            )}
        </>
    )
}

export default TaskDisplayTemplate;