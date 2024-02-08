import React from "react";
import "./css/SearchResult.css";
import { useNavigate } from "react-router-dom";

interface SearchResultProps {
  result: string;
  object: any;
}

const SearchResult: React.FC<SearchResultProps> = ({ result, object }) => {
  let navigate = useNavigate();
  const data = object;

  const routeChange = () => {
    let path = "details";
    console.log({ object });
    navigate("/details", { state: { data } });
  };
  return (
    <div className="search-result" onClick={routeChange}>
      {result}
    </div>
  );
};

export default SearchResult;
