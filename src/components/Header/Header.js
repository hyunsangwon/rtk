import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import user from '../../images/user.png';
import './Header.scss';

const Header = () => {
  const [term, setTerm] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(term);
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">현상원의 Movie Time</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows..."
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
