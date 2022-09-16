import React, { useEffect, useState } from "react";

const ButtonTemplate = props => {
    const [Active, setActive] = useState(false)
    const [Hover, setHover] = useState(false)
    const togglePopup = () => {
        props.setIsOpen(!props.isOpen);
    }

    useEffect(()=>{
        if (props.isOpen){
        setActive(!Active);
        }
        else if (!props.isOpen){
            setActive(!Active);
        }
    },[props.isOpen])
    

    return(
        <button 
            style={{
                border: "1.5px solid darkslategray"
                ,borderRadius: "3px"
                ,color:(Active||Hover?  "white" : "black")
                ,backgroundColor:(Active||Hover?  "lightslategray" : "lightgray")
            }}
            onClick={togglePopup}
            onMouseEnter={()=>{setHover(true)}}
            onMouseLeave={()=>{setHover(false)}}
        >
            {props.name}
        </button>
    )
}

export default ButtonTemplate;