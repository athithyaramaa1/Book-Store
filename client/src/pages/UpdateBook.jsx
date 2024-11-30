import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishedYear(res.data.publishedYear);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  const handleEditBook = () => {
    setLoading(true);
    const data = {
      title,
      author,
      publishedYear,
    };
    axios
      .put(`http://localhost:5000/books/${id}`, data)
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
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <BackButton />
      <h1 className="text-4xl text-sky-600 font-bold my-6">Update Book</h1>
      {loading && <Spinner />}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 border border-gray-200">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 p-3"
            placeholder="Enter the book title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 p-3"
            placeholder="Enter the author's name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Published Year
          </label>
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 p-3"
            placeholder="Enter the year of publication"
          />
        </div>
        <button
          className="w-full py-3 bg-sky-600 text-white font-medium rounded-lg shadow-lg hover:bg-sky-700 transition duration-200"
          onClick={handleEditBook}
        >
          Save Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
