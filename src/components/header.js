import React from "react";

const Header = () => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white shadow-sm">
      <div className="flex items-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          className="text-gray-700"
        >
          <path
            fill="currentColor"
            d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 92C26.8 92 8 73.2 8 50S26.8 8 50 8s42 18.8 42 42-18.8 42-42 42z"
          />
          <path
            fill="currentColor"
            d="M25 60h10v15H25zM45 45h10v30H45zM65 35h10v40H65z"
          />
          <path fill="currentColor" d="M60 40l15-15 5 5-20 20z" />
        </svg>
        <a href="/">
          <h1 className="text-2xl font-bold text-gray-700 ml-2">CAMcogni</h1>
        </a>
      </div>
    </div>
  );
};
export default Header;
