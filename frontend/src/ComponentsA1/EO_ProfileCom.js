
function updateOwnEmail(username, email){
    return(
        fetch('http://localhost:8080/updateOwnEmail',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // POST content
            body: JSON.stringify({username: username, email: email})
            })
        // Server returns response from the credentials
        .then(async (res) => await res.json()) //.send sends the object as a string so after recieving the data, .json makes it back into an object
        // Error handling
        // .catch(toast.error("Unable to fetch user data", {hideProgressBar:true}))
    )
}

function updateOwnPassword(username, password){
    return(
        fetch('http://localhost:8080/updateOwnPassword',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // POST content
            body: JSON.stringify({username: username, password: password})
            })
        // Server returns response from the credentials
        .then(async (res) => await res.json())
        // Error handling
        // .catch(toast.error("Unable to fetch user data", {hideProgressBar:true}))
    )
}

const EO_ProfileCom = {
    updateOwnEmail,
    updateOwnPassword
}

export default EO_ProfileCom;