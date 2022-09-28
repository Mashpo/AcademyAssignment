


function PromoteTask2Done(Username, Password, Task_name){
    fetch('http://localhost:8080/updateTaskState_RightBTN',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        // POST content
        body: JSON.stringify({
            Username: Username
            , Password: Password
            , Task_name: Task_name
        })
    })
    // Server returns response
    .then(async (res) => await res.json())
}