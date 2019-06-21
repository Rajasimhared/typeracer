import React from "react";

export default class RandomParagraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedUpto: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearInput) {
      this.setState({ fixedUpto: nextProps.upto });
    }
  }

  render() {
    const { paragraph, tagType, upto, counter, alphabets, found } = this.props;
    const { fixedUpto } = this.state;
    let CustomTag = tagType;
    return (
      <CustomTag>
        <span style={{ color: "#99cc00" }}>
          {paragraph.slice(0, found ? upto : fixedUpto)}
        </span>
        {!found && (
          <span style={{ color: "red" }}>
            {paragraph.slice(fixedUpto, upto)}
          </span>
        )}
        <span style={{ color: "black" }}>
          {paragraph.slice(upto, alphabets.length - 1)}{" "}
        </span>
      </CustomTag>
    );
  }
}
