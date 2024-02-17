import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Group from './Group';
import userContext from '../Context/usercontext';
import Notifications from './Notifications';

const SideShortNav = (props) => {
    // console.log(props.user)
    const navigate = useNavigate();

    const context = useContext(userContext);
    const { notification } = context;

    const handleOnClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    }
    // const eleref = useRef(null);

    // console.log(notification)

    return (
        <div className='navbar navbar-expand-lg' style={{ backgroundColor: "#313539" }}>
            <div className='container-fluid'>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item m-1 mx-3 d-flex">
                            <img src={props.user.pic} alt='DP' height={"38vw"} width={"38vw"} style={{ borderRadius: "50%" }} />
                            <p className='mt-2 mx-2' style={{ color: "white", marginTop: "0px" }}>{props.user.name}</p>
                        </li>
                        {/* <li>
                            
                            <p style={{ color: "white", marginTop: "0px" }}>{props.user.email}</p>

                        </li> */}
                    </ul>
                </div>

                <div className='d-flex'>
                    <div className="nav-item dropdown">
                    <div role='button' data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-bell mt-2 mx-3" style={{ color: "lightgrey", fontSize: "3vh" }}></i>
                        <span className="position-absolute top-1 start-8 translate-middle badge rounded-pill bg-danger" style={{transform: "translate(-100%,-30%)"
                        }}>
                            {notification.length === 0?0:notification.length}
                            <span className="visually-hidden">unread messages</span>
                        </span></div>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {!notification.length && "No new message"}
                            {notification.map((notify)=>(
                                <Notifications key={notify._id} chatname={notify.chat.chatName}></Notifications>
                            ))}
                        </ul>
                        </div>
                    <Group><i className="fa-brands fa-rocketchat mt-2 mx-3" style={{ color: "lightgrey", fontSize: "3vh" }}></i></Group>

                    <div className="nav-item dropdown">
                        <div className="nav-link" role='button' data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-ellipsis-vertical" style={{ color: "lightgrey", fontSize: "3vh" }}></i>
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li role='button' className='mx-4 mt-1 mb-1'>Profile</li>
                            <hr className='line mr-3'></hr>
                            <li role='button' className='mx-4 mt-1 mb-1' onClick={handleOnClick}>Logout</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SideShortNav;
