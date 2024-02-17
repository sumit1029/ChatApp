import React, { useContext, useEffect, useRef, useState } from 'react';
import userContext from '../Context/usercontext';
import Searchresults from './Searchresults';
import Userbagde from './Userbagde';

const Group = ({ children }) => {
    const [search, setSearch] = useState("");
    const [groupname, setGroupname] = useState("");
    const [result, setResult] = useState([]);
    const [members, setMembers] = useState([]);
    const context = useContext(userContext);
    const { searchUsers, setSelctedChat } = context;
    useEffect(() => {
        let data = searchUsers(search).then();
        data.then(value => {
            setResult(value);
        })
        setSearch(search);
    }, [search]);

    const accessChat = (user) => {
        if(members.includes(user)){
            return;
        }
        setMembers([...members, user]);
    }

    const eleref = useRef(null);

    const handleOnClose = () =>{
        setMembers([]);
        setSearch("");
        setGroupname("");
        eleref.current.click();
    }

    const handleDelete = (user) =>{
        setMembers(
            members.filter((sel)=>sel._id !== user._id)
        )
    }



    const handleSubmit = async() =>{
        if(!groupname || !members){
            return;
        }
        // console.log(JSON.stringify(groupname))
        // console.log((JSON.stringify(members.map((u)=>u._id))))
        let arr = `${(JSON.stringify(members.map((u)=>u._id)))}`;
        // console.log(JSON.stringify({name:groupname, users:arr}))
        try {
            let token = localStorage.getItem('token');
            var requestOptions = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({name:groupname, users:arr}),
            }
            const response = await fetch("http://localhost:5000/api/chats/group", requestOptions);
            const json = await response.json();
            // console.log(json);
            setSelctedChat(json);

            handleOnClose();
        } catch (error) {
            console.log(error.message);
        }
    }

    return (

        <div>

            <div type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ backgroundColor: "#313539" }}>
                <i className="fa-brands fa-rocketchat mt-2 mx-3" style={{ color: "lightgrey", fontSize: "3vh" }}></i>
            </div>


            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel" style={{ marginLeft: "40%" }}>Group Chat</h5>
                            <button type="button" ref={eleref} className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleOnClose}></button>
                        </div>
                        <div className="modal-body d-flex flex-column justify-content-cente">
                            <input type='text' placeholder='Group Name' onChange={(e)=>setGroupname(e.target.value)} className='mb-3 p-1'></input>
                            <div className='d-flex mx-0 flex-wrap'>
                            {
                                (members?.map(user=> (
                                    <Userbagde key={user._id} user={user} handleFunction={() => handleDelete(user)}></Userbagde>
                                )))
                            }
                            </div>
                            <input type='search' placeholder="search for a person or chat" className='mx-0 p-1' onChange={(e) => setSearch(e.target.value)} value={search} />
                            {
                                search !== ""?(result?.slice(0,3).map(user => (
                                    <Searchresults key={user._id} user={user} handleFunction={() => accessChat(user)}/>
                                ))):<div></div>

                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Group</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Group;
