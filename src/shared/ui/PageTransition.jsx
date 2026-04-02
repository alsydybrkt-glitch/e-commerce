import { motion as Motion } from "framer-motion";

const MotionDiv = Motion.div;

function PageTransitions({ children }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </MotionDiv>
  );
}

export default PageTransitions;
