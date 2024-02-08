import React from "react";
import SearchResult from "./SearchResult";

interface SearchResultsListProps {
  results: { title: string }[];
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.title} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList;
