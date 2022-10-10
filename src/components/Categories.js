import { BiCategoryAlt } from "react-icons/bi";
function Categories({
  categories,
  handleClickCategory,
  userSelectedCategoryId,
}) {
  return (
    <div className="p-4 bg-gray-50 my-2 rounded-lg">
      <h3 className="text-2xl mb-4 text-center">Select Quiz Category</h3>
      <ul className="flex items-center flex-wrap">
        {categories.map((category) => {
          return (
            <li
              onClick={() => handleClickCategory(category.id)}
              className={`${
                userSelectedCategoryId === category.id
                  ? "bg-gray-300"
                  : "bg-gray-100"
              } mx-1 my-2 p-2 cursor-pointer rounded-lg hover:bg-gray-200 transition-all flex items-center space-x-4`}
              key={category.id}
            >
              <BiCategoryAlt />
              <p>{category.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Categories;
