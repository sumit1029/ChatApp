import React from 'react';

const Navbar = () => {
  return (
    <div className='w-100'>
      <ul className="nav justify-content-center" style={{ backgroundColor: "rgb(23,30,61)" }}>
        <li className="nav-item mt-2 d-flex">
          <h1 style={{ color: "red" }}>"Chit"</h1>
          <h1 style={{ color: "white" }}> ^_^ </h1>
          <h1 style={{ color: "green" }}>"Chat"</h1>
        </li>

      </ul>
    </div>
  );
}

export default Navbar;
