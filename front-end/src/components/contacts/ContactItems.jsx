import React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactItems = ({ contact }) => {
    const { name, id, phone, email, type } = contact;

    const { deleteContact, setCurrent, clearCurrent } = useContext(contactContext);

    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    }
    return (

        <div className="card my-2">
            <div className="card-body bg-light">
                <h5>
                    {name}
                    <span
                        style={{ float: 'right' }} className={"mx-2 badge badge-sm " + (type === 'professional' ? 'badge-success' : 'badge-primary')}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                </h5>
                <ul className="list-group">
                    {email &&
                        <li className="list-group-item">
                            <i className="fa fa-envelope-open mx-2"></i> {email}
                        </li>
                    }
                    {phone &&
                        <li className="list-group-item">
                            <i className="fa fa-phone mx-2"></i> {phone}
                        </li>
                    }
                </ul>
                <p className="my-2">
                    <button className="btn btn-dark btn-sm mx-2" onClick={() => setCurrent(contact)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
                </p>
            </div>
        </div>

    );
}

ContactItems.prototype = {
    constact: PropTypes.object.isRequired
}

export default ContactItems;