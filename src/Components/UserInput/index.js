import React from "react";

export default class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearInput) {
      this.setState({ value: "" });
    }
  }

  handleChange = e => {
    const { currentWord, rightWrong } = this.props;
    let value = e.target.value;
    if (currentWord === value) {
      rightWrong(true, value);
    } else {
      rightWrong(false);
    }
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return <input onChange={this.handleChange} value={value} />;
  }
}
