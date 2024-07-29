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
              <a href="/user-dashboard">
                <button className="btn-login">
                  Home
                </button>
              </a>
            </li>
            <li className="registers">
              <a href="/Settings">
                <button className="btn-register">
                  Settings
                </button>
              </a>
            </li>
            <li className="Help">
              <a href="/Help">
                <button className="btn-help">
                  Help
                </button>
              </a>
            </li>
            </ul>
          
          </div>
          
       
          
          <button className='mobilesettings'>Settings</button>
        </div>


        <style jsx>{`
  .header {

    z-index: 1111;
 
   }
 
   .container {
     width: 950px;
     border-bottom: 2px solid #ff0068;
     justify-content: space-between;
  
     display: flex;
     align-items: center;
     height: 80px;
     display: flex;
     padding: 18px
 
   }
   .mobilesettings{
     display: none;
   }
   .logo img {
     height: 120px;
     width: auto;
     margin-left: -17px;
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
     
     color: #21B6A8;
     border: none;
     padding: 8px 16px;
     font-size: 14px;
     font-weight: bold;
 position: relative;
     border-radius: 30px;
     cursor: pointer;
     transition: background-color 0.3s;
   }
 
   .btn-login {
     color: #ff0068;
     background: white;
     border: none;
     padding: 8px 16px;
     font-size: 14px;
     font-weight: bold;
     border-radius: 30px;
     cursor: pointer;
     transition: background-color 0.3s;
     text-align: center;
     position: relative;
 
     
   }
   .btn-help{
     background-color: white;
     color:#21B6A8;
     border: none;
     padding: 8px 16px;
     font-size: 14px;
     font-weight: bold;
     border-radius: 30px;
     cursor: pointer;
     transition: background-color 0.3s;
     position: relative;
 
   }
   .btn-login::after{
     content: "...";
     position: absolute;
     left: 30px;
   display: block;
   text-align: center;
     color: red; /* Adjust the color as needed */
     
   }
   .btn-register::after{
     content: "...";
     position: absolute;
     left: 35px;
   display: block;
   text-align: center;
     color:#21B6A8 ; /* Adjust the color as needed */
 
   }
   .btn-help::after{
     content: "...";
     position: absolute;
     left: 25px;
   display: block;
   text-align: center;
     color:#21B6A8 ; /* Adjust the color as needed */
 
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
     box-shadow: 0px 0px 10px #21B6A8;
 
   }
 
   .btn-search {
     background-color: #FF0066;
     color: azure;
     border: none;
     padding: 8px 16px;
     font-size: 14px;
     font-weight: bold;
     border-radius: 30px;
     cursor: pointer;
     transition: background-color 0.3s;
   }
 
   @media (max-width: 768px){
     .container{
       width: 100%;
       margin-top: 25px;
       height: 50px;
      
       
     }
     .logo img{
       width: 100px;
       height: auto;
       float: right;
       margin-top: -50px;
       margin-right: 240px;
       
     }
     .navigation{
       display: none;
     } 
     .search-bar{
       display: none;
     }
     .mobilesettings{
       display: block;
       background: #ff0068;
       border-style: none;
       font-size: 15px;
       font-family: poppins;
       font-weight: bold;
       color: #fff;
       border-radius: 10px;
       padding: 5px;
     }
     
   .btn-register {
    background-color:white ;
    
    color: #21B6A8;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    position: relative;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 30px;
    }
  }
     @media (max-width: 768px) {
      .container {
          height: auto;
          flex-direction: column;
          padding: 10px;
      }

      .logo img {
          width: 80px;
          height: auto;
          margin-bottom: 10px;
          margin-top: -50px;
          margin-right: 240px;
      }

      .navigation {
          display: none;
      }

      .search-bar {
          display: none;
      }

      .mobilesettings {
          display: block;
          background: #ff0068;
          border: none;
          font-size: 15px;
          font-family: Poppins, sans-serif;
          font-weight: bold;
          color: #fff;
          border-radius: 10px;
          padding: 5px;
          margin-top: 10px;
          margin-Left: 190px;
      }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
      .container {
          padding: 12px;
      }

      .logo img {
          max-width: 100px;
          margin-top: 30px;
      }

      .btn-register, .btn-login, .btn-help {
          font-size: 12px;
          padding: 6px 12px;
      }
   }
 
 `}</style>
         </header>
 
       
     )
 }
 export default Dashheader;
 