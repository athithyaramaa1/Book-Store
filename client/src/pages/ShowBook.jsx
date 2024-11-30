import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton className="p-4" />
      <h1 className="text-3xl text-red-500 font-semibold my-4">Show Books</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-pink-500 rounded-md shadow-md gap-5 p-6 text-green-600">
          <p className="text-xl font-semibold">Title: {book.title}</p>
          <p className="text-xl font-semibold">Author: {book.author}</p>
          <p className="text-xl font-semibold">
            Publish Year: {book.publishedYear}
          </p>
          <p className="text-xl font-semibold">
            Created Time: {new Date(book.createdAt).toLocaleString()}
          </p>
          <p className="text-xl font-semibold">
            Updated Time: {new Date(book.updatedAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
