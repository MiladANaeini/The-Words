import React, { useState, useEffect } from "react";
import {
  CardBody,
  Card,
  Row,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { Colxx } from "../common/Colxx";
import { AllWords } from "../assets/data";
import axios from "axios";
import LoadingComp from "../common/Loading";
function SearchPage({ navigate }) {
  const [word, setWord] = useState("");
  const [randomId, setRandomId] = useState();
  const [synonymsData, setSynonymsData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (word) => {
    searchWords(word);
  };
  const searchWords = (word) => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/search-word?keyword=" + word)
      .then((res) => {
        setSynonymsData(res.data.synonyms);
        setTimeout(() => {
          setIsLoaded(true);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setIsLoaded(false);
        setIsLoading(false);
      });
  };
  const addNewWord = () => {
    axios
      .post("http://localhost:3000/add-new-word", { keyword: word })
      .then((res) => {
        console.log("poetRes", res);
        navigate(`add-page/${res.data.id}/${res.data.groupId}`);
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };

  const showSynonyms = () => {
    if (isLoaded && synonymsData.length > 0) {
      return synonymsData.map((item) => {
        return (
          <>
            <h3>{item.name}</h3>
          </>
        );
      });
    } else if (isLoaded && !synonymsData.length) {
      return (
        <>
          <h4>
            This word does not exist in out data base, If you wish to add it
            feel free to click on Add Word
          </h4>
          <Button
            onClick={() => {
              addNewWord();
            }}
          >
            Add Word
          </Button>
        </>
      );
    }
  };
  return (
    <>
      <Card>
        <Row className="d-flex justify-content-center home-page-title">
          <h3>Welcome to search page</h3>
        </Row>
      </Card>
      <Row className="d-flex justify-content-center home-page-title">
        <Button onClick={() => navigate(`/`)}>Home Page</Button>
      </Row>
      <Row>
        <Colxx>
          <Card>
            <CardBody>
              <CardTitle>Enter The Word</CardTitle>
              <Form>
                <FormGroup>
                  <Input
                    name="word"
                    id="word"
                    placeholder="Please Enter The Word"
                    value={word}
                    onChange={(e) => {
                      setWord(e.target.value);
                    }}
                  />
                </FormGroup>
                <Button onClick={() => onSubmit(word)}>Submit</Button>
              </Form>
              {isLoading ? <LoadingComp /> : showSynonyms()}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
}
export default SearchPage;
