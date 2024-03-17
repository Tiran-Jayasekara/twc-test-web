'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import contactService from '@/services/contactService'
import LogOut from '../components/LogOut'



const showAllContacts = () => {
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedData, setEditedData] = useState();
    const [deleteModal, setdeleteModal] = useState(false);
    const [deleteMessage, setdeleteMessage] = useState(false);
    const [ContactName, setContactName] = useState();
    const [successModal, setSuccessModal] = useState(false);
    const [deleteContactId, setDeleteContactId] = useState();
    const [contacts, setContacts] = useState();

    const router = useRouter();
    const { getContactsByUser, updateContact, deleteContact } = contactService();

    // Edit Contact Data
    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedData(contacts[index]);
    };

    useEffect(() => {
        gettAllContacts();
    }, [])


    // Get All Contacts
    const gettAllContacts = async () => {
        const resData = await getContactsByUser();
        setContacts(resData.data.AllContactsByUser)
    }

    // Update Contact
    const handleSave = async () => {
        const updateData = await updateContact(editedData);

        if (updateData.data.message === "Update Success") {
            gettAllContacts();
            setEditingIndex(-1);
            setSuccessModal(true)
            setEditedData({
                fullName: '',
                gender: '',
                email: '',
                number: ''
            });
        } else {
            alert(updateData.data.message);
        }
    };

    // Delete Contact
    const ContactDelete = async () => {
        const resData = await deleteContact(deleteContactId);
        if (resData.data.message === "Contact Delete Success") {
            setdeleteMessage(true);
            gettAllContacts();
        } else {
            alert("Delete Unsuccess");
        }
    }



    return (
        <div className='flex flex-col bg-custom rounded-tr-[0px] h-screen text-white '>
            {/* Top Right Corner*/}
            <div className="absolute top-0 right-0">
                <Image src='/assets/topRight.png' alt='topright' width={200} height={100} className='' />
            </div>
            {/* Bottom Left Corner */}
            <div className="absolute bottom-0 left-0 rounded-tr-full">
                <Image src='/assets/bottomLeft.png' alt='bottomleft' width={200} height={100} className='' />
            </div>
            <div className='ml-72 xl:mt-14 mt-14'>
                <Image src='/assets/Logo.png' alt='logo' width={80} height={70} />
                <p className='font-bold text-3xl'>contacts</p>
                <p className='text-2xl'>portal</p>

                <div className='w-[800px] xl:w-[1000px] mr-10'>
                    <div className='flex flex-row justify-between items-center'>
                        <p className='text-white font-futura-md-bt font-bold text-[34px] mt-10 xl:mt-24'>Contacts</p>
                        <button onClick={() => { router.push('/contacts/new') }} className='border border-b-2 rounded-2xl px-6 py-1 ml-20 mt-14 xl:mt-24'>add new contact</button>
                    </div>


                    {/* Show and Edit Form */}
                    <div className='bg-white mt-4 w-full rounded-2xl py-4 px-6 text-left h-[240px] xl:h-[250px] overflow-y-auto'>
                        <div className="flex flex-row text-custom font-bold text-sm justify-between text-left items-center">
                            <div className='w-10'></div>
                            <div className='w-28'>full name</div>
                            <div className='w-10 mr-10'>gender</div>
                            <div className='w-52'>e-mail</div>
                            <div className='w-28'>phone number</div>
                            <div className='w-20'></div>
                        </div>

                        {contacts ? contacts.map((data, index) => (
                            <div key={index} className="flex flex-row text-custom mt-4 text-sm justify-between text-left items-center">

                                {/* Person Image */}
                                <div className='w-10'><Image src='/assets/person.png' width={40} height={10} alt='person' /></div>

                                {/* FullName */}
                                <div className='w-32'>{editingIndex === index ? <input className='w-[120px] xl:w-[150px]' type="text" value={editedData.fullName} onChange={(e) => setEditedData({ ...editedData, fullName: e.target.value })} /> : data.fullName}</div>

                                {/* Gender */}
                                <div className='w-10 mr-10'>{editingIndex === index ? <div className='flex flex-row'>
                                    <input className='w-[50px] xl:w-[80px]' type="text" value={editedData.gender} />
                                    <Image src='/assets/swap.png' className='cursor-pointer' onClick={() => {
                                        const newGender = editedData.gender === 'male' ? 'female' : 'male';
                                        setEditedData({ ...editedData, gender: newGender });
                                    }} width={20} height={20} alt='swap' />
                                </div> : data.gender}</div>

                                {/* Email */}
                                <div className='w-52'>{editingIndex === index ? <input className='w-[230px] xl:w-[250px]' type="text" value={editedData.email} onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} /> : data.email}</div>

                                {/* Number */}
                                <div className='w-28'>{editingIndex === index ? <input className='w-[120px] xl:w-[160px]' type="text" value={editedData.number} onChange={(e) => setEditedData({ ...editedData, number: e.target.value })} /> : data.number}</div>

                                {/* Edit And Delete Button */}
                                <div className='flex flex-row w-20'>
                                    {editingIndex === index ? <button onClick={() => handleSave()} className='bg-custom text-white p-2 px-6 rounded-3xl ml-0'>Save</button> : <Image onClick={() => handleEdit(index)} src='/assets/edit.png' className='mx-4 cursor-pointer' alt='edit' width={20} height={20} />}
                                    {editingIndex === index ? null : <Image onClick={() => {
                                        setdeleteModal(true),
                                            setContactName(data.fullName),
                                            setDeleteContactId(data._id);
                                    }}
                                        src='/assets/delete.png' alt='delete' className='cursor-pointer' width={20} height={20} />}

                                </div>
                            </div>
                        )) : "No Contacts"}
                    </div>
                </div>
                <LogOut />
            </div>


            {/* Delete Contact PopUp Model */}
            {deleteModal &&
                <>
                    <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50'></div>
                    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'>
                        <div className='bg-white rounded-2xl p-6 flex flex-col px-20'>
                            <p className='text-custom font-futura-md-bt font-semibold'>Do you want to delete the contact “{ContactName}”?</p>
                            <div className='flex flex-row items-center justify-center mx-auto'>
                                <button onClick={() => (setdeleteModal(false), ContactDelete())} className='bg-custom p-1 mt-4 rounded-3xl px-6 text-white'>Yes</button>
                                <button onClick={() => setdeleteModal(false)} className='p-1 text-custom border-2 border-custom font-semibold mt-4 rounded-3xl px-4 ml-2 mx-auto items-center'>Cancel</button>
                            </div>

                        </div>
                    </div>
                </>
            }

            {/* Delete Contact Responce Model (Success or Unsuccess) */}
            {deleteMessage &&
                <>
                    <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50'></div>
                    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'>
                        <div className='bg-white rounded-2xl p-6 flex flex-col px-20'>
                            <p className='text-custom font-futura-md-bt font-semibold'>Your contact has been deleted successfully!</p>
                            <div className='flex flex-row items-center justify-center mx-auto'>
                                <button onClick={() => setdeleteMessage(false)} className='bg-custom p-1 mt-4 rounded-3xl px-6 text-white'>Okay</button>

                            </div>

                        </div>
                    </div>
                </>
            }

            {/* Contact Update Responce Model (Success) */}
            {successModal &&
                <>
                    <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50'></div>
                    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'>
                        <div className='bg-white rounded-2xl p-6 flex flex-col px-20'>
                            <p className='text-custom font-futura-md-bt font-semibold'>Your contact has been saved successfully!</p>
                            <button onClick={() => setSuccessModal(false)} className='bg-custom p-1 mt-4 rounded-3xl px-6 text-white mx-auto items-center'>Okay</button>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default showAllContacts