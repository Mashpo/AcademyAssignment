
function GetUserData(username, getWhich, setData){
    return(
    fetch('http://localhost:8080/GetUserData',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        // POST content
        body: JSON.stringify({username: username, getWhich: getWhich})
        })
    // Server returns response from the credentials
    .then(async (res) => await res.json())
    .then((json_res)=> setData(json_res))
    // Error handling
    // .catch(toast.error("Unable to fetch user data", {hideProgressBar:true}))
    )
}

const VO_ProfileCom = {
    GetUserData
}

export default VO_ProfileCom;