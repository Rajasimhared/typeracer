import React from "react";

export default class RandomParagraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedUpto: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    // Red only upto the wrong input
    // If it has to be for the whole word should add the clearInput condition
    this.setState({ fixedUpto: nextProps.wrongInput });
  }

  render() {
    const { paragraph, tagType, upto, alphabets, found } = this.props;
    const { fixedUpto } = this.state;
    let CustomTag = tagType;
    // The span renders the text by slicing string with indexes
    // Green to show the right typed charaters
    // Red will show up when the input is not the match in paragraph
    // Default has block with the left over indexes
    return (
      <CustomTag>
        <span style={{ color: "#99cc00" }}>
          {paragraph.slice(0, found || fixedUpto === 0 ? upto : fixedUpto - 2)}
        </span>
        {!found && (
          <span style={{ color: "red" }}>
            {paragraph.slice(upto - 1, fixedUpto === 0 ? 0 : fixedUpto - 1)}
          </span>
        )}
        <span style={{ color: "black" }}>
          {paragraph.slice(upto, alphabets.length - 1)}
        </span>
      </CustomTag>
    );
  }
}
