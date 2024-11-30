import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [view, setView] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          onClick={() => setView("table")}
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg text-white font-semibold"
        >
          Table
        </button>
        <button
          onClick={() => setView("card")}
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg text-white font-semibold"
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 font-semibold text-blue-800">
          Books List
        </h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl"></MdOutlineAddBox>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : view === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
