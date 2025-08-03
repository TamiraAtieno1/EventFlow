// src/assets/components/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';
import '../../assets/styles/partials/_searchBar.scss'; // SCSS import

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search for events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="search-icon">
          <Search size={20} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
