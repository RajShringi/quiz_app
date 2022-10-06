import React from "react";
import Categories from "./Categories";
class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      categories: null,
      userSelectedCategoryId: null,
    };
  }
  async componentDidMount() {
    const url = "https://opentdb.com/api_category.php";
    const res = await fetch(url);
    const data = await res.json();
    this.setState({
      categories: data.trivia_categories,
    });
  }
  handleClickCategory = (categoryId) => {
    this.setState({
      userSelectedCategoryId: categoryId,
    });
  };
  render() {
    return (
      <div className="container mx-auto text-gray-700">
        {this.state.categories && (
          <Categories
            categories={this.state.categories}
            handleClickCategory={this.handleClickCategory}
          />
        )}
      </div>
    );
  }
}
export default App;
