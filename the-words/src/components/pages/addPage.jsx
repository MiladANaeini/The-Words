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
import axios from "axios";
import LoadingComp from "../common/Loading";
import {
  SEARCH_WORD_URL,
  ADD_NEW_SYNONYM_URL,
} from "../../constants/constants";
import { Colxx } from "../common/Colxx";

function AddPage({ navigate }) {
  const [synonym, setSynonym] = useState("");
  const [synonymsData, setSynonymsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { newWordId, newGroupId } = useParams();
  const [error, setError] = useState(null);

  const addSynonym = () => {
    setError(null);
    axios
      .post(ADD_NEW_SYNONYM_URL, {
        keyword: synonym,
        groupId: newGroupId,
      })
      .then(() => {
        searchWords();
      })
      .catch((error) => {
        setError(error);
      });
  };

  const searchWords = () => {
    setError(null);
    setIsLoading(true);
    axios
      .get(SEARCH_WORD_URL, { params: { keyword: newWordId } })
      .then((res) => {
        setSynonymsData(res.data.synonyms);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  const handleChange = (event) => {
    setError(null);
    setSynonym(event.target.value);
  };

  const navigateBack = () => {
    navigate(`search-page`);
  };

  return (
    <div>
      {error && <Alert color="danger">{error.message}</Alert>}
      <Row className="d-flex justify-content-center">
        <Colxx lg={10} md={8} sm={10} xs={11} xxs={11}>
          <Card>
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
                  />
                </FormGroup>
                <Button
                  className="button-custom mt-1 "
                  disabled={isLoading || !synonym.length}
                  onClick={addSynonym}
                >
                  Add Synonym
                </Button>
                <Button className="ms-2 button-custom" onClick={navigateBack}>
                  Back
                </Button>
              </Form>
              {!isLoading ? (
                <div>
                  {synonymsData && (
                    <>
                      {synonymsData.length && (
                        <div>
                          <h4>synonyms : </h4>
                          {synonymsData.map((item) => {
                            return (
                              <div>
                                <h3>{item.name}</h3>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <LoadingComp />
              )}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
}
export default AddPage;
