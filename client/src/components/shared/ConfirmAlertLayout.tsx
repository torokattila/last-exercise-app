import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  children: JSX.Element;
};

const ConfirmAlertLayout = ({ children }: Props) => {
  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 z-10 h-screen w-full bg-black opacity-80" />
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        exit={{
          scale: 0,
        }}
        transition={{
          duration: 0.4,
          type: 'spring',
        }}
        className="rounded-t-1.5 fixed inset-0 top-0 left-0 right-0 z-50 my-auto mx-auto h-20 rounded-2xl bg-white p-3 align-middle opacity-100 shadow-card lg:w-65"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmAlertLayout;
