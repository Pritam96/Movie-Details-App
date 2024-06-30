import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieService from "./movieService";

const initialState = {
  movies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getMoviesApi = createAsyncThunk(
  "movies",
  async (options, thunkAPI) => {
    try {
      return await movieService.getMovies(options.type);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMovieApi = createAsyncThunk("movie", async (movieId, thunkAPI) => {
  try {
    return await movieService.getMovie(movieId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesApi.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getMoviesApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getMoviesApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(getMovieApi.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getMovieApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getMovieApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = movieSlice.actions;
export default movieSlice.reducer;
