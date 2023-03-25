import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/common/Loading";
import { useNavigate } from "react-router";

const HomePage = React.lazy(() => import("../components/pages/homePage"));
const SearchPage = React.lazy(() => import("../components/pages/searchPage"));

const AppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Suspense fallback={<Loading />}>
      <Routes basename="/the-words">
        <Route
          path="/the-words"
          element={<HomePage navigate={navigate} />}
        ></Route>
        <Route
          path="/search-page"
          element={<SearchPage navigate={navigate} />}
        ></Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
