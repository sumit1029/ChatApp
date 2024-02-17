import React, { useContext, useEffect, useRef, useState } from 'react';
import userContext from '../Context/usercontext';
import Searchresults from './Searchresults';

const SideDrawer = () => {

    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(userContext);
    const { searchUsers, setSelctedChat } = context;
    const handleOnClick = () => {
        console.log(result);
    }
    useEffect(() => {
        if(search === ""){
            setResult([]);
            setSearch(search);
            return;
        }else{
        setLoading(true);
        let data = searchUsers(search).then();
        data.then(value => {
            setResult(value);
        })
        setSearch(search);
        setLoading(false);
    }
    }, [search]);

    const eleref = useRef(null);

    const accessChat = async (userId) => {
        try {
            let token = localStorage.getItem('token');
            var requestOptions = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({userId}),
            }
            const response = await fetch("http://localhost:5000/api/chats", requestOptions);
            const json = await response.json();
            console.log(json);
            setSelctedChat(json);
          
            eleref.current.click();
        } catch (error) {
            console.log(error.message); 
        }
    }
    return (

        <div style={{ width: "100%", zIndex: "3" }}>
            <form style={{ zIndex: "1", position: "absolute", backgroundColor: "rgb(33,37,41)", width: "27%" }} className='d-flex p-3'>
                <label><i className="fa-solid fa-magnifying-glass p-2" style={{ color: "#25ad54", backgroundColor: "#313539", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}></i></label>
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    Search
                </button>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Search</h5>
                        <button type="button" ref={eleref} className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div>
                            <label type="button"><i className="fa-solid fa-magnifying-glass p-2 mx-2" style={{ color: "red", backgroundColor: "white", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }} onClick={handleOnClick}></i></label>
                            <input type='search' placeholder="search for a person or chat" className='mx-0 p-1' onChange={(e) => setSearch(e.target.value)} value={search} style={{ border: "5px solid cyan", borderTopRightRadius: "8px", borderBottomRightRadius: "8px", backgroundColor: "white", width: "20vw" }} />
                            {
                                loading?<p style={{color:"black"}}>loading.....</p>:(result?.map(user => (
                                    <Searchresults key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
                                )))

                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default SideDrawer;
