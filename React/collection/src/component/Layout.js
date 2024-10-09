import React from "react";
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="layout-container d-flex flex-column min-vh-100">
            <nav className="navbar navbar-expand-lg bg-danger">
                <div className="container-fluid">
                    <img className="rounded-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc4jgpR6ZiuXCemlW9NiB9OYE3IiJ1oOz7-w&s" 
                        alt="Brand Logo" style={{ maxWidth: "50px", maxHeight: "20vh" }}/>
                    <h3 className="navbar-nav text-white">You Can Add Your Collections Here!</h3>
                    <div className="navbar-nav px-5">
                        <Link to="/home" className="nav-link active text-white">Home</Link>
                        <Link to="/collections" className="nav-link text-white">Show-Collection</Link>
                        <Link to="/collections/add" className="nav-link text-white">Add-Collection</Link>
                        <Link to="/about" className="nav-link text-white">About Us</Link>
                    </div>
                </div>
            </nav>
            <div className="container mt-4 flex-grow-1">
                <Outlet/>
            </div>
            <footer className="bg-dark text-center text-white mt-3">
                <div className="container p-4 mb-2">
                            &copy; 2024 By, Rutvik Bhagiya.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
