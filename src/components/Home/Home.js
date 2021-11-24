import React from 'react';
import MovieListing from '../MovieListing/MovieListing';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies } from '../../features/movies/movieSlice';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncMovies());
  }, [dispatch]); //Empty array means to only run once on mount.

  return (
    <div>
      <div className="banner-img">HOME</div>;
      <MovieListing />;
    </div>
  );
};

export default Home;
