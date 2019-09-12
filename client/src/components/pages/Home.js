import React, { useContext, useEffect } from "react";
import Comics from "../comics/Comics";
import ComicForm from "../comics/ComicForm";
import ComicFilter from "../comics/ComicFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div class='grid-2'>
      <div>
        <ComicForm />
      </div>
      <div>
        <ComicFilter />
        <Comics />
      </div>
    </div>
  );
};

export default Home;
