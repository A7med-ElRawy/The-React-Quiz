import Options from "./Options.js";
function Question({ questions, dispatch, indexAnswer }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options
        questions={questions}
        dispatch={dispatch}
        indexAnswer={indexAnswer}
      />
    </div>
  );
}

export default Question;
