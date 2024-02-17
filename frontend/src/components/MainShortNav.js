import React from 'react';

const MainShortNav = (props) => {
    // console.log(props.sender)
  return (
    <div>
       <div className='navbar navbar-expand-lg' style={{ backgroundColor: "#313539" }}>
            <div className='container-fluid'>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item m-1 mx-3 d-flex">
                            <img src={props.pic} alt='DP' height={"40vh"} width={"40vw"} style={{ borderRadius: "50%" }} />
                            <p className="mx-3 mt-2" style={{color:"white", fontSize:"16px"}}>{props.sender}</p>
                        </li>
                        {/* <li className='nav-item m-2 mx-1' style={{width:"50vw"}}>
                            
                        </li> */}
                    </ul>
                </div>
                
                <div>
                    {/* <i className="fa-brands fa-rocketchat mx-3" style={{ color: "lightgrey", fontSize: "3vh" }}></i> */}
                    <i className="fa-solid fa-ellipsis-vertical mx-4" style={{ color: "lightgrey", fontSize: "3vh" }}></i>
                </div>
            </div>
        </div>
    </div>
  );
}

export default MainShortNav;
