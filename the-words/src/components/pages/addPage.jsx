import React, { useState } from "react";
import {
  CardBody,
  Card,
  Form,
  FormGroup,
  Input,
  Button,
  Alert,
  Row,
  CardTitle,
} from "reactstrap";
import { useParams } from "react-router-dom";
import {
  SEARCH_WORD_URL,
  ADD_NEW_SYNONYM_URL,
} from "../../constants/constants";
import { Colxx } from "../common/Colxx";
import useFetchData from "../hooks/useFetchData";
import usePostData from "../hooks/usePostData";
import SynonymsList from "../common/SynonymsList";
import Loading from "../common/Loading";

function AddPage({ navigate }) {
  const [synonym, setSynonym] = useState("");
  const { newWordId, newGroupId } = useParams();
  const { getData, result: synonymsData, isLoading, error } = useFetchData({
    url: SEARCH_WORD_URL,
    params: { keyword: newWordId },
    enabled: false,
  });
  const { postData, error: postError } = usePostData({
    url: ADD_NEW_SYNONYM_URL,
    body: {
      keyword: synonym,
      groupId: newGroupId,
    },
    callBack: getData,
  });

  const handleChange = (event) => {
    setSynonym(event.target.value);
  };

  const handleOnKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      postData();
    }
  };

  const navigateBack = () => {
    navigate(`search-page`);
  };

  return (
    <div>
      {error && <Alert color="danger">{error.response.data.message}</Alert>}
      {postError && (
        <Alert color="danger">{postError.response.data.message}</Alert>
      )}
      <Row className="d-flex justify-content-center">
        <Colxx lg={10} md={8} sm={10} xs={11} xxs={11}>
          <Card className="home-page-card">
            <CardBody>
              <Form>
                <FormGroup>
                  <div className="d-flex justify-content-center home-page-title">
                    <h1>The Word "{newWordId}" Was Added</h1>
                  </div>
                  <CardTitle className="input-label">
                    Do you wish to add synonym?
                  </CardTitle>
                  <Input
                    name="synonym"
                    placeholder="Please Enter The Synonym"
                    value={synonym}
                    onChange={handleChange}
                    onKeyPress={handleOnKeyPress}
                  />
                </FormGroup>
                <Row className="d-flex justify-content-center">
                  <Button
                    className="button-custom mt-1"
                    disabled={isLoading || !synonym.length}
                    onClick={postData}
                  >
                    Add Synonym
                  </Button>
                  <Button
                    className="ms-1 mt-1 button-custom"
                    onClick={navigateBack}
                  >
                    Back
                  </Button>
                </Row>
              </Form>
              {isLoading ? (
                <Loading />
              ) : (
                <SynonymsList synonymsData={synonymsData} />
              )}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
}
export default AddPage;
