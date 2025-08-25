import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import dummyBooks from "../Constants/books.json";
import { CgSearch } from "react-icons/cg";
import axios from "axios";
const SearchBook = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [userData, setUserData] = useState({ 
        userEmail: 'dhirajkalwar57@gmail.com',
        password: 'Dhiraj@2000',
        name: 'Dhiraj Kalwar',
        mobileNo: '7977223126',
    });
    
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const initialQuery = searchParams.get('s') || '';
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    const handleSearch = async (query) => {

        
        if (!query.trim()) {
            setBooks([]);
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const result = await axios.get(`http://localhost:8080/api/books/search?s=${query}`);
                
            setBooks(result.data);
            } catch (err) {
                setError('Failed to filter books.');
            } finally {
                setLoading(false);
            }
    };

    useEffect(() => {
        const query = searchParams.get('s');
        if (query) {
            handleSearch(query);
            setSearchQuery(query);
        } else {
            setBooks([]);
            setSearchQuery('');
        }
    }, [searchParams]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSearchParams({ s: searchQuery });
    };

    return (
        <>
            <div className="dashboard h-screen flex flex-col bg-gray-100">
                <Navbar userData={userData} />
                <div className="search-container p-5 w-full bg-white shadow-md">
                    <form onSubmit={handleFormSubmit} className="flex items-center space-x-4 w-full max-w-2xl mx-auto">
                        <div className="w-full px-5 flex flex-row rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200">
                        <input
                            type="text"
                            placeholder="Search for a book by its name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow w-full p-3 outline-none"
                        />
                        <button
                            type="submit"
                            className=" text-green-500 font-bold p-3 curosor-pointer rounded-full bg-transparent transition-colors duration-200"
                            disabled={loading}
                        >
                            {loading ? 'Searching...' : 
                                <CgSearch color="#000000" size={20} />
                            }
                        </button>
                        </div>
                    </form>
                </div>

                <div className="results-container flex-grow p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto">
                    {loading && <p className="text-center text-gray-500 col-span-full">Loading...</p>}
                    {error && <p className="text-center text-red-500 col-span-full">Error: {error}</p>}
                    {books.length > 0 ? (
                        books.map((book) => (
                            <div
                                key={book.bookId} // Using book.id as a unique key for React
                                onClick={() => navigate(`/book/${book.bookId}`)} // Navigate to the new page on click
                                className="book-card bg-slate-100 rounded-lg shadow-lg shadow-slate-500 p-6 flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
                            >
                                <img
                                    src="/books.jpg"
                                    alt={book.bookName}
                                    className="w-32 h-48 object-cover rounded-lg mb-4 shadow-md"
                                />
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{book.bookName}</h3>
                                    <p className="text-gray-600 text-sm mt-1 line-clamp-1">by {book.author}</p>
                                    <p className="text-gray-500 text-xs"><span className="font-semibold">Genre:</span> {book.genre}</p>
                                    <p className="text-gray-500 text-xs"><span className="font-semibold">Edition:</span> {book.bookEdition}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && !error && (
                            <p className="text-center text-gray-500 col-span-full mt-10 text-lg">
                                Please search for a book to see results.
                            </p>
                        )
                    )}
                </div>
            </div>
        </>
    );
};
export default SearchBook;