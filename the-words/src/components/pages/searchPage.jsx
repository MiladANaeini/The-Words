import React from "react";
function SearchPage({ navigate }) {
  return (
    <>
      <div>this is searchPage</div>
      <button onClick={() => navigate(`the-words`)}>The Words</button>
    </>
  );
}
export default SearchPage;
