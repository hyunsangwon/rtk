import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async () => {
    const movieText = 'twilight';
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${movieText}&type=movie`,
    );
    return response.data;
  },
);

const initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  //reducers는 내부에서 진행되는 action 및 동기 action을 넣는 공간.
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
  },
  //extraReducers는 반대로 외부/비동기 action을 넣는 공간. (optional)
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log('Pending');
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log('Pending');
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log('Pending');
    },
  },
});

export const { addMovies } = movieSlice.actions; // 액션 추가
export const getAllMovies = (state) => state.reducerName.movies; //state.스토어에 등록한 리듀서 이름.초기값 state이름
export default movieSlice.reducer;
