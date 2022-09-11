import React, { useState, useEffect } from 'react'

import TaskDisplayTemplate from './TaskDisplayTemplate'
import NoTaskDataTemp from './NoTaskDataTemp'

function KanbanBoardPage(props){
    useEffect(()=>{
        props.setDataHeader("Kanban Board - App List")
    },[])

    //================ Title & buttons ================
    const [ActiveApp, setActiveApp] = useState()
    const [IsHover, setIsHover] = useState(false)
    const [IsHover2, setIsHover2] = useState()
    
    //================ Temp mySQL App data array ================
    const App_Acronym = ["1","2","3","4","5"];

    //================ Temp mySQL Task data array ================
    const Open_data = ["open 1","open 2","open 3","open 4","open 5"];
    const ToDo_data = ["todo 1","todo 2","todo 3","todo 4","todo 5"];
    const Doing_data = ["doing 1","doing 2","doing 3","doing 4","doing 5"];
    const Done_data = ["done 1","done 2","done 3","done 4","done 5"];
    const Close_data = ["close 1","close 2","close 3","close 4","close 5"];


    return(
        <>
            {/*================ Title & buttons ================*/}
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
            
            <div className='col-6' style={{border: '2px solid gray', padding: "2px"}}>
                {/*================ App Info ================*/}
                <div className='col-6' style={{borderBottom: '2px solid gray', padding: "2px"}}>
                    <br/>
                    <h3>&nbsp;<u>App: {ActiveApp? ActiveApp:"-"}</u></h3>

                    <div className='col-7'>
                        <p>&nbsp;Start date: {ActiveApp? ActiveApp:"-"}</p>
                        <p>&nbsp;End date: {ActiveApp? ActiveApp:"-"}</p>
                    </div>

                    <div className='col-8'>
                        <p>&nbsp;App Description: {ActiveApp? ActiveApp:"-"}</p>
                    </div>
                </div>
                
                {/*================ Open ================*/}
                <div className='col-5' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                    <h3>
                        Open 
                        <p style={{fontSize: "small"}}>
                            permit: {ActiveApp? ActiveApp:"-"}
                        </p>
                    </h3>
                    
                    {Open_data? TaskDisplayTemplate(Open_data):NoTaskDataTemp()}
                </div>
                
                {/*================ To Do ================*/}
                <div className='col-5' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                    <h3>
                        To Do
                        <p style={{fontSize: "small"}}>
                            permit: {ActiveApp? ActiveApp:"-"}
                        </p>
                    </h3>
                    
                    {TaskDisplayTemplate(ToDo_data)}
                </div>
                
                {/*================ Doing ================*/}
                <div className='col-5' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                    <h3>
                        Doing
                        <p 
                            style={{fontSize: "small"}}>
                            permit: {ActiveApp? ActiveApp:"-"}
                        </p>
                    </h3>

                    {TaskDisplayTemplate(Doing_data)}
                </div>
                
                {/*================ Done ================*/}
                <div className='col-5' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                    <h3>
                        Done
                        <p 
                            style={{fontSize: "small"}}>
                            permit: {ActiveApp? ActiveApp:"-"}
                        </p>
                    </h3>

                    {TaskDisplayTemplate(Done_data)}
                </div>

                {/*================ Close ================*/}
                <div className='col-5' style={{padding: "2px", minHeight:"500px"}}> 
                    <h3>
                        Close
                        <p 
                            style={{fontSize: "small"}}>
                            permit: {ActiveApp? ActiveApp:"-"}
                        </p>
                    </h3>

                    {TaskDisplayTemplate(Close_data)}
                </div>
            </div>
        </>
    )

}

export default KanbanBoardPage;