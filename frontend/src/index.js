//==================Identity Access Management Modules-[Assignment 1]====================
  // NPM modules
  import React, { useState } from "react";
  import ReactDOM from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import UserToken from "./ComponentsA1/UserToken";
  // Custom View modules
  import HomePage from './ViewsA1/HomePage';
  import InvalidPage from "./ViewsA1/InvalidPage";
  import Header from "./ViewsA1/Header"
  import LoginPage from "./ViewsA1/LoginPage";
  import { VO_PROFILE_PAGE } from "./ViewsA1/VO_ProfilePage";
  import { EO_PROFILE_PAGE } from "./ViewsA1/EO_ProfilePage";
  import { G_MANAGEMENT_PAGE } from "./ViewsA1/G_ManagementPage";
  import U_MANAGEMENT_PAGE from "./ViewsA1/U_ManagementPage";
  //CSS
  import './index.css';
  // Custom Components modules
  import Navbar from "./ViewsA1/NavbarView";

//==================Task Management System Modules-[Assignment 2]====================
  import KanbanBoardPage from "./ViewsA2/KanbanBoardPage";



export default function App() {
  //Initialisation
  const {token, setToken} = UserToken();
  const [HeaderData, setHeaderData] = useState();
  // Login page if no token
  if (!token) {
    return(
      <>
        <div className="App">
          <LoginPage setToken={setToken}/>
        </div>
      </>
    )
  }

  return (
    <div className="App">
      <Header DataHeader={HeaderData}/>
        <div className="row">
          <Navbar/>
            <div className="col-2">
              <BrowserRouter>
                <Routes>
                  {/* ==================Identity Access Management Routes-[Assignment 1]==================== */}
                  <Route index element={<HomePage setDataHeader={setHeaderData}/>}/>
                  <Route path="/VO_PROFILE_PAGE" element={<VO_PROFILE_PAGE setDataHeader={setHeaderData}/>}/>
                  <Route path="/EO_PROFILE_PAGE" element={<EO_PROFILE_PAGE setDataHeader={setHeaderData}/>}/>
                  <Route path="/G_MANAGEMENT_PAGE" element={<G_MANAGEMENT_PAGE setDataHeader={setHeaderData}/>}/>
                  <Route path="/U_MANAGEMENT_PAGE" element={<U_MANAGEMENT_PAGE setDataHeader={setHeaderData}/>}/>

                  {/* ==================Task Management System Routes-[Assignment 2]==================== */}
                  <Route path="/KanbanBoardPage" element={<KanbanBoardPage setDataHeader={setHeaderData}/>}/>


                  {/* ==================Undeclared routes will display InvalidPage instead==================== */}
                  <Route path="*" element={<InvalidPage/>}/>
                </Routes>
              </BrowserRouter>
            </div>

        </div>

    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);