function SingleQuestion({ question, activeIndex, handleAnswer, result }) {
  const answers = [question.correct_answer, ...question.incorrect_answers];
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <p className="bg-gray-300 p-2 rounded-lg">{question.category}</p>
        <p className="capitalize bg-gray-300 p-2 rounded-lg">
          {question.difficulty}
        </p>
      </div>

      <div>
        <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500">
          {activeIndex + 1} / 10 Questions
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-400">
          <div
            className="bg-green-300 h-2.5 rounded-full dark:bg-green-500"
            style={{ width: `${(activeIndex + 1) * 10}%` }}
          ></div>
        </div>
      </div>

      <div>
        <p className="text-xl mb-4">
          {activeIndex + 1}. {question.question}
        </p>
        <ul className="grid grid-cols-2 gap-5">
          {answers.map((answer, index) => (
            <li
              onClick={() => handleAnswer(answer)}
              key={index}
              className={`bg-gray-200 p-4 rounded-lg hover:bg-gray-300 cursor-pointer ${
                result[activeIndex] && result[activeIndex].userAnswer === answer
                  ? "bg-gray-400"
                  : ""
              }`}
            >
              {answer}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SingleQuestion;
