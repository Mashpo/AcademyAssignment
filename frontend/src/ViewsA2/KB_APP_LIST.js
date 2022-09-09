import React, { useState, useEffect } from 'react'

function TaskDisplayTemplate(){
    return(
        <>
            <div className='col-6-Border'>

            </div>
        </>
    )
}

function KB_APP_LIST(props){
    useEffect(()=>{
        props.setDataHeader("Kanban Board - App List")
    },[])

    //Title & buttons
    const [ActiveApp, setActiveApp] = useState("")
    const [IsHover, setIsHover] = useState(false)
    const [IsHover2, setIsHover2] = useState("")
    
    //Temp mySQL App data array
    const App_Acronym = ["1","2","3","4","5"];

    //Temp mySQL Task data array
    const Task_data = ["test 1","test 2","test 3","test 4","test 5"];

    return(
        <>
            {/* Title & buttons */}
            <div className='col-6'> 
                <h2><u>Apps</u></h2>
                <p><button>Create App</button></p>
                <p>
                    <b>Applications:&nbsp;</b>

                    {App_Acronym.map((App_Acronym)=> 
                        <button 
                            key={App_Acronym} 
                            style={{
                                marginInline: "5px"
                                ,marginBottom: "10px"
                                ,border: "1.5px solid darkslategray"
                                ,borderRadius: "3px"
                                ,color:((ActiveApp === App_Acronym)||((IsHover === true)&&(IsHover2 === App_Acronym))?  "white" : "black")
                                ,backgroundColor:((ActiveApp === App_Acronym)||((IsHover === true)&&(IsHover2 === App_Acronym))?  "#6b81cd" : "#b4bfe8")
                            }}
                            
                            onClick={()=>{
                                setActiveApp(App_Acronym)
                            }}

                            onMouseEnter={()=>{setIsHover(true); setIsHover2(App_Acronym)}}
                            onMouseLeave={()=>{setIsHover(false); setIsHover2(App_Acronym)}}
                        >
                            {"app" + App_Acronym}
                        </button>
                    )}
                </p>
            </div>
            
            {/* App Info */}
            <div className='col-6'>
                <br/>
                <h3>&nbsp;App: {ActiveApp? ActiveApp:"-"}</h3>

                <div className='col-7'>
                    <p>&nbsp;Start date: {ActiveApp? ActiveApp:"-"}</p>
                    <p>&nbsp;End date: {ActiveApp? ActiveApp:"-"}</p>
                </div>

                <div className='col-8'>
                    <p>&nbsp;App Description: {ActiveApp? ActiveApp:"-"}</p>
                </div>
            </div>
            
            {/* Open */}
            <div className='col-5'> 
                <h3>
                    Open 
                    
                    <p 
                        style={{
                            fontSize: "small"
                        }}>
                        permit: {ActiveApp? ActiveApp:"-"}
                    </p>
                </h3>
                
            </div>
            
            {/* To Do */}
            <div className='col-5'> 
                <h3>
                    To Do

                    <p 
                        style={{
                            fontSize: "small"
                        }}>
                        permit: {ActiveApp? ActiveApp:"-"}
                    </p>
                </h3>

            </div>
            
            {/* Doing */}
            <div className='col-5'> 
                <h3>
                    Doing
                        
                    <p 
                        style={{
                            fontSize: "small"
                        }}>
                        permit: {ActiveApp? ActiveApp:"-"}
                    </p>
                </h3>

            </div>
            
            {/* Done */}
            <div className='col-5'> 
                <h3>
                    Done
                
                    <p 
                        style={{
                            fontSize: "small"
                        }}>
                        permit: {ActiveApp? ActiveApp:"-"}
                    </p>
                </h3>

            </div>

            {/* Close */}
            <div className='col-5'> 
                <h3>
                    Close
                
                    <p 
                        style={{
                            fontSize: "small"
                        }}>
                        permit: {ActiveApp? ActiveApp:"-"}
                    </p>
                </h3>

            </div>

        </>
    )

}

export default KB_APP_LIST;