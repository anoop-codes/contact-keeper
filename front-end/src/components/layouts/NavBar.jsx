import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const NavBar = ({ title, icon }) => {

    const { isAuthenticated, logout, user } = useContext(authContext);


    const onLogout = () => {
        logout()
    }

    const authLink = (
        <>
            <li>
                Hello <span className="m-1"> <strong>{user && user.name}</strong></span>
            </li>
            <li onClick={onLogout} className="mx-2">
                <i className="fa fa-sign-out"></i>
                <span className="hide-sm">Logout</span>
            </li>
        </>
    )


    const guestLink = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item  mx-2">
                <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
        </>
    )

    return (
        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand">
                <i className={icon} />
                {title}
            </span>

            <ul className="navbar-nav" style={{ flexDirection: 'row' }}>
                {isAuthenticated ? authLink : guestLink}
            </ul>

        </nav>
    );
}

NavBar.defaultProps = {
    title: 'Contact keeper',
    icon: 'fa fa-id-card mx-2'
}

NavBar.prototype = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

export default NavBar;