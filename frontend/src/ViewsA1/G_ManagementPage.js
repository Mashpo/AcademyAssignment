import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';
import G_ManagementCom from '../ComponentsA1/G_ManagementCom'


export const G_MANAGEMENT_PAGE = (props) => {
    useEffect(()=>{
        props.setDataHeader("Admin - Group Management")
    },[])

    const [newGroup, setNewGroup] = useState();
    const [resultAllG,setResultAllG]=useState([]);

    //Add Group
    async function addGrp(){
        const addGrp_status = await G_ManagementCom.insertG(newGroup)

            if (addGrp_status.errMsg === "duplicated") {
                return(
                    toast.error("Error - Group already exists", {hideProgressBar:true})
                )
            }
            else if (addGrp_status.errMsg){
                return (console.log(addGrp_status.errMsg))
            }

            if (addGrp_status.success) {
                toast.success("New group successfully created", {hideProgressBar:true})
            }
        }

    //Retrieve All Groups from SQL
    useEffect(()=>{
    G_ManagementCom.getAllG(setResultAllG)
    },[]);

    if(resultAllG.errMsg){
    console.log(resultAllG.errMsg)
    }

    //Handling save on click
    const handleSave = async e => {
        e.preventDefault();

        // No group input
        if (!newGroup) {
          toast.warn("Please input a group name", {hideProgressBar:true})
          return
        }
        
        //Adding new group
        await addGrp()

        //Rerender table data
        G_ManagementCom.getAllG(setResultAllG)
        if(resultAllG.errMsg){
            console.log(resultAllG.errMsg)
        }
        
        // Reset View
        e.target.reset()
        setNewGroup()
      }

  return (
    <>
        <div className="col-2 content">

            <h2><u>Create Group</u></h2>

             {/*Add Group*/}
             <form className="form-inline" onSubmit={handleSave}>
                <input type="text" className="form-control" placeholder="Add Group" autoFocus aria-describedby="basic-addon1" onChange={e => setNewGroup(e.target.value)}/>
                <button type="submit" className="btn btn-default" href="#">Save</button>
            </form>

            <br/>

            {resultAllG.GroupData && (

                /*Group Table*/
                <table 
                    // border="1" 
                    width="40%"
                >
                    <thead>
                        <tr>
                            <th>Group</th>
                        </tr>
                    </thead>

                    <tbody className='table_body'>
                        {
                        resultAllG.GroupData.map(function(row){
                            return (
                            <tr key={row.group_name}>
                                <td>{row.group_name}</td>
                            </tr>
                            )})
                        }
                    </tbody>
                </table>
            )}
        </div>

      <div>
          <ToastContainer />
      </div>
    </>
  )
}
