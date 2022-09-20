import React, { useEffect, useState } from "react";

import Popup from "../ViewsA2/PopupTemplate";

function HomePage(props) {

  useEffect(()=>{
    props.setDataHeader("Home")
  },[])

  // ~~~~~ Popup Template ~~~~~
  // const [isOpen, setIsOpen] = useState(false);
  // const togglePopup = () => {
  //   setIsOpen(!isOpen);
  // }


  return(
    <>
      <h1>Welcome Home!</h1>
  
      {/* ~~~~~ Popup Template ~~~~~ */}
      {/* <input
      type="button"
      value="Click to Open Popup"
      onClick={togglePopup}
      />
      {isOpen && <Popup
        content={<>
          <b>Design your Popup</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <button>Test button</button>
        </>}
        handleClose={togglePopup}
      />} */}



    </>
  );
};

export default HomePage;