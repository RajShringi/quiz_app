import React from "react";
import { NavLink } from "react-router-dom";
import Categories from "./Categories";
import Difficulty from "./Difficulty";
import Loader from "./Loader";
import { myfetch } from "./utils/myFetch";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      userSelectedCategoryId: null,
      difficulty: null,
    };
  }
  async componentDidMount() {
    const data = await myfetch("https://opentdb.com/api_category.php");
    this.setState({
      categories: data.trivia_categories,
    });
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
  render() {
    const { categories, difficulty, userSelectedCategoryId } = this.state;
    if (!categories) {
      return <Loader />;
    }
    return (
      <>
        <Categories
          categories={categories}
          handleClickCategory={this.handleClickCategory}
          userSelectedCategoryId={userSelectedCategoryId}
        />
        <Difficulty
          difficulty={difficulty}
          handleDifficulty={this.handleDifficulty}
        />

        <NavLink to={`/question/${userSelectedCategoryId}/${difficulty}`}>
          <button
            disabled={!userSelectedCategoryId || !difficulty ? true : false}
            className="bg-zinc-700 text-white py-2 px-6 rounded-lg transition-all block mx-auto hover:bg-zinc-600 disabled:bg-gray-300"
          >
            Take Quiz
          </button>
        </NavLink>
      </>
    );
  }
}

export default Home;
