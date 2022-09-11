
import LogoutComponent from "../ComponentsA1/LogoutComponent";


const adminView =()=>{
    const token = JSON.parse(sessionStorage.getItem('token')).token

    // Service.checkGroup('admin')
   
    if (token.admin) {
        return (
        
            <ul>
                {/* for admin only */}
                <h4 className="header3"> Admin Settings</h4>

                <li><a href="/U_MANAGEMENT_PAGE">User Management</a></li>
                <li><a href="/G_MANAGEMENT_PAGE">Group Management</a></li>

            </ul>
        )
    }
}


function Navbar(){
    return(
        <>
                <div className="col-1 menu">

                    <ul>
                        <li><a className="active" href="/">Home</a></li>
                    </ul>

                    <ul>
                        {/* for all users */}
                        <h4 className="header3"> User Settings</h4>
                        <li><a href="/VO_PROFILE_PAGE">View Own Profile</a></li>
                        <li><a href="/EO_PROFILE_PAGE">Edit Own Profile</a></li>
                    </ul>

                    {adminView()}

                    <ul>
                        {/* for all users */}
                        <h4 className="header3"> Task Management</h4>
                        <li><a href="/KanbanBoardPage">Kanban Board</a></li>
                    </ul>

                    <ul>
                        <li><a className="logout_btn" onClick={LogoutComponent} href="/">Logout</a></li>
                    </ul>
                    
                </div>
        </>
    )
}

export default Navbar;