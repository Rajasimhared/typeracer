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
      timeUp: false,
      wrongInput: 0
    };
  }

  componentDidMount() {
    const { tagType } = this.state;
    let paragraph = "";

    // fetch paragraph from api.
    // for now taking single paragraph
    fetch("http://www.randomtext.me/api/")
      .then(response => response.json())
      .then(myJson => {
        let para = myJson.text_out;
        // extract one paragraph
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
    // Go to next word only when the match is true, clearInput, set flag to
    // found, taking backup of index by adding two more so as to exclude space
    if (flag && value === currentWord) {
      this.setState({
        currentWord: words[counter + 1],
        counter: counter + 1,
        clearInput: true,
        found: true,
        uptoBackup: this.state.upto + 2
      });
    } else if (value === currentWord.slice(0, upto)) {
      // reset clearInput flag
      this.setState({ found: true, clearInput: false });
    } else {
      // store the wrong input index inorder to display red
      this.setState({
        found: false,
        clearInput: false,
        wrongInput: this.state.uptoBackup + upto + 1
      });
    }
    if (upto) {
      // set upto only if it has defined value
      this.setState({ upto: upto + uptoBackup });
    }
  };

  timeUp = value => {
    // flag to show time up screen
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
      wrongInput,
      timeUp,
      uptoBackup
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
              wrongInput={wrongInput}
            />
            <UserInput
              currentWord={currentWord}
              rightWrong={this.rightWrong}
              clearInput={clearInput}
              alphabets={alphabets}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
