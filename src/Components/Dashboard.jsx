import Navbar from "./Navbar";
import React, { useState } from "react";
import { GiBlackBook } from "react-icons/gi";
import { GiArchiveResearch } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import { ImBook } from "react-icons/im";
const Dashboard = () => {
        const [userData, setUserData] = useState({ 
            email: 'dhirajkalwar57@gmail.com', 
            username: 'Dhiraj Kalwar'});
    return (
        <>
            <div className="dashboard h-screen flex flex-col bg-slate-100">
                <Navbar userData={userData}/>
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
