import { ADD_CONTACT, CONTACT_ERROR, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, GET_CONTACT } from "../types";

const contactReducer = (state, action) => {
    switch (action.type) {

        case GET_CONTACT:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }


        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
                loading: false
            }
        case UPDATE_CONTACT:
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            state.contacts[index] = action.payload;
            return {
                ...state,
                loading: false
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
                loading: false
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }

        case FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex) || contact.type.match(regex);
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state
    }
}

export default contactReducer;