import React, { useState } from "react";

const Navbar = () => {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const profileClicked = () => {
    setIsProfileClicked(!isProfileClicked);
  };
  const openDashboard = () => {
    const html = document.getElementById("html");
    html.classList.add("layout-menu-expanded");
  };
  return (
    <>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-4" href="#">
            <i className="bx bx-menu bx-sm" onClick={openDashboard}></i>
          </a>
        </div>
        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search fs-4 lh-0"></i>
              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Cari Produk..."
                aria-label="Search..."
              />
            </div>
          </div>
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className={
                  "nav-link dropdown-toggle hide-arrow" +
                  (isProfileClicked ? " show" : "")
                }
                href="#"
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                    onClick={profileClicked}
                    src={
                      window.location.origin +
                      "/components/assets/img/avatars/6.png"
                    }
                    alt={"true"}
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </a>
              <ul
                className={
                  "dropdown-menu dropdown-menu-end" +
                  (isProfileClicked ? " show" : "")
                }
                data-bs-popper={isProfileClicked ? "none" : ""}
              >
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img
                            src={
                              window.location.origin +
                              "/components/assets/img/avatars/6.png"
                            }
                            alt={"true"}
                            className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">
                          Clara Yanita
                        </span>
                        <small className="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="auth-login-basic.html">
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
