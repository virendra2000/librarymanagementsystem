import React, { useState , useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdLocalLibrary } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const Navbar = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const callLogoutPage = async () => {
        sessionStorage.removeItem('token');
        toast.success('Logout Successfully!', {
            autoClose: 5000,
            hideProgressBar: false,
            className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
        });
        setTimeout(() => {
            navigate('/login');
        }, 5000); 
    };
    const callLoginPage = () => {
        navigate('/login');
    };
    const callHomePage = () => {
        navigate('/');
    };

    useEffect(() => {
        
        const checkLogin = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/getuser", {
              withCredentials: true, 
              headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`  // <-- send JWT here
              }
            });
            console.log(response.data)
            setUserData(response.data); 
          } catch (err) {
            console.log(err)
            setUserData(null); 
          } finally {
            setLoading(false)
          }
        };
    
        checkLogin();
    
    
      }, []);

    return (
        <>
            <nav className="bg-slate-100 p-4 shadow-md shadow-gray-500 w-full flex flex-row justify-between">
                <span className="text-2xl font-semibold flex flex-row gap-2">
                    <MdLocalLibrary color="#2fd911" size="40"/>
                    <span>Library Management System</span>
                </span>
                <div className="flex flex-row gap-2 items-center justify-between">
                    {!loading ? (
                        userData ? (
                            <>
                                <FaUserCircle size="40" />
                                <span>{userData.name}</span>
                                <span
                                    onClick={callLogoutPage}
                                    className="flex flex-row items-center gap-1 cursor-pointer"
                                >
                                    <IoLogOutOutline size="30" />
                                </span>
                            </>
                        ) : (
                            <span
                                onClick={callLoginPage}
                                className="flex px-6 py-3 rounded-md cursor-pointer bg-green-400"
                            >
                                <span>Login</span>
                            </span>
                        )
                    ) : (
                            <p></p>
                        )}
                    
                </div>
            </nav>
            <ToastContainer />
        </>
    );
};

export default Navbar;