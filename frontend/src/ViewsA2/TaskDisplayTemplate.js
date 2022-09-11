import React, { useState, useEffect } from 'react'


function TaskDisplayTemplate(data){

    const [IsHover, setIsHover] = useState(false)
    const [IsHover2, setIsHover2] = useState()

    return(
        <>
            {data.map((data)=>
                <div 
                    key = {data}
                    className='col-6' 
                    style={{border: '2px solid black', padding: "10px", marginBottom:"5px",backgroundColor:(((IsHover === true)&&(IsHover2 === data))?  "#6b81cd" : "#b4bfe8")}}
                    onMouseEnter={()=>{setIsHover(true); setIsHover2(data)}}
                    onMouseLeave={()=>{setIsHover(false); setIsHover2(data)}}
                >
                    
                    <p style={{fontSize: "small"}}>
                        {/* task name */}
                        Task: {data}

                    </p>
                
                </div>
            )}
        </>
    )
}

export default TaskDisplayTemplate;