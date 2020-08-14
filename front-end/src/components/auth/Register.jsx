import React, { useState, useContext } from 'react';
import alertContext from '../../context/alert/alertContext';
import * as Joi from 'joi-browser';
import authContext from '../../context/auth/authContext';
import { useEffect } from 'react';

const initalState = {
    name: '',
    email: '',
    password: '',
    password2: ''
}

const schame = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    password2: Joi.string().required()
})


const Register = (props) => {

    const [user, setUser] = useState(initalState);

    const { setAlert } = useContext(alertContext);
    const { register, error, clearError, isAuthenticated } = useContext(authContext);

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

    const { name, email, password, password2 } = user;

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
            register({ name, email, password });
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
            <h4 className="text-primary text-center my-3">Register User</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control" id="email" placeholder="Email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" className="form-control" id="password2" placeholder="Password" name="password2" value={password2} onChange={onChange} />
                </div>

                <button className="btn btn-primary btn-sm" type="submit">Register</button>

            </form>
        </>
    );
}

export default Register;