function StartHighScore({ highScore }) {
  return (
    <p className="startscreen-highscore">
      Your current high score is <strong>{highScore}</strong> points. Can you do
      better?
    </p>
  );
}

export default StartHighScore;
