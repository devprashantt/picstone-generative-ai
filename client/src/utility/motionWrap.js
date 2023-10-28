import Component from "react";
import { motion } from "framer-motion";

const MotionWrap = ({ children, ...props }) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export default MotionWrap;
