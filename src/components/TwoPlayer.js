import React from "react";
import "./styles/twoplayer.css";
import { useNavigate  } from "react-router-dom";
import img1 from "./images/player1.png";
import img2 from "./images/player2.png";
import img3 from "./images/trophee.png";
import img4 from "./images/running.png";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
export default function TwoPlayer() {
  const navigate = useNavigate();

  const [player1, setplayer1] = useState("David");
  const [player2, setplayer2] = useState("Maria");
  const [player1editmodal, setplayer1editmodal] = useState(false);
  const [player2editmodal, setplayer2editmodal] = useState(false);
  const [number, setnumber] = useState('2');
  const [numbereditmodal, setnumbereditmodal] = useState(false);
  const [startermodal, setstartermodal] = useState(false)
  const [starter, setstarter] = useState("Alternative Turn")
  useEffect(() => {
    const name = localStorage.getItem("player1");
    const name2 = localStorage.getItem("player2");
    const whostarts = localStorage.getItem("starter")
    const n = localStorage.getItem("number")
    name ? setplayer1(name) : setplayer1("David");
    name2 ? setplayer2(name2) : setplayer2("Maria");
    whostarts? setstarter(whostarts):setstarter("Alternative Turn")
    n?setnumber(n):setnumber('2')
  }, []);
  const handleOnChange = (event) => {
    setnumber(event.target.value);
  };
  const handleOnChange2 =(e)=>{
    setstarter(e.target.value);
  }
  return (
    <div>
      <Navbar back={'/'}/>
      <div
        style={{ display: "flex", height: "90vh", justifyContent: "center" }}
      >
        <div className="content  animate__animated animate__zoomIn">
          <div
            className="container"
            onClick={() => {
              setplayer1editmodal(true);
            }}
            style={{ backgroundColor: "#e4f4e0" }}
          >
            <img style={{ border: "5px solid green" }} src={img1} alt="" />
            <div style={{ marginLeft: "15px" }}>
              <p>Player 01</p>
              <p className="name">{player1}</p>
            </div>
          </div>
          <div
            className="container"
            onClick={() => {
              setplayer2editmodal(true);
            }}
            style={{ backgroundColor: "#f7e8d1" }}
          >
            <img style={{ border: "5px solid yellow" }} src={img2} alt="" />
            <div style={{ marginLeft: "15px" }}>
              <p>Player 02</p>
              <p className="name">{player2}</p>
            </div>
          </div>
          <div
            className="container"
            onClick={() => setnumbereditmodal(true)}
            style={{ backgroundColor: "#edeaf5" }}
          >
            <img style={{ border: "5px solid skyblue" }} src={img3} alt="" />
            <div style={{ marginLeft: "15px" }}>
              <p>Number of game</p>
              <p className="name">{number} Games</p>
            </div>
          </div>
          <div onClick={()=>{setstartermodal(true)}}className="container" style={{ backgroundColor: "#e4f4e0" }}>
            <img src={img4} alt="" />
            <div style={{ marginLeft: "15px" }}>
              <p>Who Starts</p>
              <p className="name">{starter}</p>
            </div>
          </div>
          <hr
            style={{
              marginTop: "25px",
              border: "1px solid black",
              width: "95%",
            }}
          />
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "1",
            }}
          >
            <button onClick={()=>{navigate('/game', { state: { player1,player2,starter,number } })}} className="btn">Start Game</button>
          </div>
        </div>
      </div>
      {player1editmodal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="primarymodal">
            <p
              style={{ fontWeight: "Bold", fontSize: "larger", margin: "20px" }}
            >
              Set Player1 Name
            </p>
            <input
              type="text"
              value={player1}
              style={{ padding: "10px", width: "60%" }}
              onChange={(e) => {
                setplayer1(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setplayer1editmodal(false);
                localStorage.setItem("player1", player1);
              }}
              style={{
                margin: "20px",
                backgroundColor: "#0080ff",
                border: "0px",
                color: "white",
                width: "60%",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "larger",
              }}
            >
              Set Name
            </button>
          </div>
        </div>
      )}

      {player2editmodal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="primarymodal">
            <p
              style={{ fontWeight: "Bold", fontSize: "larger", margin: "20px" }}
            >
              Set Player2 Name
            </p>
            <input
              type="text"
              value={player2}
              style={{ padding: "10px", width: "60%" }}
              onChange={(e) => {
                setplayer2(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setplayer2editmodal(false);
                localStorage.setItem("player2", player2);
              }}
              style={{
                margin: "20px",
                backgroundColor: "#0080ff",
                border: "0px",
                color: "white",
                width: "60%",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "larger",
              }}
            >
              Set Name
            </button>
          </div>
        </div>
      )}
      {numbereditmodal&&<div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="secondarymodal">
          <p style={{ fontWeight: "Bold", fontSize: "larger", margin: "20px" }}>
            Number of game
          </p>
          <div>
            <div className="option">
              <input type="radio" name="answer" onChange={handleOnChange} checked={number==="2"} value="2" /> 2 Games
            </div>
            <br />
            <div className="option">
              <input type="radio" name="answer" onChange={handleOnChange} checked={number==='3'} value="3" /> 3 Games
            </div>
            <br />
            <div className="option">
              <input type="radio" name="answer" onChange={handleOnChange} checked={number==='5'} value="5" /> 5 Games
            </div>
            <br />
            <div className="option">
              <input type="radio" name="answer" onChange={handleOnChange} checked={number==='10'} value="10" /> 10 Games
            </div>
            <br />
          </div>
          <hr
            style={{
              border: "1px solid black",
              width: "95%",
            }}
          />
          <div style={{ display: "flex", width: "100%" ,justifyContent:'space-between'}}>
            <button
              style={{
                margin: "20px",
                cursor:"pointer",
                backgroundColor: "white",
                border: "0px",
                color: "#0080ff",
                width: "45%",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "larger",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"

              }}
              onClick={()=>{setnumbereditmodal(false)}}
            >
              CANCEL
            </button>

            <button
              style={{
                margin: "20px",
                cursor:"pointer",
                backgroundColor: "#0080ff",
                border: "0px",
                color: "white",
                width: "45%",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "larger",
              }}
              onClick={()=>{setnumbereditmodal(false);localStorage.setItem("number",number)}}
            >
              OK
            </button>
          </div>
        </div>
      </div>}

      {startermodal&&<div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="secondarymodal">
          <p style={{ fontWeight: "Bold", fontSize: "larger", margin: "20px" }}>
            Who Starts
          </p>
          <div>
            <div className="option">
              <input type="radio" name="answer" onChange={handleOnChange2} checked={starter==="Alternative Turn"} value="Alternative Turn" /> Alternative Turn
            </div>
            <br />
            <div className="option">
              <input type="radio" name="answer" onChange={handleOnChange2} checked={starter==='Looser First'} value="Looser First" /> Looser First
            </div>
            <br />
            <div className="option">
              <input type="radio" name="answer" onChange={handleOnChange2} checked={starter==='Winner First'} value="Winner First" /> Winner First
            </div>
            <br />
            <div className="option">
              <input type="radio" name="answer" onChange={handleOnChange2} checked={starter==='Always player 01'} value="Always player 01" /> Always player 01
            </div>
            <br />
            <div className="option">
              <input type="radio" name="answer" onChange={handleOnChange2} checked={starter==='Always player 02'} value="Always player 02" /> Always player 02
            </div>
            <br />
          </div>
          <hr
            style={{
              border: "1px solid black",
              width: "95%",
            }}
          />
          <div style={{ display: "flex", width: "100%" ,justifyContent:'space-between'}}>
            <button
              style={{
                margin: "20px",
                cursor:"pointer",
                backgroundColor: "white",
                border: "0px",
                color: "#0080ff",
                width: "45%",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "larger",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
              }}
              onClick={()=>{setstartermodal(false)}}
            >
              CANCEL
            </button>

            <button
              style={{
                margin: "20px",
                cursor:"pointer",
                backgroundColor: "#0080ff",
                border: "0px",
                color: "white",
                width: "45%",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "larger",
              }}
              onClick={()=>{setstartermodal(false);localStorage.setItem("starter",starter)}}
            >
              OK
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
}
