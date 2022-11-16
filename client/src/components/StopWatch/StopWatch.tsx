import Timer from 'react-compound-timer';
import { Tooltip } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import playCircleFill from '@iconify/icons-eva/play-circle-fill';
import pauseCircleFill from '@iconify/icons-eva/pause-circle-fill';
import stopCircleOutline from '@iconify/icons-eva/stop-circle-outline';
import clockOutline from '@iconify/icons-eva/clock-outline';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import saveOutline from '@iconify/icons-eva/save-outline';
import { Icon } from '@iconify/react';

type Props = {
  show: boolean;
  setShowStopWatch: Dispatch<SetStateAction<boolean>>;
};

const StopWatch = ({ show, setShowStopWatch }: Props) => {
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
          className="fixed bottom-14 right-2 z-30 flex w-20 flex-row items-center justify-center rounded-full bg-gray-600 py-1 text-xl text-white shadow-card lg:bottom-10 lg:right-5 lg:py-1 lg:px-12"
        >
          <div
            className="absolute -top-1 right-1 cursor-pointer rounded-full bg-white"
            onClick={() => setShowStopWatch(false)}
          >
            <Icon
              icon={closeCircleFill}
              className="text-blues-1"
              fontSize={30}
            />
          </div>

          <Timer initialTime={0} startImmediately={false}>
            {({
              start,
              resume,
              pause,
              stop,
              reset,
              getTimerState,
              getTime,
            }: any) => (
              <motion.div
                className="flex flex-col items-center justify-center gap-y-1"
              >
                <div className="text-left">
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
                <div className="flex flex-row gap-x-1.5 pb-0.5">
                  <button onClick={start}>
                    <Icon
                      icon={playCircleFill}
                      fontSize={27}
                      className="rounded-full bg-white text-cyan-500"
                    />
                  </button>
                  <button onClick={pause}>
                    <Icon
                      icon={pauseCircleFill}
                      fontSize={27}
                      className="rounded-full bg-white text-green-500"
                    />
                  </button>
                  <button
                    onClick={() => {
                      reset();
                      stop();
                    }}
                  >
                    <Icon
                      icon={saveOutline}
                      fontSize={27}
                      className="text-red-400"
                    />
                  </button>
                </div>
              </motion.div>
            )}
          </Timer>
        </motion.div>
      ) : (
        <Tooltip title="Timer" arrow placement="left">
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
            className="fixed bottom-16 right-2 z-30 flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full bg-blues-1 shadow-card hover:bg-blues-2 lg:bottom-10 lg:right-5"
          >
            <Icon
              className="z-40"
              icon={clockOutline}
              color="white"
              fontSize={35}
            />
          </motion.div>
        </Tooltip>
      )}
    </AnimatePresence>
  );
};

export default StopWatch;
