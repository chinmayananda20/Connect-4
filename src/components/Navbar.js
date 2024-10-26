import React from 'react'
import { Link } from 'react-router-dom'
import './styles/navbar.css'
 export default function Navbar  (props)  {
  return (
    <div className="navbar">
        <Link
          className="back"
          style={{ textDecoration: "none", color: "black", marginLeft: "15px" }}
          to={props.back}
        >
          Go To Previous Page
        </Link>
        <p style={{ fontSize: "large" }}>Two Players Game</p>
      </div>
  )
}

