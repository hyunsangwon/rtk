import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from '../../features/movies/movieSlice';
import user from '../../images/user.png';
import './Header.scss';

const Header = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault(); //새로고침 막기
    if (term === '') {
      return alert('내용을 입력해 주세요!');
    }
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm('');
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
