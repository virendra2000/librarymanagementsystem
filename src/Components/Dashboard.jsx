import Navbar from "./Navbar";
import React, { useState , useEffect } from "react";
import { GiBlackBook } from "react-icons/gi";
import { GiArchiveResearch } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import { ImBook } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email:'',
        password:'',
        username:''
    });
    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            console.log(userData);
        }
        else {
            navigate('/');
        }
    }, [navigate]);
    return (
        <>
            <div className="dashboard h-screen flex flex-col bg-slate-100">
                <Navbar/>
                <div className="p-5">
                    <h1 className="text-3xl font-bold">Dashboard</h1>

                    <div className="cards mt-5 p-4 flex flex-row gap-2">
                        <div className="card-box p-5 gap-4 flex flex-col items-center justify-center bg-white shadow-md shadow-gray-400 rounded-lg">
                            <GiBlackBook size="40"/>
                            <span className="text-xl font-bold">Add Book</span>
                        </div>
                        <div className="card-box p-5 gap-4 flex flex-col items-center justify-center bg-white shadow-md shadow-gray-400 rounded-lg">
                            <GiArchiveResearch size="40"/>
                            <span className="text-xl font-bold">Search Book</span>
                        </div>
                        <div className="card-box p-5 gap-4 flex flex-col items-center justify-center bg-white shadow-md shadow-gray-400 rounded-lg">
                            <GiBookCover size="40"/>
                            <span className="text-xl font-bold">Book Withdraw</span>
                        </div>
                        <div className="card-box p-5 gap-4 flex flex-col items-center justify-center bg-white shadow-md shadow-gray-400 rounded-lg">
                            <ImBook size="40"/>
                            <span className="text-xl font-bold">Book Withdraw</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Dashboard;