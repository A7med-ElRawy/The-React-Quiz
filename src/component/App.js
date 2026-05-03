import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import Question from "./Question";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import StartHighScore from "./StartHighScore";
import Clock from "./Clock";

const SEC_PER_QUESTION = 30;
let initialState = {
  questions: [],
  status: "loading",
  index: 0,
  indexAnswer: null,
  points: 0,
  highScore: 0,
  timer: SEC_PER_QUESTION,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timer: state.questions.length * SEC_PER_QUESTION,
      };
    case "answerQuestion":
      let question = state.questions[state.index];
      return {
        ...state,
        indexAnswer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        indexAnswer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "tick":
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer === 0 ? "finished" : state.status,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore,
      };
    default:
      throw new Error("Unknown action type");
  }
}
function App() {
  const [
    { questions, status, index, indexAnswer, points, highScore, timer },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch("/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((pre, cur) => pre + cur.points, 0);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
            {highScore > 0 && <StartHighScore highScore={highScore} />}
          </>
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answer={indexAnswer}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              indexAnswer={indexAnswer}
            />
            <footer>
              <Clock timer={timer} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                indexAnswer={indexAnswer}
                index={index}
                num={numQuestions - 1}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            maxPoints={maxPoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
