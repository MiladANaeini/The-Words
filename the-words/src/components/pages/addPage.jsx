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
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingComp from "../common/Loading";

function AddPage({ navigate }) {
  const [synonym, setSynonym] = useState("");
  const [synonymsData, setSynonymsData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { newWordId, newGroupId } = useParams();
  const [postError, setPostError] = useState(false);

  const addWord = () => {
    axios
      .post("http://localhost:3000/add-new-synonym", {
        keyword: synonym,
        groupId: newGroupId,
      })
      .then((res) => {
        searchWords();
      })
      .catch((error) => {
        console.log("Error", error.message);
        setPostError(true);
      });
  };
  const searchWords = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/search-word?keyword=" + newWordId)
      .then((res) => {
        setSynonymsData(res.data.synonyms);
        setTimeout(() => {
          setIsLoaded(true);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        // setError(error.message);
        setIsLoaded(false);
        setIsLoading(false);
      });
  };
  return (
    <>
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <h1>The Word "{newWordId}" Was Added</h1>
              <h4>do you wish to add synonym?</h4>
              <Input
                name="synonym"
                placeholder="Please Enter The Synonym"
                value={synonym}
                onChange={(e) => {
                  setSynonym(e.target.value);
                }}
              />
              {postError && <p>Plese enter the word</p>}
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
          {!isLoading ? (
            <>
              {isLoaded && (
                <>
                  <h4>synonyms : </h4>
                  {synonymsData.map((item) => {
                    return (
                      <>
                        <h3>{item.name}</h3>
                      </>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <LoadingComp />
          )}
        </CardBody>
      </Card>
    </>
  );
}
export default AddPage;
