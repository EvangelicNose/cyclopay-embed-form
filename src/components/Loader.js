import React from 'react'
import './Loader.css'

const Loader = ({ size = 100, style = {}, white, strokeWidth = '2' }) =>
    <div className="loader" style={{ width: size, ...style }}>
        <svg className="circular" viewBox="25 25 50 50">
            <circle className={`path ${white ? "white" : ""}`} cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10"/>
        </svg>
    </div>

export default Loader