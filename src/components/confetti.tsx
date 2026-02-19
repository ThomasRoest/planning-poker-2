import { createPortal } from "react-dom";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export const RenderConfetti = () => {
  const { width, height } = useWindowSize();
  return createPortal(
    <Confetti width={width} height={height} numberOfPieces={200} />,
    document.body
  );
};
