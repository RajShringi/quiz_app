function Result({ result, score }) {
  return (
    <table className="border text-center mx-auto my-4 max-w-7xl">
      <thead className="">
        <tr>
          <th className="">Question</th>
          <th className="py-4 px-6 border">Correct Answer</th>
          <th className="py-4 px-6 border">You Selected</th>
          <th className="py-4 px-6 border">Right or Wrong</th>
        </tr>
      </thead>

      <tbody>
        {result.map((r, index) => {
          return (
            <tr key={index}>
              <td className="py-4 px-6 border text-left">{r.question}</td>
              <td className="py-4 px-6 border">{r.correct_answer}</td>
              <td className="py-4 px-6 border">{r.answer}</td>
              <td className="py-4 px-6 border">{r.rightorWrong}</td>
            </tr>
          );
        })}
        <tr>
          <td className="py-4 px-6 border font-bold">Total Score</td>
          <td className="py-4 px-6 font-bold">{score}</td>
        </tr>
      </tbody>
    </table>
  );
}
export default Result;
