function Categories({ categories, handleClickCategory }) {
  return (
    <div className="p-4 bg-gray-50 shadow-lg my-4 rounded-lg">
      <h3 className="text-2xl mb-4 text-center">Select Quiz Category</h3>
      <ul className="flex items-center flex-wrap">
        {categories.map((category) => {
          return (
            <li
              onClick={() => handleClickCategory(category.id)}
              className="bg-gray-100 m-1 p-2 cursor-pointer rounded-lg hover:bg-gray-200"
              key={category.id}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Categories;
