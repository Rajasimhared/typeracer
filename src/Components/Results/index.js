import React from "react";
import { TIME_LIMIT } from "../../Utils/constants";

// 2 minutes is taken as standard
const Results = ({ counter }) => (
  <>
    Your time is up!
    <br />
    Words progressed per minute: {counter / TIME_LIMIT}
  </>
);
export default Results;
