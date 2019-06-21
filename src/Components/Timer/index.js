import React from "react";
import { durationFormatter } from "../../Utils/utils";

const MemoizedFormatter = React.memo(durationFormatter);

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 120
    };
  }

  componentDidMount() {
    setInterval(this.timer, 1000);
  }

  timer = () => {
    const { time } = this.state;
    const { timeUp } = this.props;
    this.setState({ time: time - 1 }, () => time === 0 && timeUp(true));
  };

  render() {
    const { time } = this.state;
    const { counter } = this.props;
    return (
      <>
        <MemoizedFormatter time={time} />
        <br />
        {Math.round(counter / (time / 60))} wpm
      </>
    );
  }
}
