import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div className="nomatch">
      <div>404</div>
      <div className="nomatch-title">Такой страницы не найдено(</div>
      <Link to="/">На главную</Link>
    </div>
  );
}

export default NoMatch;
