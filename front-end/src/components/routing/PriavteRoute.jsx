import React, { useContext } from 'react';
import authContext from '../../context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const PriavteRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated, loading } = useContext(authContext);

    return (
        <Route {...rest} render={(props) => (!isAuthenticated && !loading) ?
            <Redirect to="/login" />
            :
            <Component {...props} />
        } />
    );
}

export default PriavteRoute;