import { useEffect } from "react";

function Clock({ timer, dispatch }) {
  const min = Math.floor(timer / 60);
  const sec = timer % 60;
  useEffect(() => {
    const tick = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(tick);
  }, [dispatch]);
  return (
    <div className="timer">
      <span>
        {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}{" "}
      </span>
    </div>
  );
}

export default Clock;
