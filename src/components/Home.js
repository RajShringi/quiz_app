import React from "react";
import Categories from "./Categories";
import Difficulty from "./Difficulty";
import Header from "./Header";
import Loader from "./Loader";
import Question from "./Question";
import { myfetch } from "./utils/myFetch";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      userSelectedCategoryId: null,
      difficulty: null,
      startQuiz: false,
    };
  }
  async componentDidMount() {
    if (localStorage.state) {
      this.setState({
        startQuiz: true,
        userSelectedCategoryId:
          JSON.parse(localStorage.state).userSelectedCategoryId || null,
        difficulty: JSON.parse(localStorage.state).difficulty || null,
      });
    } else {
      const data = await myfetch("https://opentdb.com/api_category.php");
      this.setState({
        categories: data.trivia_categories,
      });
    }
  }
  handleClickCategory = (categoryId) => {
    this.setState({
      userSelectedCategoryId: categoryId,
    });
  };
  handleDifficulty = (difficulty) => {
    this.setState({
      difficulty,
    });
  };
  handleStartQuiz = () => {
    this.setState({
      startQuiz: true,
    });
  };
  resetStateToDefault = async () => {
    if (!localStorage.state) {
      this.setState({
        categories: null,
        userSelectedCategoryId: null,
        difficulty: null,
        startQuiz: false,
      });
      const data = await myfetch("https://opentdb.com/api_category.php");
      this.setState({
        categories: data.trivia_categories,
      });
    }
    return;
  };
  render() {
    const { categories, difficulty, userSelectedCategoryId, startQuiz } =
      this.state;

    return (
      <div className="container mx-auto">
        <Header resetStateToDefault={this.resetStateToDefault} />
        {!categories && !startQuiz && <Loader />}
        {!startQuiz && categories && (
          <div>
            <Categories
              categories={categories}
              handleClickCategory={this.handleClickCategory}
              userSelectedCategoryId={userSelectedCategoryId}
            />
            <Difficulty
              difficulty={difficulty}
              handleDifficulty={this.handleDifficulty}
            />

            <button
              onClick={this.handleStartQuiz}
              disabled={!userSelectedCategoryId || !difficulty ? true : false}
              className="bg-zinc-700 text-white py-2 px-6 rounded-lg transition-all block mx-auto hover:bg-zinc-600 disabled:bg-gray-300"
            >
              Take Quiz
            </button>
          </div>
        )}
        {startQuiz && (
          <Question
            userSelectedCategoryId={userSelectedCategoryId}
            difficulty={difficulty}
          />
        )}
      </div>
    );
  }
}

export default Home;
