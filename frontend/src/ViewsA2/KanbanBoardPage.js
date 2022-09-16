import React, { useState, useEffect } from 'react'

import TaskDisplayTemplate from './TaskDisplayTemplate'
import NoTaskDataTemp from './NoTaskDataTemp'
import ButtonsMap from '../ComponentsA2/ButtonsMap'
import Popup from "./PopupTemplate";
import ButtonTemplate from '../ComponentsA2/ButtonTemplate';


function KanbanBoardPage(props){
    useEffect(()=>{
        props.setDataHeader("Kanban Board - App List")
    },[])

    //================ Title & buttons ================
    const [ActiveApp, setActiveApp] = useState()
    const [ActivePlan, setActivePlan] = useState()

    
    //================ Temp mySQL App data array ================
    const App_Acronym = ["App 1","App 2","App 3","App 4","App 5"];
    
    //================ Temp mySQL Plan data array ================
    const Plan_Acronym = ["Plan 1","Plan 2","Plan 3","Plan 4","Plan 5"];

    //================ Temp mySQL Task data array ================
    //(data for each column is determine by task_state)
    const Open_data = ["open 1","open 2","open 3","open 4","open 5"];
    const ToDo_data = ["todo 1","todo 2","todo 3","todo 4","todo 5"];
    const Doing_data = ["doing 1","doing 2","doing 3","doing 4","doing 5"];
    const Done_data = ["done 1","done 2","done 3","done 4","done 5"];
    const Close_data = ["close 1","close 2","close 3","close 4","close 5"];

    //================ Create App Popup display ================
    const [ActiveCreateApp, setActiveCreateApp] = useState(false)
    const [HoverCreateApp, setHoverCreateApp] = useState(false)
    const [isOpen_CreateApp, setIsOpen_CreateApp] = useState(false);
    const togglePopup_CreateApp = () => {
        setActiveCreateApp(!ActiveCreateApp);
        setIsOpen_CreateApp(!isOpen_CreateApp);
    }

    //================ Edit App Popup display ================
    const [ActiveEditApp, setActiveEditApp] = useState(false)
    const [HoverEditApp, setHoverEditApp] = useState(false)
    const [isOpen_EditApp, setIsOpen_EditApp] = useState(false);
    const togglePopup_EditApp = () => {
        setActiveEditApp(!ActiveEditApp);
        setIsOpen_EditApp(!isOpen_EditApp);
    }

    //================ Create Plan Popup display ================
    const [isOpen_CreatePlan, setIsOpen_CreatePlan] = useState(false);



    //================ Audit Trail button ================
    const [ActiveAuditTrail, setActiveAuditTrail] = useState()
    //================ Audit Trail Popup display ================
    const [selectedTaskData, setSelectedTaskData] = useState();
    const [isOpen_AuditTrail, setIsOpen_AuditTrail] = useState(false);
    const togglePopup_AuditTrail = () => {
        setActiveAuditTrail();
        setIsOpen_AuditTrail(!isOpen_AuditTrail);
    }
    

    return(
        <>
            {/*================ Title & buttons ================*/}
            <div className='col-6'> 
                <h2><u>Apps</u></h2>
                <p>
                    <button 
                        style={{
                            border: "1.5px solid darkslategray"
                            ,borderRadius: "3px"
                            ,color:(ActiveCreateApp||HoverCreateApp?  "white" : "black")
                            ,backgroundColor:(ActiveCreateApp||HoverCreateApp?  "lightslategray" : "lightgray")
                        }}
                        onClick={togglePopup_CreateApp}
                        onMouseEnter={()=>{setHoverCreateApp(true)}}
                        onMouseLeave={()=>{setHoverCreateApp(false)}}
                    >
                        Create App
                    </button>
                </p>
                <p>
                    <b>Applications:&nbsp;</b>
                    {App_Acronym? ButtonsMap(App_Acronym, ActiveApp, setActiveApp):"-"}
                </p>
            </div>
            
            {/*================ Selected Kanban App ================*/}
            <div className='col-6' style={{border: '2px solid gray', padding: "2px"}}>
                <div className='col-6' style={{borderBottom: '2px solid gray', padding: "2px"}}>
                    {/*================ App & Plan Header ================*/}
                    <div className='col-6' style={{marginBottom: "-15px"}}>
                        {/*================ App Header ================*/}
                        <div className='col-9'>
                            <div className='col-10'>
                                <h3>&nbsp;<u>App: {ActiveApp? ActiveApp:"-"}</u></h3>
                            </div>
                            <div className='col-5'>
                                <p>
                                    <button 
                                        style={{
                                            border: "1.5px solid darkslategray"
                                            ,borderRadius: "3px"
                                            ,color:(ActiveEditApp||HoverEditApp?  "white" : "black")
                                            ,backgroundColor:(ActiveEditApp||HoverEditApp?  "lightslategray" : "lightgray")
                                        }}
                                        onClick={togglePopup_EditApp}
                                        onMouseEnter={()=>{setHoverEditApp(true)}}
                                        onMouseLeave={()=>{setHoverEditApp(false)}}
                                    >
                                        Edit App
                                    </button>
                                </p>
                            </div>
                        </div>
                        {/*================ Plan Header ================*/}
                        <div className='col-9' style={{borderLeft:"2px solid gray", borderLeftStyle:"dotted"}}>
                            <h4>&nbsp;Plan: {Plan_Acronym? ButtonsMap(Plan_Acronym, ActivePlan, setActivePlan):"-"}</h4>
                        </div>
                    </div>


                    <div className='col-6' style={{marginTop: "-7px"}}>
                        {/*================ App Info ================*/}
                        <div className='col-9' >
                            <div className='col-7'>
                                <p style={{fontSize: "small"}}>&nbsp;Start date: {ActiveApp? ActiveApp:"-"}</p>
                            </div>

                            <div className='col-8'>
                                <p style={{fontSize: "small"}}>&nbsp;End date: {ActiveApp? ActiveApp:"-"}</p>
                            </div>

                            <div className='col-6'>
                                <p style={{fontSize: "small"}}>&nbsp;Description: {ActiveApp? ActiveApp:"-"}</p>
                            </div>
                        </div>

                        {/*================ Plan Info ================*/}
                        <div className='col-9' style={{borderLeft:"2px solid gray", borderLeftStyle:"dotted"}}>
                            <div className='col-7'>
                                <p style={{fontSize: "small"}}>&nbsp;Start date: {ActivePlan? ActivePlan:"-"}</p>
                            </div>
                            <div className='col-8'>
                                <p style={{fontSize: "small"}}>&nbsp;End date: {ActivePlan? ActivePlan:"-"}</p>
                            </div>
                            <div className='col-6'>
                                {/* <button style={{marginInline: "5px", marginBottom: "10px",marginTop: "10px"}}>Create Plan</button> */}
                            
                                <ButtonTemplate name={"Create Plan"} isOpen={isOpen_CreatePlan} setIsOpen={setIsOpen_CreatePlan}/>
                            
                            </div>
                        </div>
                    </div>
                </div>
                




                {/*================ Task Activities ================*/}
                    {/*~~~~~~~~~~ Open ~~~~~~~~~~*/}
                    <div className='col-5' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                        <h3>
                            Open
                            <button style={{float:"right", marginInline: "5px", marginBottom: "5px"}}>Create Task</button>
                            <p style={{fontSize: "small"}}>
                                permit: {ActiveApp? ActiveApp:"-"}
                            </p>
                        </h3>
                        
                        {Open_data? TaskDisplayTemplate(Open_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData, ActiveAuditTrail, setActiveAuditTrail):NoTaskDataTemp()}
                    </div>
                    
                    {/*~~~~~~~~~~ To Do ~~~~~~~~~~*/}
                    <div className='col-5' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                        <h3>
                            To Do
                            <p style={{fontSize: "small"}}>
                                permit: {ActiveApp? ActiveApp:"-"}
                            </p>
                        </h3>
                        
                        {ToDo_data? TaskDisplayTemplate(ToDo_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData, ActiveAuditTrail, setActiveAuditTrail):NoTaskDataTemp()}
                    </div>
                    
                    {/*~~~~~~~~~~ Doing~~~~~~~~~~*/}
                    <div className='col-5' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                        <h3>
                            Doing
                            <p 
                                style={{fontSize: "small"}}>
                                permit: {ActiveApp? ActiveApp:"-"}
                            </p>
                        </h3>

                        {Doing_data? TaskDisplayTemplate(Doing_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData, ActiveAuditTrail, setActiveAuditTrail):NoTaskDataTemp()}
                    </div>
                    
                    {/*~~~~~~~~~~ Done ~~~~~~~~~~*/}
                    <div className='col-5' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                        <h3>
                            Done
                            <p 
                                style={{fontSize: "small"}}>
                                permit: {ActiveApp? ActiveApp:"-"}
                            </p>
                        </h3>

                        {Done_data? TaskDisplayTemplate(Done_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData, ActiveAuditTrail, setActiveAuditTrail):NoTaskDataTemp()}
                    </div>

                    {/*~~~~~~~~~~ Close ~~~~~~~~~~*/}
                    <div className='col-5' style={{padding: "2px", minHeight:"500px"}}> 
                        <h3>
                            Close
                            <p 
                                style={{fontSize: "small"}}>
                                permit: {ActiveApp? ActiveApp:"-"}
                            </p>
                        </h3>

                        {Close_data? TaskDisplayTemplate(Close_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData, ActiveAuditTrail, setActiveAuditTrail):NoTaskDataTemp()}
                    </div>
            </div>

            {/* ================ Create App Popup display ================ */}
            {isOpen_CreateApp && <Popup
                content={<>
                <b>App Creation</b>
                <p><button onClick={()=>{console.log("test create app")}}>Save</button></p>
                </>}
                handleClose={togglePopup_CreateApp}
            />}

            {/* ================ Edit App Popup display ================ */}
            {isOpen_EditApp && <Popup
                content={<>
                <b>Editing App</b>
                <p><button onClick={()=>{console.log("test edit app", ActiveApp)}}>Save</button></p>
                </>}
                handleClose={togglePopup_EditApp}
            />}

            {/* ================ Create Plan Popup display ================ */}
            {isOpen_CreatePlan && <Popup
                content={<>
                <b>Plan Creation</b>
                <p><button onClick={()=>{console.log("test create plan")}}>Save</button></p>
                </>}
                handleClose={setIsOpen_CreatePlan(!isOpen_CreatePlan)}
            />}






            {/* ================ Audit Trail Popup display ================ */}
            {isOpen_AuditTrail && <Popup
                content={<>
                <b>Audit Trail: {selectedTaskData}</b>
                <p>{selectedTaskData}</p>
                <button onClick={()=>{console.log("test")}}>Test button</button>
                </>}
                handleClose={togglePopup_AuditTrail}
            />}
        </>
    )

}

export default KanbanBoardPage;