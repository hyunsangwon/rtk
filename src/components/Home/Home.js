import React from 'react';
import MovieListing from '../MovieListing/MovieListing';
import { useEffect } from 'react';
import movieApi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';
import { useDispatch } from 'react-redux';
import { addMovies } from '../../features/movies/movieSlice';

const Home = () => {
  const movieText = 'twilight';
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await movieApi
        .get(`?apiKey=${APIKey}&s=${movieText}&type=movie`)
        .catch((err) => {
          console.log('Err : ' + err);
        });
      dispatch(addMovies(response.data));
    };
    fetchMovies();
  }, []); //Empty array means to only run once on mount.

  return (
    <div>
      <div className="banner-img">HOME</div>;
      <MovieListing />;
    </div>
  );
};

export default Home;
