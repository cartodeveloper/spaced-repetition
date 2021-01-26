import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../services/auth-api-service";
import Button from "../../components/Button/Button";

class DashboardRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = {
    error: null,
    language: "",
    score: 0,
    wordsPractice: "",
  };

  componentDidMount() {
    ApiService.getLanguage().then((data) => {
      this.setState({
        language: data.language.name,
        score: data.language.total_score,
      });
      this.renderWords(data.words);
    });
  }
  renderWords = (words) => {
    let wordsPractice = words.map((word) => {
      return (
        <li key={word.id}>
          <h4 className="word-original">{word.original}</h4>
          <p className="correct-guess">
            <img src="/images/correct-icon.png" alt="correct-icon" /> correct
            answer count: {word.correct_count}
          </p>
          <p className="incorrect-guess">
            <img src="/images/incorrect-icon.png" alt="incorrect-icon" />{" "}
            incorrect answer count: {word.incorrect_count}
          </p>
        </li>
      );
    });
    this.setState({
      wordsPractice,
    });
  };

  render() {
    const { error, language, score, wordsPractice } = this.state;
    return (
      <section className="dashboard">
        <h2 className="language">You are learning {language}</h2>
        <p className="DisplayScore">Total correct answers: {score}</p>
        <div role="alert" className="alert">
          {error && <p>{error}</p>}
        </div>
        <h3>Words to practice</h3>
        <hr />
        <div className="words-flex">{wordsPractice}</div>
        <Link to="/learn">
          <Button>Start practicing</Button>
        </Link>
      </section>
    );
  }
}

export default DashboardRoute;
