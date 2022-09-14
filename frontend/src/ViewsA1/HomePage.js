import React, { useEffect, useState } from "react";

import Modal from "../ViewsA2/ModalTemplate";
import styles from "../ComponentsA2/ModalStyles.css"


function HomePage(props) {

  useEffect(()=>{
    props.setDataHeader("Home")
  },[])

  const [isOpen, setIsOpen] = useState(false);

  return(
    <>
      <h1>Welcome Home!</h1>

      <div>
      <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </div>


    </>
  );
};

export default HomePage;