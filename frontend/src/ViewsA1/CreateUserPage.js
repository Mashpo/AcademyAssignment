import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';

import AlphanumericCheck from '../ComponentsA1/AlphanumericCheck'
import G_ManagementCom from '../ComponentsA1/G_ManagementCom'

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export const CreateUser = (props) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [active_status, setActive_status] = useState("1")

  const [resultAllG,setResultAllG]=useState([]);
  const [group,setGroup]=useState([]); //groups selected for updating

  const [TableRefresh, setTableRefresh]=useState("0")

  async function RefreshTable(){
    setTableRefresh("1")
    await delay(1);
    setTableRefresh("0")
  }


  //Retrieve All Groups from SQL
  useEffect(()=>{
    G_ManagementCom.getAllG(setResultAllG)
  },[]);

  if(resultAllG.errMsg){
    console.log(resultAllG.errMsg)
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

  async function handleSave(e) {
    e.preventDefault()

    let stringNewGroup =[]
    if (group[0] == ""){
      stringNewGroup = group.slice(1).toString()
    }
    else{
      stringNewGroup = group.toString()
    }

    // let ArrayGroup = stringNewGroup.split(",")
    // console.log(ArrayGroup)

    let validity = 1

    if (!username){
      validity = 0
      toast.error('Username is compulsory', {hideProgressBar:true})
    }

    if (!password){
      validity = 0
      toast.error('Password is compulsory', {hideProgressBar:true})
    }

    // No update email and password
    if (password && (!AlphanumericCheck.checkPassword(password))){
      validity = 0
    }
    
    if (email && (!AlphanumericCheck.checkEmail(email))) {
      validity = 0
    }
   
    if (validity == 1){
      function insertCreatedUser(username, password, email, active_status, group_name){
        return(
          fetch('http://localhost:8080/insertCreatedUser',{
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

      const update_status = await insertCreatedUser(username, password, email, active_status, stringNewGroup)

      if (update_status.errMsg === "duplicated") {
        return(
            toast.error("Error - User already exists", {hideProgressBar:true})
        )
      }
      else if (update_status.errMsg){
        return (console.log(update_status.errMsg))
      }

      if (update_status.success) {
        toast.success("New user successfully created", {hideProgressBar:true})
      
        setUsername("")
        setPassword("")
        setEmail("")
        setActive_status("1")
        setGroup([])
        stringNewGroup= []

        RefreshTable()

        props.setSavingCreatingState("1")
      }
    }
  }   


  if(props.creatingUserStatePassed == "1" && TableRefresh=="0"){

    return(
      <>
        <h2><u>Create Users</u></h2>
        
        <form>
          <table>

            <thead>
              <tr>  
                <th>Username</th>
                <th>Password</th>
                <th>Email</th>
                <th>Active Status</th>
                <th>Group Name</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                {/* Username */}
                <td> 
                  <input 
                    onChange={(e) => {
                      setUsername(e.target.value) 
                    }} 
                    name = "username" 
                    type="text" 
                    autoComplete="off" 
                    autoFocus="on"
                  />
                </td>

                {/* Password */}
                <td> 
                  <input 
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }} 
                    name = "password" 
                    type="password" 
                    autoComplete="off" 
                  />
                </td>

                {/* Email */}
                <td>
                  <input 
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    name = "email" 
                    type="text" 
                    autoComplete="off" 
                    // size="5"
                  />
                </td>

                {/* Active Status */}
                <td>
                  <select id="active_status" name="active_status" 
                  onChange={(e) => {
                    setActive_status(e.target.value)
                  }}>
                    <option value={1} defaultValue> 1 </option>
                    <option value={0}> 0 </option>
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
                          onClick={(event)=> handleChange(event.target.value, event.target.checked)} 
                        />
                        <label> {grp.group_name} </label>
                        </li>
                      )
                    })
                  )}
                </td>

                {/* Save button */}
                <td>
                  <button type="submit"
                    onClick={handleSave}
                  > 
                    Save
                    </button>
                </td>

                {/* Cancel button */}
                <td>
                  <button onClick={()=>{

                    props.setCreatingUserState("0")

                    }}> 
                  Cancel
                  </button>
                </td>
              </tr>
            </tbody>

          </table>
        </form>


        <div>
          <ToastContainer />
        </div>

      </>
    )
  }

  
}
