import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../../images/logo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = ({ user, setUser }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);

  const handleLogout = async (e) => {
    const response = await fetch("/logout", {
      method: "DELETE",
    });

    if (response.ok) {
      setUser(null);
    }
  };

  const navItems = [
    { to: "/", text: "Home" },
    { to: "about", text: "About" },
    { to: "books", text: "Books" },
  ];

  const authItems = user
    ? [{ onClick: handleLogout, text: "Log out" }]
    : [
        { to: "login", text: "Log in" },
        { to: "signup", text: "Sign up" },
      ];

  return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-content flex">
        <div className="brand-and-toggler flex flex-sb">
          <Link to="/" className="navbar-brand flex">
            <img src={logoImg} alt="site logo" />
            <span className="text-uppercase fw-7 fs-20 ls-1">bookhub</span>
          </Link>
          <button
            type="button"
            className="navbar-toggler-btn"
            onClick={handleNavbar}
          >
            <HiOutlineMenuAlt3
              size={30}
              style={{
                color: toggleMenu ? "#fff" : "#010101",
              }}
            />
          </button>
        </div>

        <div
          className={`navbar-collapse ${
            toggleMenu ? "show-navbar-collapse" : ""
          }`}
        >
          <ul className="navbar-nav">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={item.to}
                  className="nav-link text-uppercase text-white fs-14 fw-6 ls-1"
                >
                  {item.text}
                </Link>
              </li>
            ))}

            {authItems.map((item, index) => (
              <li key={`auth-${index}`} className="nav-item">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="nav-link text-uppercase text-white fs-14 fw-6 ls-1"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <a
                    onClick={item.onClick}
                    className="nav-link text-uppercase text-white fs-14 fw-6 ls-1 cursor-pointer"
                  >
                    {item.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
