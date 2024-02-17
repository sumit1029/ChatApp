import React from 'react';

const Searchresults = (props) => {
    // console.log(props.user);
  return (
    <div>
        <div type="button" className='mt-3 card w-60 p-3' style={{ backgroundColor: "white", zIndex: "3" }} onClick={props.handleFunction}>
      <div className='d-flex mt-0'>
            <img src={props.user.pic} alt='DP' height={"50px"} width={"50px"} style={{ borderRadius: "50%" }} />
            <div className='mx-3'>
                <p style={{ color: "Black" }}>{props.user.name}</p>
                <p style={{ color: "grey" }}>{props.user.email}</p>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Searchresults;
