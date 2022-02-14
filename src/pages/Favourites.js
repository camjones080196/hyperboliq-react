import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Modal,
  Accordion,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Favourites() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getMovie = useStoreActions((actions) => actions.getSelectedMovie);
  const movieResult = useStoreState((state) => state.selectedMovie);
  const addToFavourites = useStoreActions((actions) => actions.addToFavourites);
  const removeFromFavourites = useStoreActions(
    (actions) => actions.removeFromFavourites,
  );
  const favourites = useStoreState((state) => state.favourites);
  const setList = useStoreActions((actions) => actions.setList);
  const list = useStoreState((state) => state.list);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  const handleMovieSelect = async (item) => {
    await getMovie(item.imdbID);
    handleShow();
  };

  const handleAddFavourites = (item) => {
    var temp = favourites.some((obj) => obj.imdbID === item.imdbID);
    console.log(temp);
    if (favourites.length > 0) {
      if (temp) {
        removeFromFavourites(item);
        console.log("Already in list");
      } else {
        addToFavourites(item);
        console.log("Added to list");
      }
    } else {
      addToFavourites(item);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col
            style={{
              background: "#565656",
              borderBottomLeftRadius: "4rem",
              borderBottomRightRadius: "4rem",
              // justifyContent: "center",
              // alignItems: "center",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                fontFamily: "Roboto",
                fontWeight: "bolder",
                fontSize: 40,
                marginTop: "2rem",
                marginBottom: "2rem",
                color: "#ffffff",
                borderStyle: "none",
                textTransform: "uppercase",
                textShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              My Favourites
            </div>
            <Button
              style={{
                width: "8rem",
                position: "absolute",
                left: "1rem",
                top: "1rem",
                borderRadius: "1rem",
                backgroundColor: "#272727",
                borderStyle: "none",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
              }}
              onClick={routeChange}
            >
              <span
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "bolder",
                  color: "#ffffff",
                  fontSize: 20,
                }}
                role="button"
                aria-label="back"
              >
                🡸 Back
              </span>
            </Button>
          </Col>
        </Row>
        {favourites != null && favourites.length > 0 ? (
          <Row style={{ display: "flex", flex: 1, height: "100%" }}>
            <Button
              onClick={async () => {
                await setList();
              }}
              style={{
                position: "absolute",
                right: "4rem",
                width: "10rem",
                marginTop: "1.8rem",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              {list ? "View Card" : "View List"}
            </Button>
            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "3rem",
                marginBottom: 0,
                background: "#565656",
                //backgroundColor: "#272727",
                borderRadius: "4rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingBottom: "2rem",
                justifyContent: "center",
                alignItems: "flex-start",
                boxShadow: "0px -8px 20px rgba(0, 0, 0, 0.5)",
                flexWrap: "wrap",
              }}
            >
              {list ? (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "2rem",
                    //paddingBottom: "3rem",
                  }}
                >
                  {favourites.map((movie) => (
                    <div
                      onClick={() => handleMovieSelect(movie)}
                      key={`movieID${movie.imdbID}`}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flex: 1,
                        backgroundColor: "#272727",
                        boxShadow: "0px -8px 20px rgba(0, 0, 0, 0.5)",
                        width: "80%",
                        borderRadius: "1rem",
                        marginTop: "2rem",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flex: 1,
                          alignItems: "flex-start",
                        }}
                      >
                        <Image
                          style={{
                            width: "5rem",
                            borderTopLeftRadius: "1rem",
                            borderBottomLeftRadius: "1rem",
                          }}
                          src={movie.Poster}
                        />
                      </div>
                      <div
                        style={{
                          flex: 1,
                          color: "#ffffff",
                          fontFamily: "Teko",
                          letterSpacing: "0.2rem",
                          fontWeight: "bold",
                          fontSize: 25,
                          textTransform: "uppercase",
                          textShadow: "0px 8px 20px rgba(0, 0, 0, 01)",
                        }}
                      >
                        {movie.Title}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "flex-end",
                          flexDirection: "column",
                          paddingRight: "1rem",
                        }}
                      >
                        <div
                          style={{
                            color: "#ffffff",
                            fontFamily: "Roboto",
                            letterSpacing: "0.1rem",
                            fontWeight: "normal",
                            fontSize: 12,
                            textTransform: "capitalize",
                          }}
                        >
                          Type: {movie.Type}
                        </div>
                        <div
                          style={{
                            marginTop: "1rem",
                            textAlign: "center",
                            color: "#ffffff",
                            fontFamily: "Roboto",
                            letterSpacing: "0.1rem",
                            fontWeight: "normal",
                            fontSize: 10,
                            textTransform: "capitalize",
                          }}
                        >
                          Release Year: {movie.Year}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                favourites.map((movie) => (
                  <Card
                    onClick={() => handleMovieSelect(movie)}
                    key={`movieID${movie.imdbID}`}
                    style={{
                      display: "flex",
                      marginLeft: "1rem",
                      marginRight: "1rem",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "2rem",
                      width: "10rem",
                      backgroundColor: "#272727",
                      borderRadius: "2rem",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <Card.Img
                      style={{
                        borderRadius: "2rem",
                        width: "10rem",
                        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
                      }}
                      variant="bottom"
                      src={movie.Poster}
                    />
                    <Card.Body
                      style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                    >
                      <Card.Title
                        style={{
                          color: "#ffffff",
                          fontFamily: "Teko",
                          letterSpacing: "0.2rem",
                          fontWeight: "bold",
                          fontSize: 15,
                          textTransform: "uppercase",
                          textShadow: "0px 8px 20px rgba(0, 0, 0, 01)",
                        }}
                      >
                        {movie.Title}
                      </Card.Title>
                      <Card.Subtitle
                        style={{
                          color: "#ffffff",
                          fontSize: 10,
                          fontFamily: "Roboto",
                          fontWeight: "bolder",
                          marginTop: "0.4rem",
                        }}
                      >
                        {movie.Year}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Col>
          </Row>
        ) : (
          <div
            style={{
              marginTop: "10rem",
              textAlign: "center",
              color: "#ffffff",
              fontFamily: "Roboto",
              letterSpacing: "0.2rem",
              fontWeight: "bold",
              fontSize: 25,
              textTransform: "capitalize",
              textShadow: "0px 8px 20px rgba(0, 0, 0, 01)",
            }}
          >
            You have no favourite movies...
          </div>
        )}
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ backgroundColor: "rgba(0,0,0,0.5)", borderStyle: "none" }}
        // container={{ borderRadius: "1rem" }}
      >
        <Modal.Header
          style={{
            display: "flex",
            backgroundColor: "#272727",
            borderStyle: "none",
            alignItems: "center",
            justifyContent: "center",
          }}
          closeButton
        >
          <Modal.Title
            style={{
              textAlign: "center",
              color: "#ffffff",
              fontFamily: "Teko",
              letterSpacing: "0.2rem",
              fontWeight: "bold",
              fontSize: 25,
              textTransform: "uppercase",
              textShadow: "0px 8px 20px rgba(0, 0, 0, 01)",
            }}
          >
            {movieResult?.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#272727",
          }}
        >
          <Image
            style={{
              width: "10rem",
              borderRadius: "1rem",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
            }}
            src={movieResult?.Poster}
          />
          <Accordion
            defaultActiveKey="0"
            style={{ marginTop: "2rem", width: "100%" }}
          >
            <Accordion.Item eventKey="0" style={{ flex: 1, width: "100%" }}>
              <Accordion.Header>Movie Details</Accordion.Header>
              <Accordion.Body>
                <div>Year: {movieResult?.Year}</div>
                <div>Age Rating: {movieResult?.Rated}</div>
                <div>Release Date: {movieResult?.Released}</div>
                <div>Runtime: {movieResult?.Runtime}</div>
                <div>Genre: {movieResult?.Genre}</div>
                <div>Director: {movieResult?.Director}</div>
                <div>Writer: {movieResult?.Writer}</div>
                <div>Actors: {movieResult?.Actors}</div>
                <div>Language: {movieResult?.Language}</div>
                <div>Country: {movieResult?.Country}</div>
                <div>Type: {movieResult?.Type}</div>
                <div>DVD Release Date: {movieResult?.DVD}</div>
                <div>Box Office: {movieResult?.BoxOffice}</div>
                <div>Production: {movieResult?.Production}</div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Movie Plot</Accordion.Header>
              <Accordion.Body>
                <div>{movieResult?.Plot}</div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Awards</Accordion.Header>
              <Accordion.Body>
                <div>{movieResult?.Awards}</div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Ratings</Accordion.Header>
              <Accordion.Body>
                {/* <div>{movieResult?.Ratings}</div> */}
                <div>Meta Score: {movieResult?.Metascore}</div>
                <div>IMDB: {movieResult?.imdbRating}</div>
                <div>IMDB Votes{movieResult?.imdbVotes}</div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: "#272727", borderStyle: "none" }}
        >
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant={
              favourites.some((obj) => obj.imdbID === movieResult.imdbID)
                ? "danger"
                : "success"
            }
            onClick={() => handleAddFavourites(movieResult)}
          >
            {favourites.some((obj) => obj.imdbID === movieResult.imdbID)
              ? "-Favourites"
              : "+Favourites"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
