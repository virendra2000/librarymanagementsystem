import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { GiBlackBook, GiArchiveResearch, GiBookCover } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Reports = () => {
    const navigate = useNavigate();
    
    
    const [todaysReturns, setTodaysReturns] = useState([]);
    const [genreCounts, setGenreCounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        const response = await axios.get("http://localhost:8080/api/booktoreturn")

        if(response.data) {
            setTodaysReturns(response.data)
        }

        const response2 = await axios.get("http://localhost:8080/api/genrewisecount")
        if(response2.data) {
            setGenreCounts(response2.data)
        }
    }

    useEffect(() => {
        setLoading(true);
        
        fetchReports()

            

        setLoading(false);
        
    }, []);

    if (loading) {
        return <p className="text-center mt-20">Loading reports...</p>;
    }

    return (
        <>
            <div className="dashboard h-screen flex flex-col bg-slate-100">
                <Navbar />
                <div className="p-5 flex flex-col md:flex-row gap-8 flex-1">
                    {/* Section 1: Today's Returns */}
                    <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-center mb-4">Today's Returns</h2>
                        {todaysReturns.length > 0 ? (
                            <ul className="space-y-4">
                                {todaysReturns.map((item, index) => (
                                    <li key={index} className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
                                        <GiBlackBook size={24} className="text-gray-600" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{item.bookName}</p>
                                            
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500 mt-8">No books are due for return today.</p>
                        )}
                    </div>

                    {/* Section 2: Genre Report */}
                    <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-center mb-4">Books by Genre</h2>
                        {genreCounts.length > 0 ? (
                            <ul className="space-y-4">
                                {genreCounts.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <GiBookCover size={24} className="text-gray-600" />
                                            <p className="font-semibold text-gray-800">{item.genre}</p>
                                        </div>
                                        <span className="text-xl font-bold text-gray-700">{item.count}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500 mt-8">
                                No genre data available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reports;