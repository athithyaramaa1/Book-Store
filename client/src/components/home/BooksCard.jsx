import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaBook, FaUser, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineDetails, MdEdit, MdDelete } from "react-icons/md";

const BooksCard = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {books.map((book, index) => (
        <div
          key={book._id}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
        >
          <div className="text-sm text-gray-500 mb-2 flex items-center">
            <FaBook className="mr-2 text-sky-600" />
            Book #{index + 1}
          </div>
          <h2 className="text-xl font-semibold text-sky-600 mb-4 flex items-center">
            <FaBook className="mr-2 text-sky-600" />
            {book.title}
          </h2>
          <p className="text-gray-700 mb-2 flex items-center">
            <FaUser className="mr-2 text-gray-600" />
            <span className="font-medium">Author:</span>{" "}
            {book.author || "Unknown"}
          </p>
          <p className="text-gray-700 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-600" />
            <span className="font-medium">Published Year:</span>{" "}
            {book.publishedYear || "N/A"}
          </p>
          <div className="flex justify-between mt-auto">
            <Link
              to={`/books/details/${book._id}`}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <MdOutlineDetails className="mr-1" /> Details
            </Link>
            <Link
              to={`/books/edit/${book._id}`}
              className="text-green-600 hover:text-green-800 font-medium flex items-center"
            >
              <MdEdit className="mr-1" /> Edit
            </Link>
            <Link
              to={`/books/delete/${book._id}`}
              className="text-red-600 hover:text-red-800 font-medium flex items-center"
            >
              <MdDelete className="mr-1" /> Delete
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

BooksCard.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      publishedYear: PropTypes.number,
    })
  ).isRequired,
};

export default BooksCard;
