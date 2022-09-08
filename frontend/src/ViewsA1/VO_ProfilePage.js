import {useState, useEffect } from 'react'
import { ToastContainer} from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';

import VO_ProfileCom from "../ComponentsA1/VO_ProfileCom"


export function VO_PROFILE_PAGE(props){
  useEffect(()=>{
    props.setDataHeader("My Profile")
  },[])

  const [data, setData] = useState()

  const token = JSON.parse(sessionStorage.getItem('token')).token
  let username = token.username;
  let getWhich = ("group_name, email");

  // const userData = VO_ProfileCom.GetUserData({username: username, getWhich: getWhich});  //doesn't work to set result data that is being retrieved. Therefore, i used useEffect with setState of the variable setData to store the results.
  
  // Mounting sql table
  useEffect(() => {
    VO_ProfileCom.GetUserData(username, getWhich, setData)
  }, [username, getWhich]);

  return (
    <>
      {data && (
        <div className="content">

          <h2><u>Personal Account Details</u></h2>

          {/* display table of all users */}
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Group Name</th>
              </tr>
            </thead>
            
            <tbody>
              <tr>
                <td>{username}</td>
                <td>{data.UserData.email}</td>
                <td>{data.UserData.group_name}</td>

                {/* <td><button onClick={handleEdit}> 
                Edit
                </button></td> */}
              </tr>
            </tbody>
          </table>

        </div>
      )}

        <div>
            <ToastContainer />
        </div>
    </>
  )
}