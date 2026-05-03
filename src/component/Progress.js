function Progress({ numQuestions, index, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question {index + 1} of {numQuestions}
      </p>
      <p>
        You have {points} of {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
