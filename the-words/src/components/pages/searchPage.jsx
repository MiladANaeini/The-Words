import React, { useState } from "react";
import {
  CardBody,
  Card,
  Row,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
  Alert,
  Badge,
} from "reactstrap";
import { Colxx } from "../common/Colxx";
import axios from "axios";
import LoadingComp from "../common/Loading";
import { SEARCH_WORD_URL, ADD_NEW_WORD_URL } from "../../constants/constants";

function SearchPage({ navigate }) {
  const [word, setWord] = useState("");
  const [synonymsData, setSynonymsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWords = () => {
    setIsLoading(true);
    setError(null);
    axios
      .get(SEARCH_WORD_URL, {
        params: {
          keyword: word,
        },
      })
      .then((res) => {
        setSynonymsData(res.data.synonyms);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  const addNewWord = () => {
    axios
      .post(ADD_NEW_WORD_URL, { keyword: word })
      .then((res) => {
        navigate(`add-page/${res.data.id}/${res.data.groupId}`);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleChange = (event) => {
    setError(null);
    setWord(event.target.value);
  };

  const showSynonyms = () => {
    if (synonymsData) {
      if (synonymsData.length) {
        return (
          <Row>
            {synonymsData.map((item) => (
              <Colxx xs={3}>
                <h3>
                  <Badge color="info">{item.name}</Badge>
                </h3>
              </Colxx>
            ))}
          </Row>
        );
      }
      return (
        <>
          <div className="d-flex justify-content-center">
            <h4>
              This word does not exist in out data base, If you wish to add it
              click on Add Word
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <Button className="button-custom mt-1" onClick={addNewWord}>
              Add Word
            </Button>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      {error && <Alert color="danger">{error.message}</Alert>}
      <div>
        <Row className="d-flex justify-content-center">
          <Colxx lg={10} md={8} sm={10} xs={11} xxs={11}>
            <Card className="home-page-card">
              <CardBody>
                <div className="d-flex justify-content-center home-page-title">
                  <h3>Welcome to search page</h3>
                </div>
                <CardTitle className="input-label">Enter The Word</CardTitle>
                <Form>
                  <FormGroup>
                    <Input
                      name="word"
                      id="word"
                      placeholder="Please Enter The Word"
                      value={word}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="button-custom mt-1 "
                      disabled={!word.length || isLoading}
                      onClick={searchWords}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
                <div className="mt-4">
                  {isLoading ? <LoadingComp /> : showSynonyms()}
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    </div>
  );
}
export default SearchPage;
