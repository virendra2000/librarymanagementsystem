import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const BookDeposit = () => {
    const navigate = useNavigate();
    const [userData] = useState({ 
            userEmail: 'dhirajkalwar57@gmail.com',
            password: 'Dhiraj@2000',
            userId: 'user1',
            name: 'Dhiraj Kalwar',
            mobileNo: '7977223126',
    });
    const [userTransactions, setUserTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUserTransaction =  async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/gettransaction",{
                withCredentials:true,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })           // api call for getting all users transaaction 

            if(response.data) {
                console.log(response.data)
                setUserTransactions(response.data)
            }else {
                toast.error('Server Issue', {
                autoClose: 5000,
                className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
            });
            }
        } catch (error) {
            navigate('/login');
            
        }
    }

    useEffect(() => {
            setLoading(true);
            getUserTransaction()
            setLoading(false);
        
    }, []);

    const handleReturnBook = async (transactionId) => {

        try {
            const response = await axios.post(`http://localhost:8080/api/returnbook/${transactionId}`,{},{
            withCredentials:true,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })    // api for returing books that user borrow

        if(response.data) {
            toast.success('Book returned successfully!', {
                autoClose: 2000,
                className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
            });
            setTimeout(() => {
                window.location.reload()
            },2200)
        }else {
                toast.error('Server Issue', {
                autoClose: 5000,
                className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
            });
        }
        } catch (error) {
            navigate('/login');
        }
        
    };

    if (loading) {
        return <p className="text-center mt-20">Loading your transactions...</p>;
    }

    return (
        <>
            <ToastContainer autoClose={5000} position="top-center" />
            <div className="dashboard h-screen flex flex-col bg-slate-100">
                <Navbar userData={userData}/>
                <div className="p-5">
                    <h1 className="text-3xl text-center font-bold">Your Lent Books</h1>

                    <div className="cards mt-5 p-4 flex flex-col items-center justify-center gap-2">
                        {userTransactions.length > 0 ? (
                            <div className="overflow-x-auto w-full max-w-2xl bg-white rounded-lg shadow-lg">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-green-500 text-left text-xs font-semibold uppercase tracking-wider text-slate-900">
                                            <th className="px-6 py-3 border-b-2 border-gray-200">Book Name</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-200">Expected Return</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-200 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userTransactions.map(transaction => (
                                            <tr key={transaction.tId} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap border-b text-sm font-medium text-gray-900">{transaction.bookName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap border-b text-sm text-gray-500">{transaction.rdate}</td>
                                                <td className="px-6 py-4 whitespace-nowrap border-b text-center text-sm">
                                                    <button 
                                                        onClick={() => handleReturnBook(transaction.tid)}
                                                        className="bg-green-400 text-slate-950 px-4 py-2 rounded-full hover:bg-green-600 cursor-pointer transition-colors"
                                                    >
                                                        Return
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No books currently lent by you.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default BookDeposit;