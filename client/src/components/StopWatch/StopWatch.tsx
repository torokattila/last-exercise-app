import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import Timer from 'react-compound-timer';

import clockFill from '@iconify/icons-eva/clock-fill';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import pauseCircleOutline from '@iconify/icons-eva/pause-circle-outline';
import playCircleOutline from '@iconify/icons-eva/play-circle-outline';
import { Icon } from '@iconify/react';
import useExercise from '../../hooks/useExercise';

type Props = {
  show: boolean;
  setShowStopWatch: Dispatch<SetStateAction<boolean>>;
  setDuration: Dispatch<SetStateAction<string>>;
};

const StopWatch = ({ show, setShowStopWatch, setDuration }: Props) => {
  const { currentExercise } = useExercise();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const onStartPress = () => {
    setIsStarted(true);
    setIsPaused(false);
  };

  const onPausePress = () => {
    setIsPaused(true);
    setIsStarted(false);
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="expanded_timer"
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
          className={`
            fixed bottom-14 right-2 z-30 flex w-28 
            flex-row items-center justify-center
            rounded-3xl border-2 border-white 
            bg-gray-800 py-3.5 text-3xl text-white shadow-card 
            lg:bottom-10 lg:right-5 lg:py-1 lg:px-12
          `}
        >
          <div
            className="absolute -top-1.5 -right-1 cursor-pointer rounded-full bg-white shadow-card"
            onClick={() => {
              onPausePress();
              setShowStopWatch(false);
            }}
          >
            <Icon
              icon={closeCircleFill}
              className="text-gray-800 transition-all hover:text-blues-2"
              fontSize={52}
            />
          </div>

          <Timer initialTime={0} startImmediately={false}>
            {({ start, pause }: any) => (
              <motion.div className="relative mb-2 flex flex-col items-center justify-center gap-y-2.5">
                <div className="w-full rounded-full border-4 py-7 px-2 text-left font-semibold">
                  <Timer.Hours
                    formatValue={(num: number) => {
                      if (num < 10) {
                        return `0${num}`;
                      } else {
                        return `${num}`;
                      }
                    }}
                  />
                  :
                  <Timer.Minutes
                    formatValue={(num: number) => {
                      if (num < 10) {
                        return `0${num}`;
                      } else {
                        return `${num}`;
                      }
                    }}
                  />
                  :
                  <Timer.Seconds
                    formatValue={(num: number) => {
                      if (num < 10) {
                        return `0${num}`;
                      } else {
                        return `${num}`;
                      }
                    }}
                  />
                </div>
                <div className="absolute -bottom-3.5 flex flex-row gap-x-2 bg-gray-800">
                  {!isPaused && (
                    <button
                      onClick={() => {
                        pause();
                        onPausePress();
                      }}
                    >
                      <Icon
                        icon={pauseCircleOutline}
                        fontSize={65}
                        className="rounded-full text-green-500 transition-all hover:text-green-600"
                      />
                    </button>
                  )}
                  {!isStarted && (
                    <button
                      onClick={() => {
                        start();
                        onStartPress();
                      }}
                    >
                      <Icon
                        icon={playCircleOutline}
                        fontSize={65}
                        className="rounded-full text-cyan-500 transition-all hover:text-cyan-600"
                      />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </Timer>
        </motion.div>
      ) : (
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
          key="shrinked_timer"
          onClick={() => setShowStopWatch(true)}
          style={{
            backgroundColor: currentExercise?.cardColor,
          }}
          className={`
            fixed bottom-16 right-2 z-30 flex h-9 w-9 
            cursor-pointer flex-col items-center justify-center 
            rounded-full shadow-card hover:opacity-90 lg:bottom-10 
            lg:right-5
          `}
        >
          <Icon
            className="z-40"
            icon={clockFill}
            color={`${currentExercise?.textColor}`}
            fontSize={47}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StopWatch;
