import React from "react";
import { useHistory } from "react-router-dom";

function History() {
  let {history} = useHistory();

  function handleClick() {
    history.push("/question");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}

export default History;
