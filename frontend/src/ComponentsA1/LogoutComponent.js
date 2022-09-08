function Logout(e){
    // e.preventDefault()
    //Clear logout from the backend and session
    // console.log(fetch("http://localhost:8080/logout", {method:'POST'}))
    fetch("http://localhost:8080/logout", {method:'POST'})
    sessionStorage.clear();
};

export default Logout;