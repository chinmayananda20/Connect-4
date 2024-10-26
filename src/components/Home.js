import React from "react";
import "./styles/home.css";
import img1 from "./images/image.png";
import { SlPeople } from "react-icons/sl";
import { GoPerson } from "react-icons/go";
import { PiBrainLight } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const toastMsg = ()=>{
    toast.info('Rolling out shortly', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  return (
    <div className="home_body">
      <ToastContainer />
      <div className="main_body">
        <div className="logo">
          <p className="heading">CONNECT FOUR!</p>
          <p className="tagline">Play with other players around the world.</p>
        </div>
        <div className="box">
          <div className="main">
            <div className="upper">
              <div className="play_box animate__animated animate__zoomIn">PLAY</div>
              <img src={img1} className="image" alt="" />
            </div>
            <hr className="line" />
            <div className="options">
              <div className="lower">
                <div className="row">
                  <div onClick={toastMsg} className="opt1 animate__animated animate__fadeInLeft d-flex">
                    <div className="opt_name items-center d-flex">
                      <GoPerson className="icon-styles" />
                      <p>Custom Game</p>
                    </div>
                    <div className="soon">Coming Soon</div>
                  </div>
                  <Link to={"/twoPlayer"} style={{textDecoration:"none"}}>
                    <div className="opt2 animate__animated animate__fadeInRight d-flex">
                      <div className="opt_name items-center d-flex">
                        <SlPeople className="icon-styles" />
                        <p >Two Players</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="row">
                  <div onClick={toastMsg} className="opt3 animate__animated animate__fadeInLeft  d-flex">
                    <div className="opt_name items-center d-flex">
                      <TbWorld className="icon-styles" />
                      <p>Game Online</p>
                    </div>
                    <div className="soon">Coming Soon</div>
                  </div>
                  <div onClick={toastMsg} className="opt4 animate__animated animate__fadeInRight  d-flex">
                    <div className="opt_name items-center d-flex">
                      <PiBrainLight className="icon-styles" />
                      <p>Training Game</p>
                    </div>
                    <div className="soon">Coming Soon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">&copy; 2020</div>
        </div>
      </div>
    </div>
  );
}
