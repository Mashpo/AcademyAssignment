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

    //================ Setting Header ================
    useEffect(()=>{
        props.setDataHeader("Kanban Board")
    },[])

    //================ User Identity & Privileges ================
    const token = JSON.parse(sessionStorage.getItem('token')).token

    //================ Mics Functions ================
    function UnpackDateForInput(dateToUnpack){
        return(
            new Date(dateToUnpack).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
        )
    }

    const selectArrayColumn = (FullArray, selectedColumn)=>{
        let selectedColumnArray = []
        FullArray.map((row)=>{
            selectedColumnArray.push(row[selectedColumn])
        })
        return selectedColumnArray
    }

    const selectArrayRow = (FullArray, selectedRow, selectedValue)=>{
        const filtered = FullArray.filter((row)=>{
            return row[selectedRow] === selectedValue
        })
        return filtered
    }

    function FormatDate(date) { /* e.g. 20 Sept 2022*/
        let f_date = new Date(date)
        return f_date.toLocaleDateString("en-GB", {day: 'numeric', month: 'short' /*or long*/, year: 'numeric'})
    }

    //================ Title & buttons ================
    const [ActiveApp, setActiveApp] = useState()
    const [ActivePlan, setActivePlan] = useState()



    //~~~~~~~~~~~~~~~~ mySQL App data array ~~~~~~~~~~~~~~~~
    const [All_KBAppData, setAll_KBAppData] = useState([])
    const [App_Acronym, setApp_Acronym] = useState([])
    const [ActiveAppData, setActiveAppData] = useState([])
    
    //~~~~~~~~~~~~~~~~ Retrieving All Application data from mySQL ~~~~~~~~~~~~~~~~
    useEffect(()=>{
        fetch('http://localhost:8080/getAllKBApp',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
            })
        // Server returns response from the credentials
        .then(async (res) => await res.json()) //.send sends the object as a string so after recieving the data, .json makes it back into an object
        .then((res_json)=>{
            setAll_KBAppData(res_json.KBAppData)
        })
    },[])

    useEffect(()=>{
        setApp_Acronym(selectArrayColumn(All_KBAppData, 'App_Acronym'))
    },[All_KBAppData])

    useEffect(()=>{
        setActiveAppData(selectArrayRow(All_KBAppData, 'App_Acronym', ActiveApp)[0])
    },[ActiveApp])
    
    //~~~~~~~~~~~~~~~~ mySQL Plan data array ~~~~~~~~~~~~~~~~
    const [All_KBPlanData, setAll_KBPlanData] = useState([])
    const [Plan_Acronym, setPlan_Acronym] = useState([])
    const [ActivePlanData, setActivePlanData] = useState([])

    //~~~~~~~~~~~~~~~~ Retrieving All Plan data from mySQL ~~~~~~~~~~~~~~~~
    useEffect(()=>{
        fetch('http://localhost:8080/getAllKBPlan',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
            })
        // Server returns response from the credentials
        .then(async (res) => await res.json()) //.send sends the object as a string so after recieving the data, .json makes it back into an object
        .then((res_json)=>{
            setAll_KBPlanData(res_json.KBPlanData)
        })
    },[])

    useEffect(()=>{
        let ActiveApp_Plans = selectArrayRow(All_KBPlanData, 'Plan_app_Acronym', ActiveApp)
        setPlan_Acronym(selectArrayColumn(ActiveApp_Plans, 'Plan_MVP_name'))
        setActivePlan()
    },[All_KBPlanData, ActiveApp])

    useEffect(()=>{
        setActivePlanData(selectArrayRow(All_KBPlanData, 'Plan_MVP_name', ActivePlan)[0])
    },[ActivePlan])

    //~~~~~~~~~~~~~~~~ Temp mySQL Task data array ~~~~~~~~~~~~~~~~
    //(data for each column is determine by task_state)
    // const Open_data = ["open 1","open 2","open 3","open 4","open 5"];
    // const ToDo_data = ["todo 1","todo 2","todo 3","todo 4","todo 5"];
    // const Doing_data = ["doing 1","doing 2","doing 3","doing 4","doing 5"];
    // const Done_data = ["done 1","done 2","done 3","done 4","done 5"];
    // const Close_data = ["close 1","close 2","close 3","close 4","close 5"];

    const [All_KBTaskData, setAll_KBTaskData] = useState([])
    // const [Task_Acronym, setTask_Acronym] = useState([])
    const [ActiveAppAllTaskData, setActiveAppAllTaskData] = useState([])
    const [Open_data, setOpen_data] = useState([])
    const [ToDo_data, setToDo_data] = useState([])
    const [Doing_data, setDoing_data] = useState([])
    const [Done_data, setDone_data] = useState([])
    const [Close_data, setClose_data] = useState([])

    //~~~~~~~~~~~~~~~~ Retrieving All Task data from mySQL ~~~~~~~~~~~~~~~~
    useEffect(()=>{
        fetch('http://localhost:8080/getAllKBTask',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
            })
        // Server returns response from the credentials
        .then(async (res) => await res.json()) //.send sends the object as a string so after recieving the data, .json makes it back into an object
        .then((res_json)=>{
            setAll_KBTaskData(res_json.KBTaskData)
        })
    },[])

    useEffect(()=>{
        setActiveAppAllTaskData(selectArrayRow(All_KBTaskData, 'Task_app_Acronym', ActiveApp))
    },[All_KBTaskData, ActiveApp])

    useEffect(()=>{
        setOpen_data(selectArrayRow(ActiveAppAllTaskData, 'Task_state', "Open"))
        setToDo_data(selectArrayRow(ActiveAppAllTaskData, 'Task_state', "ToDo"))
        setDoing_data(selectArrayRow(ActiveAppAllTaskData, 'Task_state', "Doing"))
        setDone_data(selectArrayRow(ActiveAppAllTaskData, 'Task_state', "Done"))
        setClose_data(selectArrayRow(ActiveAppAllTaskData, 'Task_state', "Close"))
    },[ActiveAppAllTaskData])

    // if(Open_data!=undefined){
    // console.log(JSON.parse(Open_data[0]))
    // }
    //~~~~~~~~~~~~~~~~ mySQL All Group data array ~~~~~~~~~~~~~~~~
    const [ResultAllG, setResultAllG] = useState(false)
        //Retrieving All Groups from SQL
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

        setPlanMVPName()
        setPlanStartDate()
        setPlanEndDate()
    }
    const NoAppSelected_CreatePlan = ()=>{
        toast.warn("Please select an app first", {hideProgressBar:true})
        togglePopup_CreatePlan()
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

        setTaskName()
        setTaskDescription()
        setTaskNotes()
        setTaskID()
        setTaskPlan()
        setTaskState()
        setTaskCreator()
        setTaskOwner()
        setTaskCreateDate()
    }
    const NoAppSelected_CreateTask = ()=>{
        toast.warn("Please select an app first", {hideProgressBar:true})
        togglePopup_CreateTask()
    }

     //================ Editing Selected Task button ================
     const [ActiveEditSelectedTask, setActiveEditSelectedTask] = useState()
     //================ Editing Selected Task Popup display ================
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
        //Temp mySQL data, replace ActiveApp with AppAcronym
    useEffect(()=>{
        setPlanAppAcronym(ActiveAppData? ActiveAppData.App_Acronym:"-")
    },[ActiveAppData])
        //Temp mySQL data, retrieve App Start & End and set it here
    var SelectedAppStartDate = "2022-08-01"
    var SelectedAppEndDate = "2022-10-31"

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
        //Temp mySQL data, replace ActiveApp with AppAcronym
    useEffect(()=>{
        setTaskAppAcronym(ActiveAppData? ActiveAppData.App_Acronym:"-")
    },[ActiveAppData])
    //Triggers when creating task/when task create display pops out
    useEffect(()=>{
            //Temp mySQL data, replace ActiveApp with AppAcronym _ RunningNumber
        
        let App_Acronym = ActiveAppData? ActiveAppData.App_Acronym:"-"
        let RunningNumber = ActiveAppData? ActiveAppData.App_Rnumber:"-"
        setTaskID(App_Acronym+"_"+RunningNumber)
        
        let tempDate = new Date()
        setTaskNotes("[1] - Created by"+" "+token.username+" "+tempDate)
        setTaskState("Open")
        setTaskCreator(token.username)
        setTaskOwner(token.username)
        setTaskCreateDate(tempDate.toISOString().split('T')[0])
    },[(isOpen_CreateTask && TaskAppAcronym)])


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
                                    {ActiveApp && (<button 
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
                                    </button>)}
                                </p>
                            </div>
                        </div>
                        {/*================ Plan Header ================*/}
                        <div className='col-9' style={{borderLeft:"2px solid gray", borderLeftStyle:"dotted", paddingLeft:"3px"}}>
                            <h4>{Plan_Acronym? ButtonsMap(Plan_Acronym, ActivePlan, setActivePlan):"-"}</h4>
                        </div>
                    </div>


                    <div className='col-6' style={{marginTop: "-7px"}}>
                        {/*================ App Info ================*/}
                        <div className='col-9' >
                            <div className='col-9'>
                                <p style={{fontSize: "small"}}>&nbsp;Start date: {ActiveAppData? FormatDate(ActiveAppData.App_startDate):"-"}</p>
                            </div>

                            <div className='col-9'>
                                <p style={{fontSize: "small"}}>&nbsp;End date: {ActiveAppData? FormatDate(ActiveAppData.App_endDate):"-"}</p>
                            </div>

                            <div className='col-6'>
                                <p style={{fontSize: "small"}}>&nbsp;Description: </p>
                                <textarea rows="3" style={{width:'96%', resize:'none', marginTop:"-5px", marginLeft:"5px", padding:"10px"}} disabled defaultValue={ActiveAppData? ActiveAppData.App_Description:"-"}/>
                            </div>
                        </div>

                        {/*================ Plan Info ================*/}
                        <div className='col-9' style={{borderLeft:"2px solid gray", borderLeftStyle:"dotted", paddingLeft:"3px"}}>
                            <div className='col-6'>
                                <h4>&nbsp;Plan: {ActivePlan? ActivePlan:"-"}</h4>
                            {/* </div> */}
                            {/* <div className='col-7'> */}
                                <p className='col-9' style={{fontSize: "small"}}>&nbsp;Start date: {ActivePlanData? FormatDate(ActivePlanData.Plan_startDate):"-"}</p>
                            {/* </div> */}
                            {/* <div className='col-8'> */}
                                <p  className='col-9'style={{fontSize: "small"}}>&nbsp;End date: {ActivePlanData? FormatDate(ActivePlanData.Plan_endDate):"-"}</p>
                            </div>
                            <div className='col-5'>
                                {ActiveApp && (<button 
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
                                </button>)}
                                        
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
                    <div className='col-6h'>
                        {/*~~~~~~~~~~ Open ~~~~~~~~~~*/}
                        <div className='col-5h' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                            <h3>
                                Open
                                {ActiveApp && (<button 
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
                                </button>)}

                                <p style={{fontSize: "small"}}>
                                    permit: {ActiveAppData? ActiveAppData.App_permit_Open:"-"}
                                </p>
                            </h3>
                            
                            {Open_data? TaskDisplayTemplate(Open_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
                                , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask):NoTaskDataTemp()}
                        </div>
                        
                        {/*~~~~~~~~~~ To Do ~~~~~~~~~~*/}
                        <div className='col-5ha' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                            <h3>
                                To Do
                                <p style={{fontSize: "small"}}>
                                    permit: {ActiveAppData? ActiveAppData.App_permit_toDoList:"-"}
                                </p>
                            </h3>
                            
                            {ToDo_data? TaskDisplayTemplate(ToDo_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
                                , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask):NoTaskDataTemp()}
                        </div>
                        
                        {/*~~~~~~~~~~ Doing~~~~~~~~~~*/}
                        <div className='col-5ha' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                            <h3>
                                Doing
                                <p 
                                    style={{fontSize: "small"}}>
                                    permit: {ActiveAppData? ActiveAppData.App_permit_Doing:"-"}
                                </p>
                            </h3>

                            {Doing_data? TaskDisplayTemplate(Doing_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
                                , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask):NoTaskDataTemp()}
                        </div>
                        
                        {/*~~~~~~~~~~ Done ~~~~~~~~~~*/}
                        <div className='col-5ha' style={{borderRight: '2px solid gray', padding: "2px", minHeight:"500px"}}> 
                            <h3>
                                Done
                                <p 
                                    style={{fontSize: "small"}}>
                                    permit: {ActiveAppData? ActiveAppData.App_permit_Done:"-"}
                                </p>
                            </h3>

                            {Done_data? TaskDisplayTemplate(Done_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
                                , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask):NoTaskDataTemp()}
                        </div>

                        {/*~~~~~~~~~~ Close ~~~~~~~~~~*/}
                        <div className='col-5ha' style={{padding: "2px", minHeight:"500px"}}> 
                            <h3>
                                Close
                                <p 
                                    style={{fontSize: "small"}}>
                                    &nbsp;
                                </p>
                            </h3>

                            {Close_data? TaskDisplayTemplate(Close_data, setIsOpen_AuditTrail, isOpen_AuditTrail, setSelectedTaskData_AT, ActiveAuditTrail, setActiveAuditTrail
                                , setIsOpen_EditSelectedTask, isOpen_EditSelectedTask, setSelectedTaskData_EST, ActiveEditSelectedTask, setActiveEditSelectedTask):NoTaskDataTemp()}
                        </div>
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
                                    togglePopup_CreateApp()
                                }
                                else if (update_status.errMsg == "duplicated"){
                                    toast.error("App Name already exist", {hideProgressBar:true})
                                }
                                else{
                                    console.log(update_status.errMsg)
                                }
                            }
                        )}}>
                            {/*Create App Input Field*/}
                            <p><u><b>Creating App</b></u></p>
                            <div>*App: <input type="text" placeholder="Acronym" aria-describedby="basic-addon1" onChange={e => setAppAcronym(e.target.value)}/></div>
                            <br/>
                            <div>*Running No.: <input type="number" onChange={e => setAppRNumber(e.target.value)}/></div>
                            <br/>
                            <div className='col-7'>*Start Date: <input type="date" id="startdate" name="startdate" max={UnpackDateForInput(AppEndDate)} onChange={e => setAppStartDate(e.target.value)}/></div>
                            <div className='col-7'>*End Date: <input type="date" id="enddate" name="enddate" min={UnpackDateForInput(AppStartDate)} onChange={e => setAppEndDate(e.target.value)}/></div>
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
                            <p style={{fontSize:"small"}}>
                                * compulsory fields
                                {/*Buttons*/}
                                <button style={{marginTop:"15px", float:"right"}} type="submit" href="#">Save</button>
                            </p>
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
            
            {isOpen_CreatePlan && !PlanAppAcronym && (
                NoAppSelected_CreatePlan()
            )}
            {isOpen_CreatePlan && PlanAppAcronym && <Popup
                content={<>
                    <form onSubmit={(e)=>{e.preventDefault(); HandleSave.SaveCreatePlan(PlanMVPName,PlanStartDate,PlanEndDate,PlanAppAcronym
                        ,(update_status)=>{
                            if(update_status.success){
                                toast.success("Update Successful", {hideProgressBar:true})
                                togglePopup_CreatePlan()
                            }
                            else if (update_status.errMsg == "duplicated"){
                                toast.error("Plan MVP Name already exist", {hideProgressBar:true})
                            }
                            else{
                                console.log(update_status.errMsg)
                            }
                        }
                    )}}>
                        {/*Create Plan Input Field*/}
                        <p><u><b>Creating Plan for <mark style={{backgroundColor:"lightblue"}}>{ActiveApp}</mark></b></u></p>
                        <div>*Plan: <input type="text" placeholder="Plan MVP Name" aria-describedby="basic-addon1" onChange={e => setPlanMVPName(e.target.value)}/></div>
                        <br/>
                        <div className='col-7'>*Start Date: <input type="date" id="startdate" name="startdate" min={UnpackDateForInput(SelectedAppStartDate)} max={(PlanEndDate<SelectedAppEndDate)&&PlanEndDate?  UnpackDateForInput(PlanEndDate):UnpackDateForInput(SelectedAppEndDate)} onChange={e => setPlanStartDate(e.target.value)}/></div>
                        <div className='col-7'>*End Date: <input type="date" id="enddate" name="enddate" min={(SelectedAppStartDate<PlanStartDate)&&PlanStartDate? UnpackDateForInput(PlanStartDate):UnpackDateForInput(SelectedAppStartDate)} max={UnpackDateForInput(SelectedAppEndDate)} onChange={e => setPlanEndDate(e.target.value)}/></div>
                        <br/><br/>
                        <p style={{fontSize:"small"}}>
                            * compulsory fields
                            {/*Buttons*/}
                            <button style={{marginTop:"15px", float:"right"}} type="submit" href="#">Save</button>
                        </p>
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
            {isOpen_CreateTask && !TaskAppAcronym && (
                NoAppSelected_CreateTask()
            )}
            {isOpen_CreateTask && TaskAppAcronym && <Popup
                content={<>
                    <form onSubmit={(e)=>{e.preventDefault(); HandleSave.SaveCreateTask(TaskName,TaskDescription,TaskNotes,TaskID, TaskPlan, TaskAppAcronym, TaskState, TaskCreator, TaskOwner, TaskCreateDate 
                            ,(update_status)=>{
                                if(update_status.success){
                                    toast.success("Update Successful", {hideProgressBar:true})
                                    togglePopup_CreateTask()
                                }
                                else if (update_status.errMsg == "duplicated"){
                                    toast.error("Task Name already exist", {hideProgressBar:true})
                                }
                                else{
                                    console.log(update_status.errMsg)
                                }
                            }
                        )}}>
                            {/*Create Task Input Fields*/}
                            <p><u><b>Creating Task for <mark style={{backgroundColor:"lightblue"}}>{ActiveApp}</mark></b></u></p>
                            <div>*Task: <input type="text" placeholder="Task Name" aria-describedby="basic-addon1" onChange={e => setTaskName(e.target.value)}/></div>
                            <br/>
                            <div className='col-6' style={{marginTop:"1px"}}>
                                <div className='col-12' style={{marginTop:"5px"}}>Plan: </div>
                                <div className='col-11'>
                                    {/* change group_name & ResultAllG to plan array from mySQL */}
                                    <Multiselect
                                        placeholder="Select Plan"
                                        hidePlaceholder='true'
                                        displayValue="group_name" 
                                        onRemove={(selection) => {
                                            setTaskPlan(selection)
                                        }}
                                        onSelect={(selection) => {
                                            setTaskPlan(selection)
                                        }}
                                        options={ResultAllG.GroupData.filter(item => item.group_name !== 'admin')}
                                        selectedValues={TaskPlan}
                                        showCheckbox
                                        selectionLimit={1}
                                    />
                                </div>
                            </div>
                            <textarea style={{ resize: 'none', overflow:'auto', marginTop:"15px"}} id='description' rows="4" cols="100" className="form-control" placeholder="Description (Optional)" onChange={e => setTaskDescription(e.target.value)}/>
                            <br/><br/>
                            <p style={{fontSize:"small"}}>
                                * compulsory fields
                                {/*Buttons*/}
                                <button style={{marginTop:"15px", float:"right"}} type="submit" href="#">Save</button>
                            </p>
                        </form>              
                    </>}
                handleClose={togglePopup_CreateTask}
            />}

            {/* ================ Editing Selected Task Popup display ================ */}
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