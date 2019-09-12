import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ComicContext from "../../context/comic/comicContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const comicContext = useContext(ComicContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearComics } = comicContext;

  const onLogout = () => {
    logout();
    clearComics();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name} </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-door-open'></i>{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-dark'>
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: " Contact Vault",
  icon: "fas fa-book-dead"
};

export default Navbar;
