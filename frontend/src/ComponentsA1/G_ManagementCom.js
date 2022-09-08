
function insertG(newGroup){
    return(
        fetch('http://localhost:8080/insertG',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // POST content
            body: JSON.stringify({newGroup:newGroup})
            })
        // Server returns response from the credentials
        .then(async (res) => await res.json()) //.send sends the object as a string so after recieving the data, .json makes it back into an object
        // Error handling
        // .catch(toast.error("Unable to fetch user data", {hideProgressBar:true}))
    )
}

function getAllG(setResultAllG){
    return(
        fetch('http://localhost:8080/getAllG',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
            })
        // Server returns response from the credentials
        .then(async (res) => await res.json()) //.send sends the object as a string so after recieving the data, .json makes it back into an object
        .then((res_json)=>setResultAllG(res_json))
        // Error handling
        // .catch(toast.error("Unable to fetch user data", {hideProgressBar:true}))
    )
}

const G_ManagementCom = {
    insertG,
    getAllG
}

export default G_ManagementCom;