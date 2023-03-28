import React from "react";
import { Button, Card, Row } from "reactstrap";
import { Colxx } from "../common/Colxx";

function HomePage({ navigate }) {
  return (
    <>
      <Card className="home-page-card">
        <Row className="d-flex justify-content-center home-page-title">
          <h3>
            The Words is an application Created using ReactJS and NodeJs. In
            this App you would be able to search for synonyms for a word and
            even add to them.In order to enter the search page please click the
            button below
          </h3>
        </Row>
        <Row className="d-flex justify-content-center top-title">
          <Button
            className="button-custom"
            onClick={() => navigate(`search-page`)}
          >
            SearchPage
          </Button>
        </Row>
      </Card>
    </>
  );
}

export default HomePage;
