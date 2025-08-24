import Navbar from "./Navbar";
import React, { useState , useEffect } from "react";
import { GiBlackBook } from "react-icons/gi";
import { GiArchiveResearch } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import { ImBook } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddBook = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ 
            userEmail: 'dhirajkalwar57@gmail.com',
            password: 'Dhiraj@2000',
            name: 'Dhiraj Kalwar',
            mobileNo: '7977223126',
    });
    const [bookData, setBookData] = useState({
        bookName: '',
        author: '',
        genre: '',
        isbnNo: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(bookData) {
            toast.success('Book Added Successfully!', {
                autoClose: 5000,
                className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
            });
        setTimeout(() => {
            navigate('/');
        }, 5000); 
        } else {
            toast.error('Invalid Book Data', {
                position: toast.POSITION.TOP_CENTER,
                className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
            });
        }
    };
    return (
        <>
            <div className="dashboard h-screen flex flex-col bg-slate-100">
                <Navbar userData={userData}/>
                <ToastContainer />
                <div className="p-5">
                    <h1 className="text-3xl text-center font-bold">Add Book</h1>

                    <div className="cards mt-5 p-4 flex flex-col items-center justify-center gap-2">
                        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2 items-center w-full md:w-[50%]">
                        <input
                            type="text"
                            placeholder="Book Name"
                            value={bookData.bookName}
                            onChange={handleInputChange}
                            name="bookName"
                            className="w-full pl-12 p-4 border-none rounded-lg bg-slate-300 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="text"
                            placeholder="Author Name"
                            value={bookData.author}
                            onChange={handleInputChange}
                            name="author"
                            className="w-full pl-12 p-4 border-none rounded-lg bg-slate-300 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="text"
                            placeholder="Book Genre"
                            value={bookData.genre}
                            onChange={handleInputChange}
                            name="genre"
                            className="w-full pl-12 p-4 border-none rounded-lg bg-slate-300 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="text"
                            placeholder="ISBN Number"
                            value={bookData.isbnNo}
                            onChange={handleInputChange}
                            name="isbnNo"
                            className="w-full pl-12 p-4 border-none rounded-lg bg-slate-300 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            type="submit"
                            className="p-4 w-full bg-green-400 text-white rounded-md cursor-pointer transition duration-200"
                        >
                            Add Book
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};
export default AddBook;