

import { colours } from 'nodemon/lib/config/defaults';
import React, { useState, useEffect } from 'react'


function KB_APP_LIST(props){
    useEffect(()=>{
        props.setDataHeader("Kanban Board - App List")
    },[])


    const test = [1,2,3,4,5];

    let selectedColor = true



    return(
        <>
            <div className='col-6'> 
                <h2><u>Apps</u></h2>
                <p><button>Create App</button></p>
                <p>
                    <b>Applications:&nbsp;</b>

                    {test.map((test)=> 
                        <button 
                            key={test} 
                            style={{
                                marginRight: "10px"
                                ,border: "none"
                                ,color: "white"
                                ,backgroundColor:(selectedColor === true? "#2cacda" : "darkslateblue")
                            }}
                            
                            onClick={()=>{
                                console.log(test)
                            }}
                        >
                            {"app" + test}
                        </button>
                    )}
                </p>
            </div>

            <div className='col-5'> 
                <h3>Open</h3>
            </div>

            <div className='col-5'> 
                <h3>To Do</h3>
            </div>

            <div className='col-5'> 
                <h3>Doing</h3>
            </div>

            <div className='col-5'> 
                <h3>Done</h3>
            </div>

            <div className='col-5'> 
                <h3>Close</h3>
            </div>

        </>
    )

}

export default KB_APP_LIST;