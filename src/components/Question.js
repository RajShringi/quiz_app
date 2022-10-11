import React from "react";
import Loader from "./Loader";
import SingleQuestion from "./SingleQuestion";
import Result from "./Result";
import { myfetch } from "./utils/myFetch";

class Question extends React.Component {
  constructor(props) {
    super();
    this.state = {
      activeIndex: 0,
      questions: null,
      result: [],
      score: 0,
      isSubmited: false,
    };
  }

  increaseIndex = () => {
    this.setState((prevState) => {
      return {
        activeIndex: prevState.activeIndex + 1,
      };
    });
  };

  handleSubmit = () => {
    this.setState({
      isSubmited: true,
    });
  };

  getQuestions = async () => {
    const { userSelectedCategoryId, difficulty } = this.props;
    const data = await myfetch(
      `https://opentdb.com/api.php?amount=10&category=${userSelectedCategoryId}&difficulty=${difficulty}`
    );
    this.setState({
      questions: data.results,
    });
    console.log(data);
  };

  handleAnswer = (answer) => {
    let { result, score, activeIndex, questions } = this.state;
    let obj = {
      question: questions[activeIndex].question,
      userAnswer: answer,
      correct_answer: questions[activeIndex].correct_answer,
      isright: answer === questions[activeIndex].correct_answer ? "✅" : "❌",
    };
    result[activeIndex] = obj;

    score = result.reduce((acc, cur) => {
      if (cur.isright === "✅") {
        acc = acc + 1;
      }
      return acc;
    }, 0);

    this.setState({
      result,
      score,
    });
  };

  componentDidMount() {
    if (localStorage.state) {
      this.setState({
        questions: JSON.parse(localStorage.state).questions || [],
        activeIndex: JSON.parse(localStorage.state).activeIndex || 0,
        score: JSON.parse(localStorage.state).score || 0,
        result: JSON.parse(localStorage.state).result || [],
      });
    } else {
      this.getQuestions();
    }
    window.addEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  handleUpdateLocalStorage = () => {
    const { userSelectedCategoryId, difficulty } = this.props;
    localStorage.setItem(
      "state",
      JSON.stringify({ ...this.state, userSelectedCategoryId, difficulty })
    );
  };

  render() {
    const { activeIndex, questions, result, isSubmited, score } = this.state;
    return (
      <>
        {!questions && <Loader />}

        {!isSubmited && questions && (
          <div className="bg-gray-100 max-w-3xl mx-auto p-4 my-4 rounded-lg h-[450px]">
            <SingleQuestion
              question={questions[activeIndex]}
              activeIndex={activeIndex}
              handleAnswer={this.handleAnswer}
              result={result}
            />

            <div className="my-4 text-right">
              {activeIndex + 1 !== 10 ? (
                <button
                  disabled={
                    result[activeIndex] && result[activeIndex].userAnswer
                      ? false
                      : true
                  }
                  onClick={this.increaseIndex}
                  className={`bg-zinc-700 text-white py-2 px-6 rounded-lg transition-all hover:bg-zinc-600 disabled:bg-zinc-400`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={this.handleSubmit}
                  disabled={
                    result[activeIndex] && result[activeIndex].userAnswer
                      ? false
                      : true
                  }
                  className={`bg-zinc-700 text-white py-2 px-6 rounded-lg transition-all hover:bg-zinc-600 disabled:bg-zinc-400`}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {isSubmited && <Result result={result} score={score} />}
      </>
    );
  }
}
export default Question;
