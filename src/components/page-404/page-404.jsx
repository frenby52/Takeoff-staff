import React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

const Page404 = () => {
  return (
    <h3>404.<br />Page not found<Link to={AppRoute.ROOT}>Go to main page</Link></h3>
  );
};

export default Page404;

