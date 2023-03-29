import React from "react";
import { Badge, Row, Col } from "reactstrap";

const SynonymsList = ({ synonymsData }) => {
  return (
    <div>
      {synonymsData && (
        <>
          {!!synonymsData.synonyms.length && (
            <div className="mt-1">
              <h4 className="font-weight-bold">Synonyms : </h4>
              <Row>
                {synonymsData.synonyms.map((item) => {
                  return (
                    <h3>
                      <Badge color="info">{item.name}</Badge>
                    </h3>
                  );
                })}
              </Row>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SynonymsList;
