import React from "react";
import { Button, Card, Row } from "reactstrap";
import { Colxx } from "../common/Colxx";

function HomePage({ navigate }) {
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Colxx lg={10} md={8} sm={10} xs={11} xxs={11}>
          <Card className="home-page-card">
            <div className="home-page-header">
              Welcome to the World of Words
            </div>
            <div className="d-flex justify-content-center home-page-title mt-3">
              <h3>
                The Words is an application Created using ReactJS and NodeJs. In
                this App you would be able to search for synonyms for a word and
                even add to them. In order to enter the search page please click
                the button.
              </h3>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                className="button-custom mt-5 w-100"
                onClick={() => navigate(`search-page`)}
              >
                Search Page
              </Button>
            </div>
          </Card>
        </Colxx>
      </Row>
    </>
  );
}

export default HomePage;
