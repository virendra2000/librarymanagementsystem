import { MdFormatColorText, MdLocalLibrary } from "react-icons/md";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({ 
        email: 'dhirajkalwar57@gmail.com', 
        password: 'Dhiraj@2000',
        username: 'Dhiraj Kalwar'
     });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if(userData.email === 'dhirajkalwar57@gmail.com' && userData.password === 'Dhiraj@2000') {
            toast.success('Login Successful!', {
                position: toast.POSITION.TOP_CENTER,
                className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
            });
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/');
        } else {
            toast.error('Invalid Credentials', {
                position: toast.POSITION.TOP_CENTER,
                className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
            });
        }
    };

    return (
        <>
            <div className="home flex flex-col items-center justify-center h-screen">
                <ToastContainer />
                <MdLocalLibrary color="#2fd911" size="100"/>
                <h1 className="text-4xl font-bold">Welcome to the Library Management System</h1>

                <div className="login flex mt-5 flex-col items-center justify-center p-5 bg-gray-100">
                    <h2 className="text-2xl font-semibold">User Login</h2>
                    <form onSubmit={handleLogin} className="mt-2 flex flex-col gap-2 items-center">
                        <input
                            type="email"
                            placeholder="Username"
                            value={userData.email}
                            onChange={handleInputChange}
                            name="email"
                            className="w-full pl-12 p-4 border-none rounded-lg bg-slate-300 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleInputChange}
                            name="password"
                            className="w-full pl-12 p-4 border-none rounded-lg bg-slate-300 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            type="submit"
                            className="p-4 w-full bg-green-400 text-white rounded-md cursor-pointer transition duration-200"
                        >
                            Login
                        </button>

                        <span>
                            Don't have an account? <a href="/registration" className="font-bold text-green-400 hover:underline">Register</a>
                        </span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;