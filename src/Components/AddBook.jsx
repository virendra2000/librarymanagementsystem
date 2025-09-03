import Navbar from "./Navbar";
import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const AddBook = () => {
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({
        bookName: '',
        author: '',
        genre: '',
        isbnNo: '',
        quantity:null
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value }); // onchange setting book details
    };
    
    const handleSubmit = async (e) => {
        /**
         * Handel the Submission Of Book Details 
         */
        e.preventDefault();

        const result = await axios.post("http://localhost:8080/api/addbook",bookData); // api call
    
        if(result) {
            toast.success('Book Added Successfully!', {
                autoClose: 5000,
                className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
            });
        setTimeout(() => {
            navigate('/');
        }, 5200); 
        } else {
            toast.error('Server Issue', {
                className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
            });
        }
    };
    return (
        <>
            <div className="dashboard h-screen flex flex-col bg-slate-100">
                <Navbar />
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
                            required
                            className="w-full pl-12 p-4 border-none rounded-lg bg-slate-300 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="text"
                            placeholder="Author Name"
                            value={bookData.author}
                            onChange={handleInputChange}
                            name="author"
                            required
                            className="w-full pl-12 p-4 border-none rounded-lg bg-slate-300 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="text"
                            placeholder="Book Genre"
                            value={bookData.genre}
                            onChange={handleInputChange}
                            name="genre"
                            required
                            className="w-full pl-12 p-4 border-none rounded-lg bg-slate-300 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="text"
                            placeholder="ISBN Number"
                            value={bookData.isbnNo}
                            onChange={handleInputChange}
                            name="isbnNo"
                            required
                            className="w-full pl-12 p-4 border-none rounded-lg bg-slate-300 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input 
                            type="number"
                            placeholder="Quantity"
                            value={bookData.quantity}
                            onChange={handleInputChange}
                            name="quantity"
                            required
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