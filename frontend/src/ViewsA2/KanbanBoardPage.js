import React, { useState, useEffect } from 'react'
import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';

import G_ManagementCom from '../ComponentsA1/G_ManagementCom'

import TaskDisplayTemplate from './TaskDisplayTemplate'
import NoTaskDataTemp from './NoTaskDataTemp'
import ButtonsMap from '../ComponentsA2/ButtonsMap'
import Popup from "./PopupTemplate";
import HandleSave from '../ComponentsA2/HandleSave';

// ~~~~~ testing ButtonTemplate ~~~~~
// import ButtonTemplate from '../ComponentsA2/ButtonTemplate';
// import togglePopup from '../ComponentsA2/ButtonTemplate';


function KanbanBoardPage(props){
    useEffect(()=>{
        props.setDataHeader("Kanban Board")
    },[])

    //================ Title & buttons ================
    const [ActiveApp, setActiveApp] = useState()
    const [ActivePlan, setActivePlan] = useState()

    
    //~~~~~~~~~~~~~~~~ Temp mySQL App data array ~~~~~~~~~~~~~~~~
    const App_Acronym = ["App 1","App 2","App 3","App 4","App 5"];
    
    //~~~~~~~~~~~~~~~~ Temp mySQL Plan data array ~~~~~~~~~~~~~~~~
    const Plan_Acronym = ["Plan 1","Plan 2","Plan 3","Plan 4","Plan 5"];

    //~~~~~~~~~~~~~~~~ Temp mySQL Task data array ~~~~~~~~~~~~~~~~
    //(data for each column is determine by task_state)
    const Open_data = ["open 1","open 2","open 3","open 4","open 5"];
    const ToDo_data = ["todo 1","todo 2","todo 3","todo 4","todo 5"];
    const Doing_data = ["doing 1","doing 2","doing 3","doing 4","doing 5"];
    const Done_data = ["done 1","done 2","done 3","done 4","done 5"];
    const Close_data = ["close 1","close 2","close 3","close 4","close 5"];

    //~~~~~~~~~~~~~~~~ mySQL All Group data array ~~~~~~~~~~~~~~~~
    const [ResultAllG, setResultAllG] = useState(false)
    //Retrieve All Groups from SQL
    useEffect(()=>{
        G_ManagementCom.getAllG(setResultAllG)
    },[]);
    if(ResultAllG.errMsg){
    console.log(ResultAllG.errMsg)
    }
    
    //================ Create App Popup display ================
    const [ActiveCreateApp, setActiveCreateApp] = useState(false)
    const [HoverCreateApp, setHoverCreateApp] = useState(false)
    const [isOpen_CreateApp, setIsOpen_CreateApp] = useState(false);
    const togglePopup_CreateApp = () => {
        setActiveCreateApp(!ActiveCreateApp);
        setIsOpen_CreateApp(!isOpen_CreateApp);
        
        setAppPermit_Create()
        setAppPermit_Open()
        setAppPermit_toDoList()
        setAppPermit_Doing()
        setAppPermit_Done()
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
    const [ActiveCreatePlan, setActiveCreatePlan] = useState(false)
    const [HoverCreatePlan, setHoverCreatePlan] = useState(false)
    const [isOpen_CreatePlan, setIsOpen_CreatePlan] = useState(false);
    const togglePopup_CreatePlan = () => {
        setActiveCreatePlan(!ActiveCreatePlan);
        setIsOpen_CreatePlan(!isOpen_CreatePlan);
    }

    //================ Edit Plan Popup display ================
    const [ActiveEditPlan, setActiveEditPlan] = useState(false)
    const [HoverEditPlan, setHoverEditPlan] = useState(false)
    const [isOpen_EditPlan, setIsOpen_EditPlan] = useState(false);
    const togglePopup_EditPlan = () => {
        setActiveEditPlan(!ActiveEditPlan);
        setIsOpen_EditPlan(!isOpen_EditPlan);
    }

    //================ Create Task Popup display ================
    const [ActiveCreateTask, setActiveCreateTask] = useState(false)
    const [HoverCreateTask, setHoverCreateTask] = useState(false)
    const [isOpen_CreateTask, setIsOpen_CreateTask] = useState(false);
    const togglePopup_CreateTask = () => {
        setActiveCreateTask(!ActiveCreateTask);
        setIsOpen_CreateTask(!isOpen_CreateTask);
    }

     //================ Audit Trail button ================
     const [ActiveEditSelectedTask, setActiveEditSelectedTask] = useState()
     //================ Audit Trail Popup display ================
     const [selectedTaskData_EST, setSelectedTaskData_EST] = useState();
     const [isOpen_EditSelectedTask, setIsOpen_EditSelectedTask] = useState(false);
     const togglePopup_EditSelectedTask = () => {
         setActiveEditSelectedTask();
         setIsOpen_EditSelectedTask(!isOpen_EditSelectedTask);
     }

    //================ Audit Trail button ================
    const [ActiveAuditTrail, setActiveAuditTrail] = useState()
    //================ Audit Trail Popup display ================
    const [selectedTaskData_AT, setSelectedTaskData_AT] = useState();
    const [isOpen_AuditTrail, setIsOpen_AuditTrail] = useState(false);
    const togglePopup_AuditTrail = () => {
        setActiveAuditTrail();
        setIsOpen_AuditTrail(!isOpen_AuditTrail);
    }


    //~~~~~~~~~~~~~~~~ App Set State ~~~~~~~~~~~~~~~~
    const [AppAcronym, setAppAcronym] = useState();
    const [AppDescription, setAppDescription] = useState();
    const [AppRNumber, setAppRNumber] = useState();
    const [AppStartDate, setAppStartDate] = useState();
    const [AppEndDate, setAppEndDate] = useState();
    const [AppPermit_Create, setAppPermit_Create] = useState();
    const [AppPermit_Open, setAppPermit_Open] = useState();
    const [AppPermit_toDoList, setAppPermit_toDoList] = useState();
    const [AppPermit_Doing, setAppPermit_Doing] = useState();
    const [AppPermit_Done, setAppPermit_Done] = useState();

    //~~~~~~~~~~~~~~~~ Plan Set State ~~~~~~~~~~~~~~~~
    const [PlanMVPName, setPlanMVPName] = useState();
    const [PlanStartDate, setPlanStartDate] = useState();
    const [PlanEndDate, setPlanEndDate] = useState();
    const [PlanAppAcronym, setPlanAppAcronym] = useState();
  
    //~~~~~~~~~~~~~~~~ Task Set State ~~~~~~~~~~~~~~~~
    const [TaskName, setTaskName] = useState();
    const [TaskDescription, setTaskDescription] = useState();
    const [TaskNotes, setTaskNotes] = useState();
    const [TaskID, setTaskID] = useState();
    const [TaskPlan, setTaskPlan] = useState();
    const [TaskAppAcronym, setTaskAppAcronym] = useState();
    const [TaskState, setTaskState] = useState();
    const [TaskCreator, setTaskCreator] = useState();
    const [TaskOwner, setTaskOwner] = useState();
    const [TaskCreateDate, setTaskCreateDate] = useState();

  
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
                            <h4>{Plan_Acronym? ButtonsMap(Plan_Acronym, ActivePlan, setActivePlan):"-"}</h4>
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
                            <div className='col-6'>
                                <h4>&nbsp;Plan: {ActivePlan? ActivePlan:"-"}</h4>
                            {/* </div> */}
                            {/* <div className='col-7'> */}
                                <p className='col-7' style={{fontSize: "small"}}>&nbsp;Start date: {ActivePlan? ActivePlan:"-"}</p>
                            {/* </div> */}
                            {/* <div className='col-8'> */}
                                <p  className='col-8'style={{fontSize: "small"}}>&nbsp;End date: {ActivePlan? ActivePlan:"-"}</p>
                            </div>
                            <div className='col-5'>
                                <button 
                                    style={{
                                        marginInline: "5px"
                                        ,marginBottom: "10px"
                                        ,marginTop: "10px"
                                        ,border: "1.5px solid darkslategray"
                                        ,borderRadius: "3px"
                                        ,color:(ActiveCreatePlan||HoverCreatePlan?  "white" : "black")
                                        ,backgroundColor:(ActiveCreatePlan||HoverCreatePlan?  "lightslategray" : "lightgray")
                                    }}
                                    onClick={togglePopup_CreatePlan}
                                    onMouseEnter={()=>{setHoverCreatePlan(true)}}
                                    onMouseLeave={()=>{setHoverCreatePlan(false)}}
                                >
                                    Create Plan
                                </button>
                                        
                                {/* testing ButtonTemplate */}
                                {/* <ButtonTemplate name={"Create Plan"} isOpen={isOpen_CreatePlan} setIsOpen={setIsOpen_CreatePlan}/> */}
                            
                            </div>
                            {ActivePlan && (<div className='col-10'>
                                <button 
                                    style={{
                                        marginInline: "5px"
                                        ,marginBottom: "10px"
                                        ,marginTop: "10px"
                                        ,border: "1.5px solid darkslategray"
                                        ,borderRadius: "3px"
                                        ,color:(ActiveEditPlan||HoverEditPlan?  "white" : "black")
                                        ,backgroundColor:(ActiveEditPlan||HoverEditPlan?  "lightslategray" : "lightgray")
                                    }}
                                    onClick={togglePopup_EditPlan}
                                    onMouseEnter={()=>{setHoverEditPlan(true)}}
                                    onMouseLeave={()=>{setHoverEditPlan(false)}}
                                >
                                    Edit Plan: <br/> {ActivePlan}
                                </button>
                            </div>)}
                        </div>
                    </div>
                </div>
                





                {/*================ Task Activities ================*/}
                    {/*~~~~~~~~~~ Open ~~~~~~~~~~*/}
                    <div className='col-5' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                        <h3>
                            Open
                            <button 
                                style={{
                                    float:"right"
                                    ,marginInline: "5px"
                                    ,marginBottom: "5px"
                                    ,border: "1.5px solid darkslategray"
                                    ,borderRadius: "3px"
                                    ,color:(ActiveCreateTask||HoverCreateTask?  "white" : "black")
                                    ,backgroundColor:(ActiveCreateTask||HoverCreateTask?  "lightslategray" : "lightgray")
                                }}
                                onClick={togglePopup_CreateTask}
                                onMouseEnter={()=>{setHoverCreateTask(true)}}
                                onMouseLeave={()=>{setHoverCreateTask(false)}}
                            >
                                Create Task
                            </button>

                            <p style={{fontSize: "small"}}>
                                permit: {ActiveApp? ActiveApp:"-"}
                            </p>
                        </h3>
                        
                        {Open_data? TaskDisplayTemplate(Open_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
                            , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask):NoTaskDataTemp()}
                    </div>
                    
                    {/*~~~~~~~~~~ To Do ~~~~~~~~~~*/}
                    <div className='col-5' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                        <h3>
                            To Do
                            <p style={{fontSize: "small"}}>
                                permit: {ActiveApp? ActiveApp:"-"}
                            </p>
                        </h3>
                        
                        {ToDo_data? TaskDisplayTemplate(ToDo_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
                            , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask):NoTaskDataTemp()}
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

                        {Doing_data? TaskDisplayTemplate(Doing_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
                            , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask):NoTaskDataTemp()}
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

                        {Done_data? TaskDisplayTemplate(Done_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
                            , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask):NoTaskDataTemp()}
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

                        {Close_data? TaskDisplayTemplate(Close_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
                            , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask):NoTaskDataTemp()}
                    </div>
            </div>






            {/* ================ Create App Popup display ================ */}
            {isOpen_CreateApp && <Popup
                content={
                    <>
                        <form onSubmit={(e)=>{e.preventDefault(); HandleSave.SaveCreateApp(AppAcronym,AppDescription,AppRNumber,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done
                            ,(update_status)=>{

                                if(update_status.success){
                                    toast.success("Update Successful", {hideProgressBar:true})
                                }
                                else{
                                    console.log(update_status.errMsg)
                                }

                                togglePopup_CreateApp()
                            }
                        )}}>
                            {/*App Acronym*/}
                            <div>*App: <input type="text" placeholder="Acronym" aria-describedby="basic-addon1" onChange={e => setAppAcronym(e.target.value)}/></div>
                            <br/>
                            <div>*Running No.: <input type="number" onChange={e => setAppRNumber(e.target.value)}/></div>
                            <br/>
                            <div className='col-7'>*Start Date: <input type="date" id="startdate" name="startdate" onChange={e => setAppStartDate(e.target.value)}/></div>
                            <div className='col-7'>*End Date: <input type="date" id="enddate" name="enddate" onChange={e => setAppEndDate(e.target.value)}/></div>
                            <br/>
                            <div className='col-6'>
                                <div className='col-11' style={{marginTop:"15px"}}>*Open:</div>
                                <div className='col-11' style={{marginTop:"15px"}}>*To Do:</div>
                                <div className='col-11' style={{marginTop:"15px"}}>*Doing:</div>
                                <div className='col-11' style={{marginTop:"15px"}}>*Done:</div>
                                <div className='col-11' style={{marginTop:"15px"}}>*Close:</div>
                            </div>
                            <div className='col-6' style={{marginTop:"1px"}}>
                                <div className='col-11'>
                                    <Multiselect
                                        placeholder="Select Group"
                                        hidePlaceholder='true'
                                        displayValue="group_name"
                                        onRemove={(selection) => {
                                            setAppPermit_Create(selection)
                                        }}
                                        onSelect={(selection) => {
                                            setAppPermit_Create(selection)
                                        }}
                                        options={ResultAllG.GroupData.filter(item => item.group_name !== 'admin')}
                                        selectedValues={AppPermit_Create}
                                        showCheckbox
                                        selectionLimit={1}
                                    />
                                </div>
                                <div className='col-11'>
                                    <Multiselect
                                        placeholder="Select Group"
                                        hidePlaceholder='true'
                                        displayValue="group_name"
                                        onRemove={(selection) => {
                                            setAppPermit_Open(selection)
                                        }}
                                        onSelect={(selection) => {
                                            setAppPermit_Open(selection)
                                        }}
                                        options={ResultAllG.GroupData.filter(item => item.group_name !== 'admin')}
                                        selectedValues={AppPermit_Open}
                                        showCheckbox
                                        selectionLimit={1}
                                    />
                                </div>
                                <div className='col-11'>
                                    <Multiselect
                                        placeholder="Select Group"
                                        hidePlaceholder='true'
                                        displayValue="group_name"
                                        onRemove={(selection) => {
                                            setAppPermit_toDoList(selection)
                                        }}
                                        onSelect={(selection) => {
                                            setAppPermit_toDoList(selection)
                                        }}
                                        options={ResultAllG.GroupData.filter(item => item.group_name !== 'admin')}
                                        selectedValues={AppPermit_toDoList}
                                        showCheckbox
                                        selectionLimit={1}
                                    />
                                </div>
                                <div className='col-11'>
                                    <Multiselect
                                        placeholder="Select Group"
                                        hidePlaceholder='true'
                                        displayValue="group_name"
                                        onRemove={(selection) => {
                                            setAppPermit_Doing(selection)
                                        }}
                                        onSelect={(selection) => {
                                            setAppPermit_Doing(selection)
                                        }}
                                        options={ResultAllG.GroupData.filter(item => item.group_name !== 'admin')}
                                        selectedValues={AppPermit_Doing}
                                        showCheckbox
                                        selectionLimit={1}
                                    />
                                </div>
                                <div className='col-11'>
                                    <Multiselect
                                        placeholder="Select Group"
                                        hidePlaceholder='true'
                                        displayValue="group_name"
                                        onRemove={(selection) => {
                                            setAppPermit_Done(selection)
                                        }}
                                        onSelect={(selection) => {
                                            setAppPermit_Done(selection)
                                        }}
                                        options={ResultAllG.GroupData.filter(item => item.group_name !== 'admin')}
                                        selectedValues={AppPermit_Done}
                                        showCheckbox
                                        selectionLimit={1}
                                    />
                                </div>
                            </div>
                            <textarea style={{ resize: 'none', overflow:'auto', marginTop:"15px"}} id='description' rows="4" cols="100" className="form-control" placeholder="Description (Optional)" onChange={e => setAppDescription(e.target.value)}/>
                            <p style={{fontSize:"small"}}>* compulsory fields</p>

                            {/*Buttons*/}
                            <p><button style={{marginTop:"15px", float:"right"}} type="submit" href="#">Save</button></p>
                        </form>
                    </>
                }
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
            {/* testing ButtonTemplate */}
            {/* {isOpen_CreatePlan && <Popup
                content={<>
                <b>Plan Creation</b>
                <p><button onClick={()=>{console.log("test create plan")}}>Save</button></p>
                </>}
                handleClose={  <ButtonTemplate.togglePopup  isOpen={isOpen_CreatePlan} setIsOpen={setIsOpen_CreatePlan}/>}
            />} */}

            {isOpen_CreatePlan && <Popup
                content={<>
                    <form onSubmit={(e)=>{e.preventDefault(); HandleSave.SaveCreatePlan(
                        ,(update_status)=>{

                            if(update_status.success){
                                toast.success("Update Successful", {hideProgressBar:true})
                            }
                            else{
                                console.log(update_status.errMsg)
                            }

                            togglePopup_CreateApp()
                        }
                    )}}>
                        {/*App Acronym*/}
                        <div>*App: <input type="text" placeholder="Acronym" aria-describedby="basic-addon1" onChange={e => setAppAcronym(e.target.value)}/></div>
                        <br/>
                        <div>*Running No.: <input type="number" onChange={e => setAppRNumber(e.target.value)}/></div>
                        <br/>
                        <div className='col-7'>*Start Date: <input type="date" id="startdate" name="startdate" onChange={e => setAppStartDate(e.target.value)}/></div>
                        <div className='col-7'>*End Date: <input type="date" id="enddate" name="enddate" onChange={e => setAppEndDate(e.target.value)}/></div>
                        <p style={{fontSize:"small"}}>* compulsory fields</p>

                        {/*Buttons*/}
                        <p><button style={{marginTop:"15px", float:"right"}} type="submit" href="#">Save</button></p>
                    </form>              
                </>}
                handleClose={togglePopup_CreatePlan}
            />}

            {/* ================ Edit Plan Popup display ================ */}
            {isOpen_EditPlan && <Popup
                content={<>
                <b>Editing Plan</b>
                <p><button onClick={()=>{console.log("test Edit plan", ActivePlan)}}>Save</button></p>
                </>}
                handleClose={togglePopup_EditPlan}
            />}

            {/* ================ Create Task Popup display ================ */}
            {isOpen_CreateTask && <Popup
                content={<>
                <b>Task Creation</b>
                <p><button onClick={()=>{console.log("test Create Task")}}>Save</button></p>
                </>}
                handleClose={togglePopup_CreateTask}
            />}

            {/* ================ Audit Trail Popup display ================ */}
            {isOpen_EditSelectedTask && <Popup
                content={<>
                <b>Editing Task: {selectedTaskData_EST}</b>
                <p>{selectedTaskData_EST}</p>
                <button onClick={()=>{console.log("test EST")}}>Test button</button>
                </>}
                handleClose={togglePopup_EditSelectedTask}
            />}

            {/* ================ Audit Trail Popup display ================ */}
            {isOpen_AuditTrail && <Popup
                content={<>
                <b>Audit Trail: {selectedTaskData_AT}</b>
                <p>{selectedTaskData_AT}</p>
                <button onClick={()=>{console.log("test")}}>Test button</button>
                </>}
                handleClose={togglePopup_AuditTrail}
            />}

            <div>
                <ToastContainer />
            </div>
        </>
    )

}

export default KanbanBoardPage;