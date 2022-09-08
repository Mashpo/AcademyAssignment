import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';

import AlphanumericCheck from './AlphanumericCheck'
import G_ManagementCom from './G_ManagementCom';

const active =(active_status)=>{
    if(active_status==1){
      return(
        <option value={0}> 0 </option>
      )
    }
    else{
      return(
        <option value={1}> 1 </option>
      )
    }
}

function updateAllUsers(username, password, email, active_status, group_name){
    return(
    fetch('http://localhost:8080/updateAllUsers',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // POST content
            body: JSON.stringify({username: username, password: password, email: email, active_status: active_status, group_name: group_name})
            })
        // Server returns response from the credentials
        .then(async (res) => await res.json()) //.send sends the object as a string so after recieving the data, .json makes it back into an object
        // Error handling
        // .catch(toast.error("Unable to fetch user data", {hideProgressBar:true}))
    )
}
  
let existingGrpArray = []
  
function AllUser(props){

    // console.log(props.createUserStatePassed)
    //props.setabcd("2")  //to share useState between functions

    const [editStatus, seteditStatus] = useState("0")

    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [active_status, setActive_status] = useState()

    // recieving query from mysql
    const [resultAllG,setResultAllG]=useState([]);
    const [resultA,setResultA]=useState();

    //Selected User Data
    const [CurrentUsername ,setCurrentUsername] = useState()
    const [CurrentEmail ,setCurrentEmail] = useState()
    const [CurrentActive_status ,setCurrentActive_status] = useState()

    // sending data for saving/re-writing on mysql
    const [group,setGroup]=useState([]); //groups selected for updating

    const [GroupInitial,setGroupInitial]=useState([]); //initial groups that the selected user was in

    const token = JSON.parse(sessionStorage.getItem('token')).token

    //checkbox handling
    const InGroup = (grpToCheck)=>{
        if (existingGrpArray.includes(grpToCheck)){
            return 1
        }

        else {
            return 0
        }
    }

    const handleChange = (groupName, groupSelected) => { //checkbox handling
        if (group.includes(groupName) && groupSelected===false){
            //remove group when user already has the group and uncheck it
            setGroup((currentState) =>
            currentState.filter((element)=>{
                return element !==groupName
            })
            )
        }

        else if (!group.includes(groupName) && groupSelected===true){
            const updatedGroups = group.concat(groupName)
            setGroup(updatedGroups)
        }
    }

    //save handling
    async function handleSave(e) {
        e.preventDefault()

        let stringNewGroup 
        if (group[0] == ""){
            stringNewGroup = group.slice(1).toString()
        }
        else{
            stringNewGroup = group.toString()
        }
       
        // let ArrayGroup = stringNewGroup.split(",")
        // console.log(ArrayGroup)
           
        let validity = 1
        
        console.log(password)
        console.log(email)
        console.log(active_status)
        console.log(group)
        console.log(GroupInitial)
        let test = false

        if(!password && !email && !active_status && group.toString()==GroupInitial.toString()){
            // seteditStatus("0")
            toast.warn("No changes were made", {hideProgressBar:true})
            validity = 0
        }

        // No update email and password
        if (password && (!AlphanumericCheck.checkPassword(password))){
            validity = 0
        }
        
        if (email && (!AlphanumericCheck.checkEmail(email))) {
            validity = 0
        }
        
        if (validity == 1){

            const update_status = await updateAllUsers(CurrentUsername, password, email, active_status, stringNewGroup)

            if(update_status.success){
                toast.success("Update Successful", {hideProgressBar:true})

                getA()

                setPassword()
                setEmail()
                setActive_status()

                seteditStatus("0")
                props.seteditingState("0")
            }
            else{
                console.log(update_status.errMsg)
            }
        }
    }

    //Retrieve All Groups from SQL
    useEffect(()=>{
        G_ManagementCom.getAllG(setResultAllG)
    },[]);

    if(resultAllG.errMsg){
        console.log(resultAllG.errMsg)
    }

    //get all users except self
    function getA(){
        return(
        fetch('http://localhost:8080/getAllExceptSelf',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // POST content
            body: JSON.stringify({username: token.username})
            })
        // Server returns response from the credentials
        .then(async (res) => await res.json())
        .then((json_res)=> setResultA(json_res))
        // Error handling
        // .catch(toast.error("Unable to fetch user data", {hideProgressBar:true}))
        )
    }

    useEffect(()=>{   
        getA()
    },[])

    if(props.saveCreateState == "1"){

        getA()

        return(
            props.setSaveCreateState("0")
        )
    }

    if(editStatus==="1"){
        return(
            <tbody>
                <tr>
                    {/* Username */}
                    <td>{CurrentUsername}</td>

                    {/* Password */}
                    <td> 
                        <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        name = "password" 
                        type="password" 
                        autoComplete="off" 
                        autoFocus="on"
                        />
                    </td>
                    
                    {/* Email */}
                    <td>
                        <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        name = "email" 
                        type="text" 
                        placeholder={CurrentEmail}
                        autoComplete="off" 
                        // size="5"
                        />
                    </td>

                    {/* Active Status */}
                    <td>
                        <select id="active_status" name="active_status" onChange={(e) => setActive_status(e.target.value)} >
                            <option value={CurrentActive_status} defaultValue> {CurrentActive_status} </option>
                            {active(CurrentActive_status)}
                        </select>
                    </td>

                    {/* Group Checkboxes */}
                    <td>
                        {resultAllG && (resultAllG.GroupData.map((grp) => {
                                return(
                                    <li key={grp.group_name}>
                                        <input
                                            name = {grp.group_name}
                                            type= "checkbox" 
                                            value= {grp.group_name}
                                            defaultChecked={InGroup(grp.group_name)}
                                            onClick={(event)=> 
                                            {handleChange(event.target.value, event.target.checked)
                                            }} 
                                        />

                                        <label > {grp.group_name} </label>
                                    </li>
                                )
                            })
                        )}
                    </td>

                    {/* Save button */}
                    <td>
                        <button onClick={handleSave}> 
                            Save
                        </button>
                    </td>
                    
                    {/* Cancel button */}
                    <td>
                        <button onClick={()=>{
                            setPassword()
                            setEmail()
                            setActive_status()

                            seteditStatus("0")
                            props.seteditingState("0")
                        }}> 
                            Cancel
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    }

    else{
        return(
            <>
                <tbody className='table_body'>
                    {resultA && (resultA.UserData.map((val) => {
                        return (
                            <tr key={val.username}>

                                <td>{val.username}</td>
                                <td>{val.email}</td>
                                <td>{val.active_status}</td>
                                <td>{val.group_name}</td>

                                <td>
                                    <button onClick={()=>{
                                        setGroup(val.group_name.split(','));
                                        setGroupInitial(val.group_name.split(','));
                                        existingGrpArray = val.group_name.split(',');
                                        setCurrentUsername(val.username)
                                        setCurrentEmail(val.email)
                                        setCurrentActive_status(val.active_status)
                                        seteditStatus("1")
                                        props.seteditingState("1")
                                    }}> 
                                        Edit
                                    </button>
                                </td>
                                
                            </tr>
                        );
                    }))}
                </tbody>
            </>
        )
    }
}


const U_MANAGEMENTCOM = {
AllUser
}

export default U_MANAGEMENTCOM;