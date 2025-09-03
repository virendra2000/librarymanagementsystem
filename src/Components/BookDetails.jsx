"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar22 } from "@/components/ui/calendar22";

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(null);
  const [unavailableBook, setUnavailableBook] = useState([]);
  const [selectedDate, setSelectedDate] = useState(undefined);

  

  const getBookDetails = async () => {
    const result = await axios.get(`http://localhost:8080/api/books/${bookId}`); // api call for book details fetching
    setBook(result.data);

    if (result.data) {
      if (result.data.availCount > 0) {
        setAvailability("Available");
      } else {
        setAvailability("Unavailable");
        const lentBooks = await axios.get(
          `http://localhost:8080/api/books/transaction/${bookId}` // api call if unavailable book . fetch details pf user having book
        );
        setUnavailableBook(lentBooks.data);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getBookDetails(); // fetch book details
    setLoading(false);
  }, [bookId]);

  const handleLendBook = async (e) => {
    e.preventDefault();
    if (!selectedDate) {  // condition for checking date selcted or not
      toast.error("Please select a return date", {
        className:
          "bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold",
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/transaction?book=${book.bookId}`, // api call 
        { rDate: selectedDate.toLocaleDateString("en-CA") },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        toast.success("Book Lent Successfully", {
          autoClose: 5000,
          className:
            "bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold",
        });
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        toast.error("Server Issue", {
          className:
            "bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold",
        });
      }
    } catch (error) {
      toast.error("Login to Continue", {
        className:
          "bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold",
      });
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <p className="text-center mt-20">Loading book details...</p>;
  }

  if (!book) {
    return <p className="text-center mt-20 text-red-500">Book not found!</p>;
  }

  return (
    <>
      <Navbar  />
      <ToastContainer />
      <div className="book-details-page bg-slate-100 p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl shadow-slate-500 p-8 max-w-3xl w-full flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <img
            src="/books.jpg"
            alt={book.bookName}
            className="w-48 h-72 object-cover rounded-lg shadow-lg flex-shrink-0"
          />
          <div className="flex flex-col text-center md:text-left space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">{book.bookName}</h2>
            <p className="text-xl text-gray-700">by {book.author}</p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Edition:</span> {book.bookEdition}
            </p>

            <div className="mt-6 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Book Availability</h3>
              {availability === "Available" ? (
                <>
                  <p className="text-green-600 font-bold text-lg mb-4">
                    Book is Available!
                  </p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-200 font-bold">
                        Lend Book
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[400px] bg-white rounded-lg p-6 shadow-lg">
                      <form onSubmit={handleLendBook}>
                        <DialogHeader>
                          <DialogTitle className="text-lg font-bold text-blue-600">
                            Select Expected Date to Return
                          </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 mt-4">
                          <Calendar22
                            date={selectedDate}
                            setDate={setSelectedDate}
                          />
                        </div>

                        <DialogFooter className="mt-6 flex justify-end gap-3">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            type="submit"
                            className="bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Proceed
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <>
                  <p className="text-red-600 font-bold text-lg mb-2">
                    No Book Available
                  </p>
                  {unavailableBook.length > 0 ? (
                    <div className="overflow-x-auto mt-4">
                      <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                          <tr className="text-left text-xs font-semibold uppercase tracking-wider bg-green-400">
                            <th className="px-4 py-2 border-b-2">Lent To</th>
                            <th className="px-4 py-2 border-b-2">Expected Return</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unavailableBook.map((transaction) => (
                            <tr key={transaction.tId} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border-b text-sm text-gray-700">
                                {transaction.name}
                              </td>
                              <td className="px-4 py-2 border-b text-sm text-gray-700">
                                {transaction.rDate}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 mt-2">
                      No pending returns found for this book.
                    </p>
                  )}
                  <button
                    onClick={handleGoBack}
                    className="bg-green-400 text-white py-3 px-8 rounded-full hover:bg-green-600 cursor-pointer transition-colors duration-200 font-bold mt-4"
                  >
                    Go Back to Search
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
