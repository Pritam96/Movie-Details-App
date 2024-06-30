import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/movie";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTgyNTNmNTE4MTdiNzJlY2ZiYWMxMTNiNWIzYjdhMSIsIm5iZiI6MTcxOTA3MzQ0My43MjkzNTksInN1YiI6IjY2NzZlNjFmZDEzM2Y3YzBmMjVlNmNhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BxWStP8MfrcSUOcyvRHi2j7wQq1yrPd4MVCFuH1-aaI";

const getMovies = async (type = "popular", page = 1, language = "en-US") => {
  const response = await axios.get(
    `${API_URL}/${type}?language=${language}&page=${page}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.results;
};

const getMovie = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const movieService = { getMovies, getMovie };

export default movieService;
