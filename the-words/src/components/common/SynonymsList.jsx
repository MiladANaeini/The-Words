import React from "react";
import { Badge, Row } from "reactstrap";

const SynonymsList = ({ synonymsData, navigate }) => {
  const redirectToAddSynonyms = (item) => {
    navigate(`add-page/${item.id}/${item.groupId}`);
  };
  return (
    <div>
      {synonymsData && (
        <>
          {!!synonymsData.synonyms.length && (
            <div className="mt-1">
              <h4 className="font-weight-bold">Synonyms : </h4>
              <p>To add synonyms to an existing word click on the blue badge</p>
              <Row>
                {synonymsData.synonyms.map((item) => {
                  return (
                    <h3>
                      <Badge
                        className="cursor--pointer"
                        onClick={() => redirectToAddSynonyms(item)}
                        color="info"
                      >
                        {item.name}
                      </Badge>
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
