import Timer from 'react-compound-timer';
import playCircleFill from '@iconify/icons-eva/play-circle-fill';
import pauseCircleFill from '@iconify/icons-eva/pause-circle-fill';
import stopCircleOutline from '@iconify/icons-eva/stop-circle-outline';
import saveOutline from '@iconify/icons-eva/save-outline';
import { Icon } from '@iconify/react';

type Props = {
  show: boolean;
};

const StopWatch = ({ show }: Props) => {
  return (
    <div className="fixed py-1 lg:py-1 lg:px-12 z-30 top-9 lg:top-6 right-2 lg:right-5 bg-gray-600 w-20 text-xl flex flex-row justify-center items-center rounded-full text-white shadow-card">
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
          <div className="flex flex-col justify-center items-center gap-y-1">
            <div>
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
                  className="text-cyan-500 bg-white rounded-full"
                />
              </button>
              <button onClick={pause}>
                <Icon
                  icon={pauseCircleFill}
                  fontSize={27}
                  className="text-green-500 bg-white rounded-full"
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
          </div>
        )}
      </Timer>
    </div>
  );
};

export default StopWatch;
