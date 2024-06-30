import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMovieApi } from "../features/movies/movieSlice";
import { Card, Col, Container, Row, Spinner, Alert } from "react-bootstrap";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {
  const { id } = useParams();
  const { movies, isLoading, error } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieApi(id));
  }, [id, dispatch]);

  return (
    <div className="py-3 w-100">
      <Container fluid className="d-flex justify-content-center">
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {!isLoading && !error && !movies && <p>No movie found</p>}
        {!isLoading && movies && (
          <Row className="gy-3">
            <Card className="p-2">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={`${BASE_IMAGE_URL}${movies.poster_path}`}
                      alt={movies.title}
                    />
                  </Col>
                  <Col md={8} className="d-flex flex-column mt-4">
                    <Card.Title>{movies.title}</Card.Title>
                    <Card.Text>{movies.overview}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MovieDetails;
