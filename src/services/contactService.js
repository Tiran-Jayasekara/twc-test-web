import { GlobalContext } from '@/context';
import axios from 'axios';
import React, { useContext } from 'react'

const contactService = () => {
    const { token } = useContext(GlobalContext);

    const http = axios.create({
        baseURL: 'http://localhost:3001',

        headers: {
            "Content-type": "application/json",
            "auth-token": token,
        },
    });


    // Check User already has contacts or Not
    const checkUserContacts = async () => {
        try {
            const userContacts = await http.get('/contact/userContact');
            return userContacts;
        } catch (error) {
            throw error;
        }
    }

    // Add New Contact
    const addContact = async (formData) => {
        try {
            const addContactData = await http.post("/contact/addContact", formData);
            return addContactData
        } catch (error) {
            throw error;
        }
    }

    // Get Contact By User
    const getContactsByUser = async () => {
        try {
            const Contacts = await http.get("/contact/getContact");
            return Contacts;
        } catch (error) {
            throw error
        }
    }

    // Update Contact
    const updateContact = async (updateDataForm) => {
        try {
            const updateData = await http.put("/contact/updateContact", updateDataForm);
            return updateData;
        } catch (error) {
            throw error
        }
    }

    // Delete Contact
    const deleteContact = async (contactId) => {
        try {
            const deleteContact = await http.delete("/contact/deleteContact/" + contactId);
            return deleteContact;
        } catch (error) {
            throw error;
        }
    }
    return {
        checkUserContacts,
        addContact,
        getContactsByUser,
        updateContact,
        deleteContact
    }
}

export default contactService