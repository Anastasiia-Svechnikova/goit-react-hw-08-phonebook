import React, { useState } from "react";

import s from "./form.module.css";
import { Button } from "../../shared/Button";
import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk } from "store/contacts/thunk.contacts";
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { selectAllContacts } from "store/selectors";


export const Form =()=> {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const contacts = useSelector(selectAllContacts)
    const dispatch = useDispatch();

    const onInputChange = e => {
        switch (e.currentTarget.name) {
            case 'name':
                setName(e.currentTarget.value);
                break;
            case 'number':
                setNumber(e.currentTarget.value);
                break;
            default:
                console.log(e.currentTarget.name + ' is not a valid value');
        }
    }
    
    const onFormSubmit = e => {
        e.preventDefault();
        const newContact = { name, number };
        
        if (contacts.some(({ name }) => name === newContact.name)) {
            alert(`${newContact.name} is already in contacts!`);
            return;
        }
        dispatch(addContactThunk(newContact))
        formReset();
    }
    const formReset = () => {
        setName('');
        setNumber('');
    }

    return (          
            <div className={s.wrapper}><form className={s.form} onSubmit={onFormSubmit}>  
                <label className={s.label}>
                    Name 
                    <input onChange={onInputChange}
                        value={name}
                        className={s.input}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </label>
                <label className={s.label}>
                    Number 
                    <input
                        onChange={onInputChange}
                        value={number}
                        className={s.input}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
                <Button type="submit" secondary ><BsFillPersonPlusFill/> Add contact</Button>
        </form></div>
    )
}






