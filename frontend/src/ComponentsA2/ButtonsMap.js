import React, { useState, useEffect } from 'react'

function ButtonsMap (Acronym, Active, setActive){

    const [IsHover, setIsHover] = useState(false)
    const [IsHover2, setIsHover2] = useState()

    return(
        <>
            {(Acronym.length===0) && (
                <b> &nbsp; - </b>  
            )}
            {(Acronym.length>0) && (Acronym.map((Acronym)=> 
                <button 
                    key={Acronym} 
                    style={{
                        marginInline: "5px"
                        ,marginBottom: "10px"
                        ,border: "1.5px solid darkslategray"
                        ,borderRadius: "3px"
                        ,color:((Active === Acronym)||((IsHover === true)&&(IsHover2 === Acronym))?  "white" : "black")
                        ,backgroundColor:((Active === Acronym)||((IsHover === true)&&(IsHover2 === Acronym))?  "#6b81cd" : "#b4bfe8")
                    }}
                    
                    onClick={()=>{
                        setActive(Acronym)
                    }}

                    onMouseEnter={()=>{setIsHover(true); setIsHover2(Acronym)}}
                    onMouseLeave={()=>{setIsHover(false); setIsHover2(Acronym)}}
                >
                    {Acronym}
                </button>
            ))}
        </>
    )
}

export default ButtonsMap;