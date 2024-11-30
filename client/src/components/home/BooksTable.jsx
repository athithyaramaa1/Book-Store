import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Publish Year
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id}>
            <td className="border border-slate-700 text-center">{index + 1}</td>
            <td className="border border-slate-700 text-center">
              {book.title}
            </td>
            <td className="border border-slate-700 text-center max-md:hidden">
              {book.author}
            </td>
            <td className="border border-slate-700 text-center max-md:hidden">
              {book.publishedYear}
            </td>
            <td className="border border-slate-700 text-center">
              <Link
                to={`/books/details/${book._id}`}
                className="text-blue-800 mx-2"
              >
                Details
              </Link>
              <Link
                to={`/books/edit/${book._id}`}
                className="text-green-800 mx-2"
              >
                Edit
              </Link>
              <Link
                to={`/books/delete/${book._id}`}
                className="text-red-800 mx-2"
              >
                Delete
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
BooksTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      publishedYear: PropTypes.number,
    })
  ).isRequired,
};

export default BooksTable;