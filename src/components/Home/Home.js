import React from 'react';
import MovieListing from '../MovieListing/MovieListing';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from '../../features/movies/movieSlice';

const Home = () => {
  const movieText = 'avengers';
  const showText = 'friends';
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);
  // useEffect :
  // 두번째 인자값은 deps을 넣는다.
  // 두번째 인자값이[]면 컴포넌트가 처음 나타날때에만 useEffect에 등록한 함수가 호출.
  // deps에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트 될 때에도 호출 되고, 지정한 값이 바뀔 때에도 호출.
  // deps 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때마다 호출.
  return (
    <div>
      <div className="banner-img">HOME</div>;
      <MovieListing />;
    </div>
  );
};

export default Home;
