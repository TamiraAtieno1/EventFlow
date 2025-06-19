// src/components/Header.jsx

import React from "react";
import { useResponsive } from "../hooks/useResponsive"; // Corrected path

/**
 * Header component for the Event Booker application.
 * It includes the logo, navigation (desktop only), search bar, and a mobile menu toggle.
 * @param {object} props
 * @param {string} props.searchQuery
 * @param {(q: string) => void} props.setSearchQuery
 * @param {() => void} props.onOpenMenu
 * @param {boolean} props.isMenuOpen
 * @param {(event: object | null) => void} props.onStartBooking
 * @returns {JSX.Element}
 */
const Header = ({
  searchQuery,
  setSearchQuery,
  onOpenMenu,
  isMenuOpen,
  onStartBooking,
}) => {
  const { isMobile } = useResponsive();

  return (
    <header className="header" role="banner">
      <div className="header-container">
        <div className="logo" tabIndex={0} aria-label="Event Booking Home">
          EventBooker
        </div>
        {!isMobile && (
          <nav aria-label="Primary navigation" className="nav-desktop">
            <ul className="nav-list">
              <li>
                <button
                  onClick={() => onStartBooking(null)}
                  className="nav-link"
                >
                  Browse Events
                </button>
              </li>
              {/* Placeholder for more nav links */}
            </ul>
          </nav>
        )}
        <div className="search-wrapper">
          <label htmlFor="searchEvents" className="visually-hidden">
            Search events
          </label>
          <input
            id="searchEvents"
            type="search"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search events"
            className="search-input"
          />
          <span className="material-icons search-icon" aria-hidden="true">
            search
          </span>
        </div>
        {isMobile && (
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="menu-toggle"
            onClick={onOpenMenu}
          >
            <span className="material-icons">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        )}
      </div>
      <style>{`
        .header {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: saturate(180%) blur(20px);
        }
        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .logo {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          cursor: pointer;
          user-select: none;
        }
        .nav-desktop {
          flex-grow: 1;
        }
        .nav-list {
          display: flex;
          list-style: none;
          gap: 1.5rem;
          padding: 0;
          margin: 0;
          align-items: center;
        }
        .nav-link {
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: background-color 0.25s;
        }
        .nav-link:hover,
        .nav-link:focus-visible {
          background-color: #dbeafe;
          outline: none;
        }
        .search-wrapper {
          position: relative;
          flex-grow: 1;
          max-width: 320px;
          margin-left: auto;
        }
        .search-input {
          width: 100%;
          padding: 0.5rem 2.5rem 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          color: #374151;
        }
        .search-input:focus {
          outline: 2px solid #2563eb;
          border-color: #2563eb;
        }
        .search-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.25rem;
          color: #9ca3af;
          pointer-events: none;
        }
        .menu-toggle {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #374151;
          padding: 0.25rem;
        }
        .visually-hidden {
          border: 0;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
          white-space: nowrap;
        }
        @media (max-width: 767px) {
          .nav-desktop {
            display: none;
          }
          .search-wrapper {
            max-width: 100%;
            flex-grow: 1;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
