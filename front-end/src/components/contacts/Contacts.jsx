import React, { useContext, useEffect, useState } from 'react';
import contactContext from '../../context/contact/contactContext';
import ContactItems from './ContactItems';
import alertContext from '../../context/alert/alertContext';

const Contacts = () => {

    const { contacts, filtered, getContacts, error } = useContext(contactContext);
    const { setAlert } = useContext(alertContext);

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (filtered) {
            setItems(filtered);
        } else {
            setItems(contacts)
        }
    }, [filtered, contacts]);

    useEffect(() => {
        getContacts();

        if (error) {
            setAlert(error, 'danger')
        }

        // eslint-disable-next-line
    }, [error]);


    return (
        <>
            {
                items.length !== 0
                    ?
                    items.map(
                        contact => (
                            <ContactItems
                                key={contact._id}
                                contact={contact}
                            />
                        )
                    )
                    :
                    <h4 className="text-primary text-center my-3">No Contacts Found!</h4>

            }
        </>
    );
}

export default Contacts;