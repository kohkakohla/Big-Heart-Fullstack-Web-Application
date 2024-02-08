import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./css/SearchBar.css";

interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
  const [input, setInput] = useState<string>("");

  const fetchData = (value: string) => {
    fetch("http://localhost:3000/events/getAll")
      .then((response) => response.json())
      .then((json: any[]) => {
        const results = json.filter((cEvent) => {
          return (
            value &&
            cEvent &&
            cEvent.title &&
            cEvent.title.toLowerCase().includes(value)
          );
        });
        console.log(results);
        setResults(results);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="parent-wrapper">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className="input-area"
        />
      </div>
    </div>
  );
};

export default SearchBar;
