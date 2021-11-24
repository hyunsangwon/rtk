import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies', // 액션 이름
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`,
    );
    return response.data;
  },
);

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`,
    );
    return response.data;
  },
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetail',
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  },
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  //reducers는 내부에서 진행되는 action 및 동기 action을 넣는 공간.
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  //extraReducers는 반대로 외부/비동기 action을 넣는 공간. (optional)
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log('Pending');
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log('Fulfilled!');
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log('Rejected!');
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log('Fulfilled!');
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log('Fulfilled!');
      return { ...state, selectMovieOrShow: payload };
    },
  },
});

export const { addMovies, removeSelectedMovieOrShow } = movieSlice.actions; // 액션 추가
export const getAllMovies = (state) => state.reducerName.movies; //state.스토어에 등록한 리듀서 이름.초기값 state이름
export const getAllShows = (state) => state.reducerName.shows;
export const getSelectedMovieOrShow = (state) =>
  state.reducerName.selectMovieOrShow;
export default movieSlice.reducer;
