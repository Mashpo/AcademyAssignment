import React, { useState, useEffect } from 'react'

import { ToastContainer } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';

import U_MANAGEMENTCOM from '../ComponentsA1/U_ManagementCom';
import {CreateUser} from "./CreateUserPage";

function U_MANAGEMENT_PAGE(props) {
  useEffect(()=>{
    props.setDataHeader("Admin - User Management")
  },[])

  const [createUserState,setCreateUserState]=useState("0")
  const [editState,setEditState]=useState("0")
  const [saveCreatingState,setSaveCreatingState]=useState("0")

  async function NavigateCreateUser(){
    setCreateUserState("1")
  }
  
  function CreateUserButton(){
    if (editState === "0" && createUserState === "0"){
      return(
        <th>
          <button onClick={NavigateCreateUser}> Create User </button>
        </th>
      )
    }
  }

  function PasswordHeader(){
    if ((editState === "1") || (editState === "1" && createUserState === "1")){
      return(
        <th>Password</th>
      )
    }
  }

  return (
    <>
      <div className="col-2 content">

        <CreateUser 
          creatingUserStatePassed={createUserState} 
          setCreatingUserState={setCreateUserState}
        
          setSavingCreatingState={setSaveCreatingState}
        />

        <h2><u>All Users</u></h2>

        {/* display table of all users */}
        <form>
          <table> 
            <thead>
                <tr>
                    <th>Username</th>
                    {PasswordHeader()}
                    <th>Email</th>
                    <th>Active Status</th>
                    <th>Group Name</th>
                    {CreateUserButton()}
                </tr>
            </thead>
    
            <U_MANAGEMENTCOM.AllUser                  //Props allows sharing of more data between functions
              createUserStatePassed={createUserState}       //to share useState between functions
              // setabcd={setCreateUserState}    

              saveCreateState={saveCreatingState}
              setSaveCreateState={setSaveCreatingState}

              editStatePassed={editState}
              seteditingState={setEditState}
            />

          </table>
        </form>

      </div>

      <div>
          <ToastContainer />
      </div>
    </>
  )
}

export default U_MANAGEMENT_PAGE;




