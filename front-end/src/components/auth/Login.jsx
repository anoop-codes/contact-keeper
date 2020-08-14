import React, { useState, useEffect, useContext } from 'react';
import alertContext from '../../context/alert/alertContext';
import * as Joi from 'joi-browser';
import authContext from '../../context/auth/authContext';

const initalState = {
    email: '',
    password: ''
}

const schame = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const Login = (props) => {
    const [user, setUser] = useState(initalState);

    const { setAlert } = useContext(alertContext);
    const { login, error, clearError, isAuthenticated } = useContext(authContext);

    useEffect(() => {
        if (error) {
            setAlert(error, 'danger');
            clearError();
        }

        if (isAuthenticated) {
            props.history.push('/')
        }

        // eslint-disable-next-line 
    }, [error, isAuthenticated])

    const { email, password } = user;

    const onChange = ($event) => {
        setUser({ ...user, [$event.target.name]: $event.target.value })
    }

    const handleSubmit = ($event) => {
        $event.preventDefault();

        const errors = validateSubmit();

        if (errors) {
            Object.keys(errors).forEach(name => {
                setAlert(errors[name], 'danger')
            })
        } else {
            login(user);
            setUser(initalState);
        }

    }

    const validateSubmit = () => {
        const errorMsgs = {};

        const errorDetials = schame.validate(user, { abortEarly: false })

        errorDetials.error && errorDetials.error.details.forEach(error => {
            errorMsgs[error.path] = error.message
        });

        return Object.keys(errorMsgs).length > 0 ? errorMsgs : null;
    }

    return (
        <>
            <h4 className="text-primary text-center my-3">Login User</h4>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control" id="email" placeholder="Email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={password} onChange={onChange} />
                </div>

                <button className="btn btn-primary btn-sm" type="submit">Login</button>

            </form>
        </>
    );
}

export default Login;