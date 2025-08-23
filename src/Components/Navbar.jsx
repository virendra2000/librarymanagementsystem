import React, { useState , useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdLocalLibrary } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5"; // Importing the login icon
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
        useEffect(() => {
            const storedUserData = localStorage.getItem('user');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        }, []);
    const callLogoutPage = async () => {
        toast.success('Logout Successfully!', {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: false,
            className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
        });
        localStorage.removeItem('user');
        setUserData(null);
        navigate('/');
    };
    const callLoginPage = () => {
        navigate('/login');
    };
    return (
        <>
            <nav className="bg-slate-100 p-4 shadow-md shadow-gray-300 w-full flex flex-row justify-between">
                <span className="text-2xl font-semibold flex flex-row gap-2">
                    <MdLocalLibrary color="#2fd911" size="40"/>
                    <span>Library Management System</span>
                </span>
                <div className="flex flex-row gap-2 items-center justify-between">
                    {userData ? (
                        <>
                            <FaUserCircle size="40"/>
                            <span>{userData ? userData.username : ''}</span>
                            <span onClick={callLogoutPage} className="flex flex-row items-center gap-1 cursor-pointer">
                                <IoLogOutOutline size="30"/>
                            </span>
                        </>
                    ) : (
                        <span onClick={callLoginPage} className="flex px-6 py-3 rounded-md cursor-pointer bg-green-400">
                            <span>Login</span>
                        </span>
                    )}
                </div>
            </nav>
            <ToastContainer />
        </>
    );
};

export default Navbar;