import React from "react";

export default class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      count: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearInput) {
      this.setState({ value: "", count: 0 });
    }
  }

  handleChange = e => {
    const { currentWord, rightWrong } = this.props;
    const { count } = this.state;
    let value = e.target.value;
    if (currentWord === value || value === currentWord.slice(0, count + 1)) {
      rightWrong(true, value, count + 1);
      this.setState({ count: count + 1 });
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
