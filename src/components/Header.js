import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Header Component: The content of the header section.
 */
export default function Header() {
    const location = useLocation().pathname; 
    return (
        <header className="page-header">
            <div className="header-logo">
                {location !== "/sampleList" ? <Link to="/sampleList" className="back-arrow"><i className="fa-solid fa-arrow-left fa-xl"></i></Link> : ""}
                <h2>
                    <Link to="/sampleList" className="header-icon-link">SongTrax</Link>
                </h2>
            </div>
            <div className="header-app-description">
                <span>Create & Share Location Based Music Samples!</span>
            </div>
        </header>
    );
}