import React from "react";
import logo from "./logo.svg";
import UserInput from "./Components/UserInput";
import RandomParagraph from "./Components/RandomParagraph";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraph: "",
      words: [],
      currentWord: "",
      counter: 0,
      clearInput: false,
      tagType: "p"
    };
  }

  componentDidMount() {
    const { tagType } = this.state;
    let paragraph = "";
    fetch("http://www.randomtext.me/api/")
      .then(response => response.json())
      .then(myJson => {
        let para = myJson.text_out;
        para = para.split(`<${tagType}>`)[1].split(`</${tagType}>`)[0];
        this.setState({
          words: para.split(" "),
          currentWord: para.split(" ")[0],
          paragraph: para
        });
      });
  }

  rightWrong = (flag, value) => {
    const { currentWord, words, counter } = this.state;
    if (flag && value === currentWord) {
      this.setState({
        currentWord: words[counter + 1],
        counter: counter + 1,
        clearInput: true
      });
    }
  };

  render() {
    const { paragraph, words, currentWord, clearInput, tagType } = this.state;
    return (
      <div className="App">
        <header className="App-header">TYPERACER</header>
        <RandomParagraph paragraph={paragraph} tagType={tagType} />
        <UserInput
          currentWord={currentWord}
          rightWrong={this.rightWrong}
          clearInput={clearInput}
        />
      </div>
    );
  }
}

export default App;
