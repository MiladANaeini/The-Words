import React from "react";

function HomePage({ navigate }) {
  return (
    <>
      <div>This is the Home Page</div>
      <button onClick={() => navigate(`search-page`)}>SearchPage</button>
    </>
  );
}

export default HomePage;
