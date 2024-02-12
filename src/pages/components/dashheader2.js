import React from 'react';
import { useState } from 'react';



const Dashheader= () =>{
    const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
    return(
        <header className="header">
        <div className="container">
          <div className="logo">
            <img src="/logo.png" alt="My Repairs" />
          </div>
          <div className="navigation">
            <ul className="menu">
              <li className="logsin">
                <button className="btn-login" >
                  Home
                </button>
              </li>
              <li className="registers">
                <button className="btn-register" >
                  Settings
                </button>
              </li>
              <li className='Help'>
                <button className='btn-help'>
                    Help
                </button>

              </li>
            </ul>
           
          </div>
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
            <button className="btn-search">Search</button>
          </div>
        </div>


        <style jsx>{`
  .header {

   z-index: 1111;
    padding-top: 20px;
  }

  .container {
    width: 950px;
    position: absolute;
    left: 5%;
    justify-content: space-between;
    border-radius: 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: white;
    height: 90px;
    display: flex;

  }
  .logo img {
    height: 120px;
    width: auto;
    margin-left: 0px;
    padding: 0;
    background-color: none;

  }

  .navigation .menu {
    list-style: none;
    margin: 0;
   justify-content: space-between;
    display: flex;
    align-items: center;
    right: 0;
    left: 0;
    position: sticky;
    float: right;
    
  }

  .btn-register {
    background-color:white ;
    
    color: #ff0068;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;

    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .btn-login {
    background-color:#ff0068 ;
    color: white;
    
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .btn-help{
    background-color: white;
    color: #ff0068;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .search-bar {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .search-bar input {
    padding: 8px;
    border: none;
    border-radius: 20px;
    margin-right: 10px;
    box-shadow: 0px 0px 10px #ff0068;

  }

  .btn-search {
    background-color: #ff0068;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  @media (max-width: 760px){
    .container{
      width: 200px;
      background: black;
    }
  }

`}</style>
        </header>

      
    )
}
export default Dashheader;
