import {useState} from "react";
import { ToastContainer} from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';
import LoginComponents from "../ComponentsA1/LoginComponent";


function LoginPage({setToken}){
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async e => {
        e.preventDefault();
        // Missing inputs
        if (!LoginComponents.CheckLoginFields(username, password)) {return}
        // Login backend and store user token if successful
        const token_data = await LoginComponents.LoginUser({username,password});
        if (token_data) {setToken(token_data)}
        // // Reset the fields after successful authentication //don't need cos login page is redirected to another page upon successful login. When pages change all fields that exist only in that page is cleared.
        // setUsername()
        // setPassword()
      }

    return (
        <>

        <div className="col-3 header1">
            <h1>Login</h1>
        </div>

        <div className="col-login">
            <div>
                
                <form>

                    <p> Username </p>
                    <input 
                    onChange={(e) => setUsername(e.target.value)} 
                    name = "username" 
                    type="text" 
                    placeholder="Username Input" 
                    autoComplete="off" 
                    />
                    
                    <p> Password </p>
                    <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    name = "password" 
                    type="password" 
                    placeholder="Password Input" 
                    autoComplete="off" 
                    />

                    {/* {popup()} */}


                    <button onClick={handleSubmit}> 
                    Login
                    </button>

                </form>

            </div>
        </div>

        <div>
            <ToastContainer />
        </div>
        </>
        
    )
}

export default LoginPage;
