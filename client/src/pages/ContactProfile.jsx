
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useContact } from '../context/contactContext';
import ContactForm from "../components/ContactForm.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
const ContactProfile = () => {
    const mockContact = {
        id: 1,
        firstName: "Hone",
        lastName: "",
        email: "ag@gmail.com",
        phoneNumber: "12345",
        notes: "asdg",
    };
    const { selectedContact } = useContact();
    const { id } = useParams();
    const [showForm, setShowForm] = useState(false);
    const initial = selectedContact.first_name?.[0]?.toUpperCase() || "?";

    return (

        <div className='bg-[#edf6f5] mx-auto max-w-[500px] font-medium '>

            <div className="">
                <Link to='/dashboard'>
                    <button><IoMdArrowRoundBack className="text-xl" /> Back</button>
                </Link>
            </div>

            {/* Card */}

            <div className='rounded-[28px] border bg-[#edf6f2] mb-6 flex items-center gap-5'>
                <div className='flex flex h-18 w-18 items-center justify-center text-black'>
                    {initial}
                </div>

                <div className=''>
                    <h1 className="text-3xl font-bold text-black">{selectedContact.first_name} {selectedContact.last_name}</h1>
                    <p className="text-base font-medium text-black">
                        💝 Contact Details
                    </p>
                </div>
            </div>

            {/* Info blocks */}
            <div className="space-y-4">
                <div>
                    <p>Email</p>
                    <p>{selectedContact.email || "No email"}</p>
                </div>

                <div>
                    <p className="text-sm font-semibold text-[#10b7a5]">Phone</p>
                    <p className="text-xl font-semibold text-slate-700">
                        {selectedContact.phone_number || "No phone number"}
                    </p>
                </div>

                <div>
                    <p className="text-sm font-semibold text-[#10b7a5]">Notes</p>
                    <p className="mt-3 text-xl text-slate-700">
                        {selectedContact.notes || "No notes"}
                    </p>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <button onClick={() => setShowForm(true)}
                    className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-[#ff9b9b]">
                    <RiEdit2Line /> Edit</button>
                <button className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-[#ff9b9b]"
                ><RiDeleteBin5Line className="text-xl" /> Delete</button>
            </div>
            {showForm && (
                <ContactForm closeForm={() => setShowForm(false)}
                    initialData={selectedContact}
                    mode="edit" />
            )}
        </div >
    )


}

export default ContactProfile;