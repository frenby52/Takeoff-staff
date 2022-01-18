import React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

const Page404 = () => {
  return (
    <h3 className="page404__title">Error 404.<br />Page was not found. <Link to={AppRoute.ROOT}>Go to main page</Link></h3>
  );
};

export default Page404;

