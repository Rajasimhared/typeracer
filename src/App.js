import React from "react";
import logo from "./logo.svg";
import UserInput from "./Components/UserInput";
import RandomParagraph from "./Components/RandomParagraph";
import Timer from "./Components/Timer";
import Results from "./Components/Results";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraph: "",
      words: [],
      alphabets: [],
      currentWord: "",
      counter: 0,
      clearInput: false,
      tagType: "p",
      upto: 0,
      uptoBackup: 0,
      found: false,
      timeUp: false
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
          paragraph: para,
          alphabets: para.split("")
        });
      });
  }

  rightWrong = (flag, value, upto) => {
    const { currentWord, words, counter, uptoBackup } = this.state;
    if (flag && value === currentWord) {
      this.setState({
        currentWord: words[counter + 1],
        counter: counter + 1,
        clearInput: true,
        found: true,
        uptoBackup: this.state.upto + 2
      });
    } else if (value === currentWord.slice(0, upto)) {
      this.setState({ found: true, clearInput: false });
    } else {
      this.setState({ found: false, clearInput: false });
    }
    if (upto) {
      this.setState({ upto: upto + uptoBackup });
    }
  };

  timeUp = value => {
    this.setState({ timeUp: value });
  };

  render() {
    const {
      paragraph,
      words,
      currentWord,
      clearInput,
      tagType,
      alphabets,
      upto,
      counter,
      found,
      timeUp
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">TYPERACER</header>
        {timeUp ? (
          <Results counter={counter} />
        ) : (
          <>
            <Timer timeUp={this.timeUp} counter={counter} />
            <RandomParagraph
              paragraph={paragraph}
              tagType={tagType}
              upto={upto}
              alphabets={alphabets}
              counter={counter}
              found={found}
              clearInput={clearInput}
            />
            <UserInput
              currentWord={currentWord}
              rightWrong={this.rightWrong}
              clearInput={clearInput}
              alphabets={alphabets}
              upto={upto}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
