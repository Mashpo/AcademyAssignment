import React, { useEffect } from "react";


function HomePage(props) {

  useEffect(()=>{
    props.setDataHeader("Home")
  },[])

  return(
    <>
      <h1>Welcome Home!</h1>
    </>
  );
};

export default HomePage;