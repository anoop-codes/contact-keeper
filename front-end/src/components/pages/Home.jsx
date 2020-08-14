import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFiltered from '../contacts/ContactFiltered';
import authContext from '../../context/auth/authContext';

const Home = () => {
    const { loadUser } = useContext(authContext);

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line 
    }, [])

    return (
        <div className="row">
            <div className="col-md-6">
                <ContactForm />
            </div>
            <div className="col-md-6">
                <ContactFiltered />
                <Contacts />
            </div>
        </div>
    );
}

export default Home;