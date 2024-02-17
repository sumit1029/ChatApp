import React from 'react';

const Userbagde = (props) => {
    return (
        <div className='d-flex justify-content-center align-content-center mb-3 mx-1'>
            <span className="bg-primary p-1" style={{ color: "white", fontSize: "14px", borderRadius: "5px" }}>
                {props.user.name} <span type="button" className="badge" onClick={props.handleFunction}>x</span>
            </span>
        </div>
    );
}

export default Userbagde;
