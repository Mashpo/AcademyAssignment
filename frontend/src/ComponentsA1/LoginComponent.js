
import {toast} from 'react-toastify';

// Check Login Fields
function CheckLoginFields(username, password) {
    // Missing username and password
    if ((!username) && (!password)) {
        toast.error("Please input username and password", {hideProgressBar:true})
        return false
        }
        if ((!username) && (password)) {
        toast.error("Please input username", {hideProgressBar:true})
        return false
        }
        if ((username) && (!password)) {
        toast.error("Please input password", {hideProgressBar:true})
        return false
        }
    return true
}

// Handle login when there are both username and password
async function LoginUser(credentials) {
    return (
    // POST to server the credentials from login form
    
    fetch('http://localhost:8080/login',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        // POST content
        body: JSON.stringify(credentials)
        })
    // Server returns response from the credentials
    .then(async (res) => {
        // Res == 200 means success
        if (res.status === 200){
            return await res.json()
        }
        // Res != 200 means error
        else {
            let err_msg = await res.json()
            console.log(err_msg)
            if (err_msg.message === 'Disabled') {
                toast.error("User disabled", {hideProgressBar:true})
                return
            }
            if (err_msg.message === 'Incorrect') {
                toast.error("Incorrect username or password", {hideProgressBar:true})
                return
            }
        }
    
    })
    )
}

const LoginComponents = {
    CheckLoginFields,
    LoginUser
}

export default LoginComponents;
