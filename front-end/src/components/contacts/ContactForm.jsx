import React, { useContext, useState } from 'react';
import contactContext from '../../context/contact/contactContext';
import { useEffect } from 'react';

const initialState = {
    name: '',
    email: '',
    phone: '',
    type: 'personal'
}

const ContactForm = () => {

    const { addContact, current, clearCurrent, updateContact } = useContext(contactContext)

    const [contact, setContact] = useState(initialState);

    useEffect(() => {
        if (current)
            setContact(current)
        else
            setContact(initialState)

    }, [current])

    const onChange = ($event) => {
        setContact({ ...contact, [$event.target.name]: $event.target.value })
    }

    const handleSubmit = ($event) => {
        $event.preventDefault();

        if (!current) {
            addContact(contact);
        } else {
            updateContact(contact);
            clearCurrent();
        }
        setContact(initialState)
    }

    const onClear = () => {
        clearCurrent()
        //..
    }

    const { name, email, phone, type } = contact;
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h4 className="text-primary text-center my-3">{current ? 'Edit Contact' : 'Add Contact'}</h4>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control" id="email" placeholder="Email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" className="form-control" id="phone" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" id="personal" value="personal" checked={type === 'personal'} onChange={onChange} />
                        <label className="form-check-label" htmlFor="personal">Personal</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" id="professional" value="professional" checked={type === 'professional'} onChange={onChange} />
                        <label className="form-check-label" htmlFor="professional">Professional</label>
                    </div>
                </div>


                <button className={"btn btn-sm m-2 " + (current ? "btn-info" : "btn-primary")} type="submit">{current ? 'Update Contact' : 'Add Contact'}</button>
                {current && <button className="btn btn-danger btn-sm" onClick={onClear} type="button">Clear Contact</button>}

            </form>
        </>
    );
}

export default ContactForm;