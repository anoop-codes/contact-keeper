import React, { useContext } from 'react';
import contactContext from '../../context/contact/contactContext';
import { useRef, useEffect } from 'react';

const ContactFiltered = () => {
    const { filterContact, clearFilter, filtered } = useContext(contactContext);

    const textRef = useRef('');

    useEffect(() => {
        if (!filtered) {
            textRef.current.value = ''
        }
    }, [filtered])

    const handleChange = (e) => {
        if (textRef.current.value) {
            filterContact(e.target.value)
        } else {
            clearFilter()
        }
    }

    return (
        <div className="form-group my-2">
            <input type="text" className="form-control" placeholder="filer contacts...." ref={textRef} onChange={handleChange} />
        </div>
    );
}

export default ContactFiltered;