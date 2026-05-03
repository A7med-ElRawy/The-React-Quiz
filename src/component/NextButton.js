function NextButton({ dispatch, indexAnswer, num, index }) {
  if (indexAnswer === null) return null;
  if (index < num) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  }
  if (num === index) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finished
        </button>
      </div>
    );
  }
}

export default NextButton;
