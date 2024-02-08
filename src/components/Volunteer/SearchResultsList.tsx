import React from "react";
import SearchResult from "./SearchResult";

interface SearchResultsListProps {
  results: { name: string }[];
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList;
