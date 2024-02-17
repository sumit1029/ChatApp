import React from 'react';

const SideChats = (props) => {
   
    return (

        <>

        <div onClick={props.onclick} className='d-flex mt-3'>
            <img src={props.pic} height={"50px"} width={"50px"} style={{ borderRadius: "50%" }} />
            <div className='mx-3'>
                <p style={{ color: "white", width:"100%" }}>{props.sender}</p>
                <p style={{ color: "grey" }}>{props.latest}</p>

            </div>
            {/* <div className='justify-content-end mt-1' style={{marginLeft:"50%", fontSize:"12px"}}>
                <p style={{ color: "white" }}>18:59</p>
            </div> */}
        </div>
        <hr className='line'></hr>


        </>


    );
}

export default SideChats;
