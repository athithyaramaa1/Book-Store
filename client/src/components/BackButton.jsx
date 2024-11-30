import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BackButton = ({ destination = "/" }) => {
  const handleRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.classList.add("ripple");
    button.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };

  return (
    <>
      <style>
        {`
            .ripple {
              position: absolute;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.6);
              transform: scale(0);
              animation: ripple-animation 0.6s linear;
            }
  
            @keyframes ripple-animation {
              to {
                transform: scale(4);
                opacity: 0;
              }
            }
          `}
      </style>
      <Link to={destination}>
        <button
          onClick={handleRipple}
          className="relative overflow-hidden bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 transition duration-300 hover:bg-blue-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
      </Link>
    </>
  );
};
BackButton.propTypes = {
  destination: PropTypes.string,
};

export default BackButton;
