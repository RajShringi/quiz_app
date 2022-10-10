function Difficulty({ handleDifficulty, difficulty }) {
  return (
    <div className="p-4 bg-gray-50 mb-4 rounded-lg">
      <h3 className="text-2xl mb-4 text-center">Select Difficulty Level</h3>
      <ul className="flex items-center justify-center space-x-4">
        {["easy", "medium", "hard"].map((level) => {
          return (
            <li
              onClick={() => handleDifficulty(level)}
              key={level}
              className={`capitalize ${
                difficulty === level ? "bg-gray-300" : "bg-gray-100"
              }  mx-1 my-2 p-2 cursor-pointer rounded-lg hover:bg-gray-200 transition-all`}
            >
              {level}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Difficulty;
