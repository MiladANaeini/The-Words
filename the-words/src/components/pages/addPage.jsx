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

function AddPage({ navigate }) {
  const [word, setWord] = useState(localStorage.getItem("newWord"));
  const [synonym, setSynonym] = useState([]);
  const [randomId, setRandomId] = useState(localStorage.getItem("newWordId"));
  const [synonyms, setSynonyms] = useState([]);

  console.log(randomId);

  const addWord = () => {
    AllWords.push({ name: synonym, id: synonym, groupId: parseInt(randomId) });
    searchWords(word);
    console.log("AllWords", AllWords);
  };
  const searchWords = (word) => {
    console.log("AllWords", AllWords);
    let searchResult = AllWords.find((element) => element.name === word);
    console.log("searchResult", searchResult);
    if (searchResult) {
      let synonyms = AllWords.filter(
        (item) => item.groupId === searchResult.groupId
      );
      setSynonyms(synonyms);
      console.log("synonyms", synonyms);
    }
  };

  return (
    <>
      {console.log("AllWords", AllWords)}
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <h1>The Word {word} Was Added</h1>
              <h4>are you wishing to add synonym?</h4>
              <Input
                name="synonym"
                placeholder="Please Enter The Synonym"
                value={synonym}
                onChange={(e) => {
                  setSynonym(e.target.value);
                }}
              />
            </FormGroup>
            <Button
              onClick={() => {
                addWord();
              }}
            >
              Add Synonym
            </Button>
            <Button onClick={() => navigate(`search-page`)}>Back</Button>
          </Form>
          {synonyms.length > 0 && (
            <>
              <h4>synonyms for {word}: </h4>
              {synonyms.map((item) => {
                return (
                  <>
                    <h3>{item.name}</h3>
                  </>
                );
              })}
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
}
export default AddPage;
