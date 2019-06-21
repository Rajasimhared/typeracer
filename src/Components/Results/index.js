import React from "react";

const Results = ({ counter }) => (
  <div>
    Your time is up!
    <br />
    Words progressed per minute: {counter / 2}
  </div>
);
export default Results;
