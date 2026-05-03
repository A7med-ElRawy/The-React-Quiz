function Options({ questions, dispatch, indexAnswer }) {
  let hasAnswer = indexAnswer !== null;
  return (
    <div className="options">
      {questions.options.map((ques, i) => (
        <button
          className={`btn btn-option ${indexAnswer === i ? " answer" : ""} ${hasAnswer ? (i === questions.correctOption ? "correct" : "wrong") : ""} `}
          key={i}
          onClick={() => dispatch({ type: "answerQuestion", payload: i })}
          disabled={hasAnswer}
        >
          {ques}
        </button>
      ))}
    </div>
  );
}

export default Options;
