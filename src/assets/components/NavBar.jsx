import React from "react";
import { Link, useLocation } from "react-router-dom"
import { useState } from "react";
import SideBar from "./SideBar"; // Assuming SideBar exists
import { faHome, faList, faCog } from "@fortawesome/free-solid-svg-icons"; // Assuming FontAwesome is installed

const NavBar = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    const location = useLocation()
    const links = [
        {
            name: "Home",
            path: "/",
            icon: faHome
        },
        {
            name: "Events",
            path: "/events",
            icon: faList
        },
        {
            name: "My Bookings",
            path: "/my-bookings",
            icon: faCog
        },
        // {
        //     name: "Settings",
        //     path: "/settings",
        //     icon: faCog
        // },
        {
            name: "Login", // ✅ Added Login link
            path: "/login",
            icon: faCog
        }
    ]

    const closeSidebar = () => {
        setShowSidebar(false)
    }
    return (
        <>
            <div className="navbar container"> {/* Ensure 'container' class is also here */}
                <Link to="/" className="logo">Event<span>Flow</span></Link>
                <div className="nav-links">
                    {links.map(link => (
                        <Link className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"} to={link.path} key={link.name}>{link.name}</Link>
                    ))}
                </div>
                {/* Mobile sidebar button - display:block on small screens, display:none on large screens */}
                <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            {showSidebar && <SideBar close={closeSidebar} links={links} />}
        </>
    )
}

export default NavBar;
