import React from "react";
import "./css/SearchResult.css";
import { useNavigate } from "react-router-dom";

interface SearchResultProps {
  result: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "more-info";
    navigate(path);
  };
  return (
    <div className="search-result" onClick={routeChange}>
      {result}
    </div>
  );
};

export default SearchResult;
