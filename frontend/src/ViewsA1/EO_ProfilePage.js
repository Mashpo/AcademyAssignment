import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';

import AlphanumericCheck from '../ComponentsA1/AlphanumericCheck';
import EO_ProfileCom from '../ComponentsA1/EO_ProfileCom';


export const EO_PROFILE_PAGE = (props) => {
    // props.setDataHeader("Editing - My Profile")
    useEffect(()=>{
        props.setDataHeader("Editing - My Profile")
    },[])

    const token = JSON.parse(sessionStorage.getItem('token')).token
    let username = token.username

    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    function ResetAndRedirect(){
        //Reset the state after each submit
        setEmail()
        setPassword()
    
        //Redirecting after 2500ms
        function DelayRedirect(){
          window.location.href = '/VO_PROFILE_PAGE'
        }
        setTimeout(DelayRedirect,2500)
    }
  
    //handleSave
    const handleSave = async e=>{
        e.preventDefault();
    
        // No update email and password
        if ((!email) && (!password)) {
            toast.warn("Please input new email or new password", {hideProgressBar:true})
            return
        }
  
        // Email update
        if ((email) && (AlphanumericCheck.checkEmail(email))) {
            
            const email_status = await EO_ProfileCom.updateOwnEmail(username, email)
           
            if (email_status.success){
                toast.success("Email updated successfully", {hideProgressBar:true, autoClose: 1000})
            }
            else{
                console.log("email:", email_status.errMsg)
            }
        
            // Reset all fields whenever there is a successful update
            e.target.reset()

            ResetAndRedirect()
        }
  
        // Password update
        if ((password) && AlphanumericCheck.checkPassword(password)) {
            const password_status = await EO_ProfileCom.updateOwnPassword(username, password)

            if (password_status.success){
                toast.success("Password updated successfully", {hideProgressBar:true, autoClose: 1000})
            }
            else{
                console.log("password:", password_status.errMsg)
            }

            // Reset all fields whenever there is a successful update
            e.target.reset()

            ResetAndRedirect()
        }
    }
  
    return (
        <>
            <div className="col-2 content">
  
                <h2><u>Editing Profile</u></h2>
    
                {/*Email and password form*/}
                <div className="panel-body">
                    <form onSubmit={handleSave}>
                        {/*Email*/}
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1"><span className="glyphicon glyphicon-envelope"
                                aria-hidden="true"></span></span>
                            <input type="text" className="form-control" placeholder="New email" aria-describedby="basic-addon1" onChange={e => setEmail(e.target.value)}/>
                        </div>
        
                        <br />
        
                        {/*Password*/}
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1"><span className="glyphicon glyphicon-lock"
                                    aria-hidden="true"></span></span>
                            <input type="password" className="form-control" placeholder="New password" aria-describedby="basic-addon1" autoComplete="off" onChange={e => setPassword(e.target.value)}/>
                        </div>
        
                        <p>(Password must comprise of alphabet, number, and special character with at least 8 and at most 10 characters)</p>
        
                        {/*Buttons*/}
                        {/* <a className="btn btn-default" href={'/' + token[0].username} role="button">Back</a> */}
                        <button type="submit" className="btn btn-default" href="#">Save</button>
                    </form>
                </div>
            </div>
  
            <div>
                <ToastContainer />
            </div>
        </>
    )
}