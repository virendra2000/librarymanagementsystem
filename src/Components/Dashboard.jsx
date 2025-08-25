import Navbar from "./Navbar";
import React, { useState , useEffect } from "react";
import { GiBlackBook } from "react-icons/gi";
import { GiArchiveResearch } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { TbReport } from "react-icons/tb";
import axios from "axios";
const Dashboard = () => {
    const navigate = useNavigate();
    const addBook = () => {
        navigate('/addbook');
    }
    const searchBook = () => {
        navigate('/search');
    }
    const bookDepositPage = () => {
        navigate('/book/return');
    }
    const reportpage = () => {
        navigate('/reports');
    }
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    
    // const checkLogin = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:8080/api/getuser", {
    //       withCredentials: true, 
    //       headers:{
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${sessionStorage.getItem('token')}`  // <-- send JWT here
    //       }
    //     });
    //     console.log(response.data)
    //     setUserData(response.data); 
    //   } catch (err) {
    //     console.log(err)
    //     setUserData(null); 
    //   } finally {
    //     setLoading(false); 
    //   }
    // };

    // checkLogin();


  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>; // optional loading state
  }
    return (
        <>
            <div className="dashboard h-screen flex flex-col bg-slate-100">
                <Navbar />
                <div className="p-5">
                    <h1 className="text-3xl font-bold">Dashboard</h1>

                    <div className="cards mt-5 p-4 flex flex-row gap-2">
                        <div onClick={addBook} className="card-box p-5 gap-4 flex flex-col items-center justify-center bg-white shadow-md shadow-gray-400 rounded-lg cursor-pointer">
                            <GiBlackBook size="40"/>
                            <span className="text-xl font-bold">Add Book</span>
                        </div>
                        <div onClick={searchBook} className="card-box p-5 gap-4 flex flex-col items-center justify-center bg-white shadow-md shadow-gray-400 rounded-lg cursor-pointer">
                            <GiArchiveResearch size="40"/>
                            <span className="text-xl text-center font-bold">Search & <br/>Lend Book</span>
                        </div>
                        <div onClick={bookDepositPage} className="card-box p-5 gap-4 flex flex-col items-center justify-center bg-white shadow-md shadow-gray-400 rounded-lg cursor-pointer">
                            <GiBookCover size="40"/>
                            <span className="text-xl text-center font-bold">Book <br/>Return</span>
                        </div>
                        <div onClick={reportpage} className="card-box p-5 gap-4 flex flex-col items-center justify-center bg-white shadow-md shadow-gray-400 rounded-lg cursor-pointer">
                            <TbReport size="40"/>
                            <span className="text-xl text-center font-bold">Reports</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Dashboard;