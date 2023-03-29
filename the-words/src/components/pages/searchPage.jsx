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
} from "reactstrap";
import { Colxx } from "../common/Colxx";
import LoadingComp from "../common/Loading";
import { SEARCH_WORD_URL, ADD_NEW_WORD_URL } from "../../constants/constants";
import useFetchData from "../hooks/useFetchData";
import usePostData from "../hooks/usePostData";
import SynonymsList from "../common/SynonymsList";

const SearchPage = ({ navigate }) => {
  const [word, setWord] = useState("");

  const { getData, result: synonymsData, isLoading, error } = useFetchData({
    url: SEARCH_WORD_URL,
    params: { keyword: word },
    enabled: false,
  });
  const redirectToAddSynonyms = (res) => {
    navigate(`add-page/${res.id}/${res.groupId}`);
  };

  const { postData, error: postError } = usePostData({
    url: ADD_NEW_WORD_URL,
    body: {
      keyword: word,
    },
    callBack: redirectToAddSynonyms,
  });

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const handleOnKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      getData();
    }
  };

  const showSynonyms = () => {
    if (synonymsData) {
      if (synonymsData.synonyms.length) {
        return <SynonymsList synonymsData={synonymsData} />;
      }
      return (
        <>
          <div className="d-flex justify-content-center">
            <h4>
              This word does not exist in out database, If you wish to add it
              click on Add Word
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <Button className="button-custom mt-1" onClick={postData}>
              Add Word
            </Button>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      {error && <Alert color="danger">{error.response.data.message}</Alert>}
      {postError && (
        <Alert color="danger">{postError.response.data.message}</Alert>
      )}
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
                      onKeyPress={handleOnKeyPress}
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="button-custom mt-1 "
                      disabled={!word.length || isLoading}
                      onClick={getData}
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
};
export default SearchPage;
