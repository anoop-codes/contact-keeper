import React, { useReducer } from 'react';
import contactContext from './contactContext';
import contactReducer from './contact-reducer';
import axios from 'axios';
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACT } from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //add contact
    const addContact = async (contact) => {
        const congif = {
            headers: {
                'Content-Type': 'application/json '
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/contacts', contact, congif);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data
            })
        }
    }

    const getContacts = async () => {

        try {
            const res = await axios.get('http://localhost:5000/api/contacts');
            dispatch({
                type: GET_CONTACT,
                payload: res.data
            })
        } catch (error) {

            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data
            })
        }
    }

    const updateContact = (contact) => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        })
    }

    const deleteContact = (id) => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    }

    const setCurrent = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    const filterContact = (text) => {
        dispatch({
            type: FILTER_CONTACT,
            payload: text
        })
    }


    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }






    return (
        <contactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            updateContact,
            clearCurrent,
            filterContact,
            clearFilter,
            getContacts,
            dispatch
        }}>
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;

