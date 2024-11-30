import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("An error occurred. Please try again later.");
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl text-red-500">Delete this book</h1>
      {loading ? <Spinner /> : (
      <div className="flex flex-col border-2 border-pink-500 rounded-md shadow-md gap-5 p-6 text-green-600">
        <p className="text-xl font-semibold">
          Are you sure you want to delete this book?
        </p>
        <button
          onClick={handleDeleteBook}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Delete
        </button>
      </div>
      )}
    </div>
  );
};

export default DeleteBook;
