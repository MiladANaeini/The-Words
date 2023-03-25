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
} from "reactstrap";
import { Colxx } from "../common/Colxx";
import { AllWords } from "../assets/data";
function SearchPage({ navigate }) {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [wordExist, setWordExist] = useState(true);
  console.log("word", word);

  const onSubmit = (word) => {
    searchWords(word);
  };
  const searchWords = (word) => {
    console.log("AllWords", AllWords);
    let searchResult = [];
    searchResult = AllWords.find((element) => element.name === word);
    console.log("searchResult", searchResult);
    if (searchResult) {
      let synonyms = AllWords.filter(
        (item) => item.groupId === searchResult.groupId
      );
      setSynonyms(synonyms);
      console.log("synonyms", synonyms);
    } else {
      AllWords.push({ name: word, id: word, groupId: IdGenerator() });
      console.log("AllWords", AllWords);
    }
  };

  const IdGenerator = () => {
    let randomNumber = Math.floor(Math.random() * 100);
    let checkGroupId = AllWords.find(
      (element) => element.groupId == randomNumber
    );
    console.log("randomNumber", randomNumber);
    console.log("checkGroupId", checkGroupId);

    if (!checkGroupId) {
      return randomNumber;
    } else {
      IdGenerator();
    }
  };

  return (
    <>
      <div>this is searchPage</div>
      <button onClick={() => navigate(`the-words`)}>The Words</button>
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
              {wordExist ? (
                <h4>
                  Please surch for the word to be able to see the synonyms
                </h4>
              ) : (
                <>
                  <h4>
                    This word does not exist in out data base, If you wish to
                    add it feel free to click on the
                  </h4>
                  <Button onClick={() => navigate(`add-page`)}>Add Word</Button>
                </>
              )}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
}
export default SearchPage;
