import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  NavDropdown,
  Offcanvas,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { logout } from "../Action/action";

function Header() {
  const navigate = useNavigate()
  const  Logout=async()=>{
    const res =await logout()
    
    if(res == true){
      localStorage.setItem('user','')
      localStorage.setItem('AccessToken','')
navigate('/')
    }
    }
  return (
    <header>
      <div className="logo">
        <span class="sc-eishCr jzzsgq" onClick={()=>{navigate('/')}} style={{cursor:'pointer'}}>
          <svg width="36" height="36" viewBox="0 0 50 50" fill="none">
            <title lang="en">Home page</title>
            <g clip-path="url(#clip0)">
              <circle
                cx="7.06331"
                cy="29.5219"
                r="6"
                transform="rotate(-15 7.06331 29.5219)"
                fill="#DC4E66"
              ></circle>
              <circle
                cx="42.8016"
                cy="19.9458"
                r="6"
                transform="rotate(-15 42.8016 19.9458)"
                fill="#50B3A4"
              ></circle>
              <circle
                cx="11.8516"
                cy="11.6533"
                r="6"
                transform="rotate(45 11.8516 11.6533)"
                fill="#E47F4A"
              ></circle>
              <circle
                cx="38.0156"
                cy="37.8173"
                r="6"
                transform="rotate(45 38.0156 37.8173)"
                fill="#5386C2"
              ></circle>
              <circle
                cx="29.7218"
                cy="6.86373"
                r="6"
                transform="rotate(105 29.7218 6.86373)"
                fill="#F2BE44"
              ></circle>
              <circle
                cx="20.1437"
                cy="42.602"
                r="6"
                transform="rotate(105 20.1437 42.602)"
                fill="#AE7EA5"
              ></circle>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="50" height="50" fill="transparent"></rect>
              </clipPath>
            </defs>
          </svg>
        </span>
        <span class="sc-eishCr jzzsgq bnk">
          <svg
            width="30"
            height="28"
            viewBox="0 0 30 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 5.99996V6.99996C30 7.13256 29.9473 7.25974 29.8536 7.35351C29.7598 7.44728 29.6326 7.49996 29.5 7.49996H28V8.24996C28 8.66414 27.6642 8.99996 27.25 8.99996H2.75C2.33581 8.99996 2 8.66414 2 8.24996V7.49996H0.5C0.367392 7.49996 0.240215 7.44728 0.146447 7.35351C0.0526784 7.25974 0 7.13256 0 6.99996V5.99996C7.1509e-07 5.90104 0.0293424 5.80434 0.0843126 5.7221C0.139283 5.63986 0.217411 5.57578 0.308812 5.53796L14.8088 0.0379559C14.9312 -0.0127334 15.0688 -0.0127334 15.1912 0.0379559L29.6912 5.53796C29.7826 5.57578 29.8607 5.63986 29.9157 5.7221C29.9707 5.80434 30 5.90104 30 5.99996ZM28.5 25H1.5C0.671562 25 0 25.6715 0 26.5V27.5C0 27.6326 0.0526784 27.7597 0.146447 27.8535C0.240215 27.9473 0.367392 28 0.5 28H29.5C29.6326 28 29.7598 27.9473 29.8536 27.8535C29.9473 27.7597 30 27.6326 30 27.5V26.5C30 25.6715 29.3284 25 28.5 25ZM5 9.99996V22H2.75C2.33581 22 2 22.3358 2 22.75V24H28V22.75C28 22.3358 27.6642 22 27.25 22H25V9.99996H21V22H17V9.99996H13V22H9V9.99996H5Z"
              fill="#545457"
            ></path>
          </svg>
        </span>
        
      </div>
      
      <div className="logged-icons">
        <div className="icon_1">
          <button
            title="Connections"
            aria-label="Connections"
            class="sc-cVkrFx hzPuOC"
          >
            <span class="sc-ksXhwv iVzzFR">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                aria-labelledby="undefinedlabel"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title id="undefinedlabel" lang="en">Connections</title>
                <path
                  d="M5.24992 9.97732C5.24992 12.3048 7.00575 14.0606 9.33325 14.0606C11.6608 14.0606 13.4166 12.3048 13.4166 9.97732C13.4166 7.64982 11.6608 5.89398 9.33325 5.89398C7.00575 5.89398 5.24992 7.64982 5.24992 9.97732ZM22.1666 9.33332H19.8333V12.8333H16.3333V15.1666H19.8333V18.6666H22.1666V15.1666H25.6666V12.8333H22.1666V9.33332ZM4.66659 22.1666H16.3333V21C16.3333 17.7835 13.7164 15.1666 10.4999 15.1666H8.16659C4.95009 15.1666 2.33325 17.7835 2.33325 21V22.1666H4.66659Z"
                  fill="#828287"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="icon_1">
          <button
            title="My profile"
            aria-label="My profile"
            class="sc-cVkrFx hzPuOC"
            onClick={()=>{
              if(localStorage.getItem('user').length>0){
              navigate('/User_info')}else{
              

                toast.info('Login first')
              }
            }}
          >
            <span class="sc-iWRGeL gRFxwe">
              <svg
                width="26"
                height="26"
                viewBox="1 0 26 26"
                aria-labelledby='function(){var e=arguments.length>0&amp;&amp;void 0!==arguments[0]?arguments[0]:"id";return tr++,"".concat(e).concat(tr)}label'
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title
                  id='function(){var e=arguments.length>0&amp;&amp;void 0!==arguments[0]?arguments[0]:"id";return tr++,"".concat(e).concat(tr)}label'
                  lang="en"
                >
                  My profile
                </title>
                <path
                  d="M13.9999 2.33331C7.67542 2.33331 2.33325 7.67548 2.33325 14C2.33325 20.3245 7.67542 25.6666 13.9999 25.6666C20.3244 25.6666 25.6666 20.3245 25.6666 14C25.6666 7.67548 20.3244 2.33331 13.9999 2.33331ZM13.9999 8.16665C16.0148 8.16665 17.4999 9.65065 17.4999 11.6666C17.4999 13.6826 16.0148 15.1666 13.9999 15.1666C11.9863 15.1666 10.4999 13.6826 10.4999 11.6666C10.4999 9.65065 11.9863 8.16665 13.9999 8.16665ZM8.04292 19.5673C9.08942 18.0273 10.8348 17.0006 12.8333 17.0006H15.1666C17.1663 17.0006 18.9104 18.0273 19.9569 19.5673C18.4659 21.1633 16.3508 22.1666 13.9999 22.1666C11.6491 22.1666 9.53392 21.1633 8.04292 19.5673Z"
                  fill="#828287"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="icon_1">
          <button title="Logout" aria-label="Logout" class="sc-cVkrFx hzPuOC" onClick={()=>Logout()}>
            <span class="sc-kHNMoK YuGGQ">
              <svg
                width="24"
                height="24"
                aria-labelledby='function(){var e=arguments.length>0&amp;&amp;void 0!==arguments[0]?arguments[0]:"id";return tr++,"".concat(e).concat(tr)}label'
                viewBox="0 0 19 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title
                  id='function(){var e=arguments.length>0&amp;&amp;void 0!==arguments[0]?arguments[0]:"id";return tr++,"".concat(e).concat(tr)}label'
                  lang="en"
                >
                  Logout
                </title>
                <path
                  d="M0.833252 3.83336V20.1667C0.833252 20.4761 0.956168 20.7729 1.17496 20.9916C1.39375 21.2104 1.6905 21.3334 1.99992 21.3334H5.49992V19H3.16659V5.00002H5.49992V2.66669H1.99992C1.6905 2.66669 1.39375 2.78961 1.17496 3.0084C0.956168 3.22719 0.833252 3.52394 0.833252 3.83336ZM17.4489 2.70169L8.11558 0.368357C7.94364 0.325471 7.76418 0.32232 7.59084 0.359142C7.41749 0.395965 7.25481 0.471793 7.11514 0.580872C6.97548 0.689951 6.8625 0.829413 6.78478 0.988675C6.70705 1.14794 6.66663 1.32281 6.66659 1.50002V22.5C6.66618 22.6774 6.7063 22.8525 6.78388 23.012C6.86146 23.1715 6.97446 23.3112 7.11424 23.4203C7.25403 23.5295 7.41691 23.6053 7.59045 23.6419C7.76399 23.6786 7.9436 23.6751 8.11558 23.6317L17.4489 21.2984C17.7014 21.2354 17.9256 21.0898 18.0859 20.8847C18.2461 20.6797 18.3332 20.4269 18.3333 20.1667V3.83336C18.3332 3.57312 18.2461 3.32037 18.0859 3.11532C17.9256 2.91026 17.7014 2.76467 17.4489 2.70169V2.70169ZM12.4999 12.2194C12.4865 12.5197 12.3577 12.8034 12.1404 13.0112C11.9231 13.219 11.6339 13.335 11.3333 13.335C11.0326 13.335 10.7435 13.219 10.5261 13.0112C10.3088 12.8034 10.18 12.5197 10.1666 12.2194V11.7795C10.1667 11.4701 10.2898 11.1734 10.5087 10.9547C10.7276 10.7361 11.0244 10.6133 11.3338 10.6134C11.6433 10.6136 11.9399 10.7367 12.1586 10.9556C12.3773 11.1745 12.5001 11.4713 12.4999 11.7807V12.2194V12.2194Z"
                  fill="#828287"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    

    </header>
  );
}

export default Header;
