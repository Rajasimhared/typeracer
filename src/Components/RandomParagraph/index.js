import React from "react";

export default class RandomParagraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { paragraph, tagType } = this.props;
    let CustomTag = tagType;
    return <CustomTag>{paragraph}</CustomTag>;
  }
}
