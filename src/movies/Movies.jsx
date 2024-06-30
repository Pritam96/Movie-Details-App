import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { getMoviesApi } from "../features/movies/movieSlice";
import NotFound from "../components/NotFound";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

const Movies = () => {
  const [heading, setHeading] = useState("");
  const { type } = useParams();

  const dispatch = useDispatch();

  const { movies, isLoading } = useSelector((state) => state.movies);

  useEffect(() => {
    switch (type) {
      case "popular":
        setHeading("Popular Movies");
        break;
      case "now_playing":
        setHeading("Now Playing");
        break;
      case "upcoming":
        setHeading("Upcoming");
        break;
      case "top_rated":
        setHeading("Top Rated");
        break;
      default:
        return setHeading("");
    }
    dispatch(getMoviesApi({ type: type }));
  }, [dispatch, type]);

  if (!heading) return <NotFound />;

  return (
    <div className="py-3">
      <Container fluid>
        <h4>{heading}</h4>
        <div className="d-flex justify-content-center">
          {!movies && <p>No movies available</p>}

          {isLoading ? (
            <Spinner animation="border" />
          ) : !movies || movies.length === 0 ? (
            <p>No movies available</p>
          ) : (
            <Row className="gy-3">
              {movies.map((movie) => (
                <Col
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  key={movie.id}
                  className="col-sm"
                >
                  <LinkContainer to={`/movie/${movie.id}`}>
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={`${BASE_IMAGE_URL}${movie && movie.poster_path}`}
                        alt={movie.title}
                      />
                      <Card.Body>
                        <Card.Text>{movie.title}</Card.Text>
                      </Card.Body>
                    </Card>
                  </LinkContainer>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Movies;
