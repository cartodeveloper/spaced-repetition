import React, { Component } from "react";
import ApiService from "../../services/auth-api-service";
import Button from "../../components/Button/Button";
import { Input, Label } from "./../../components/Form/Form";

class LearningRoute extends Component {
  state = {
    error: null,
    showResults: false,
    correct: 0,
    incorrect: 0,
    nextWord: "",
    score: 0,
    isCorrect: false,
    original: "",
    translation: "",
    guess: "",
  };

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  componentDidMount() {
    this.getFirstWord();
  }

  getFirstWord = () => {
    ApiService.getNextWord().then((data) => {
      this.setState({
        nextWord: data.nextWord,
        original: data.nextWord,
        score: data.totalScore,
        incorrect: data.wordIncorrectCount,
        correct: data.wordCorrectCount,
        showResults: false,
      });
    });
  };

  getNextWord = () => {
    ApiService.getNextWord().then((data) => {
      this.setState({
        original: data.nextWord,
        incorrect: data.wordIncorrectCount,
        correct: data.wordCorrectCount,
        showResults: false,
      });
    });
  };

  handleGuess = (e) => {
    e.preventDefault();
    let guess = e.target["learn-guess-input"].value;
    guess = guess.toLowerCase();
    this.setState({
      guess,
    });
    ApiService.getResults(guess).then((data) => {
      this.setState({
        nextWord: data.nextWord,
        score: data.totalScore,
        incorrect: data.wordIncorrectCount,
        correct: data.wordCorrectCount,
        isCorrect: data.isCorrect,
        showResults: true,
        translation: data.answer,
      });
    });
  };

  handleNextWord = (e) => {
    e.preventDefault();
    this.setState({
      showResults: false,
    });
    this.getNextWord();
  };

  renderNextWord = () => {
    const { nextWord, incorrect, correct, score } = this.state;
    return (
      <section className="word-translation">
        <h2>Translate the word:</h2>
        <p className="DisplayScore">Your total score is: {score}</p>
        <span className="word-main">{nextWord}</span>
        <form onSubmit={this.handleGuess} className="answer-form">
          <Label htmlFor="learn-guess-input">
            What's the translation for this word?
          </Label>
          <Input
            type="text"
            name="learn-guess-input"
            id="learn-guess-input"
            required
          ></Input>
          <Button type="submit">Submit your answer</Button>
        </form>
        <p className="correct">
          You have answered this word correctly {correct} times.
        </p>
        <p className="incorrect">
          You have answered this word incorrectly {incorrect} times.
        </p>
      </section>
    );
  };

  renderResults = () => {
    let { isCorrect, guess, original, translation, score } = this.state;
    return (
      <section className="results">
        {isCorrect ? (
          <h2>
            You were correct!{" "}
            <span role="img" aria-label="happy">
              😆
            </span>
          </h2>
        ) : (
          <h2>
            Wrong answer, try again...
            <span role="img" aria-label="sad">
              🤔
            </span>
          </h2>
        )}
        <p className="feedback">
          The correct translation for <b>{original} </b> was{" "}
          <b>{translation}</b>
          and your answer was: <em> {guess}</em>!
        </p>
        <p className="DisplayScore">Your total score is:{score}</p>
        <Button onClick={this.handleNextWord}>More Words</Button>
      </section>
    );
  };

  render() {
    let { showResults } = this.state;
    return (
      <section>
        {showResults ? this.renderResults() : this.renderNextWord()}
      </section>
    );
  }
}

export default LearningRoute;
