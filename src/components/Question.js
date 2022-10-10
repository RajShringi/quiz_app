import React from "react";
import Loader from "./Loader";
import SingleQuestion from "./SingleQuestion";
import Result from "./Result";
import { myfetch } from "./utils/myFetch";
class Questions extends React.Component {
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
    const category = this.props.match.params.categoryId;
    const difficulty = this.props.match.params.difficulty;
    const data = await myfetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`
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
    console.log("component did mount");
    this.getQuestions();
  }
  componentWillUnmount() {
    console.log("component will unmoutn");
  }
  render() {
    const { activeIndex, questions, result, isSubmited, score } = this.state;
    console.log({ questions }, "inside render");
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
export default Questions;
