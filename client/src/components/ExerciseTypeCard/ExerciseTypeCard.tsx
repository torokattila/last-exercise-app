import { useEffect, useMemo, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
// @ts-ignore
import 'react-confirm-alert/src/react-confirm-alert.css';
// @ts-ignore
import { Progress } from 'react-sweet-progress';
// @ts-ignore
import 'react-sweet-progress/lib/style.css';
import { getItem } from '../../lib/storage';
import ExerciseType from '../../models/ExerciseType';
import successTick from '@iconify/icons-eva/checkmark-circle-2-fill';
import { Icon } from '@iconify/react';

type Props = {
  exerciseType: ExerciseType;
};

type Card = {
  id: string;
  name: string;
};

const ExerciseTypeCard = ({ exerciseType }: Props) => {
  const isDarkMode = getItem('mode') === 'dark';
  const cards: Card[] = useMemo(() => {
    const generatedCards: Card[] = [];

    if (exerciseType.seriesCardNumber) {
      for (let i = 0; i < exerciseType.seriesCardNumber; i++) {
        generatedCards.push({
          id: `${exerciseType.name}_${i + 1}`,
          name: `${exerciseType.name}`,
        });
      }
    }

    return generatedCards;
  }, [exerciseType]);

  const [dynamicCards, setDynamicCards] = useState<Card[]>(() => [...cards]);
  const [progress, setProgress] = useState<number>(0);
  const isProgressCompleted = useMemo(() => {
    return progress === 100;
  }, [progress]);

  useEffect(() => {
    const totalCards = cards.length;
    const deletedCards = totalCards - dynamicCards.length;
    const newProgress = Math.round((deletedCards / totalCards) * 100);
    setProgress(newProgress);
  }, [dynamicCards, cards]);

  const deleteCard = (card: Card) => {
    const filteredCards = dynamicCards.filter((dCard) => dCard.id !== card.id);
    setDynamicCards(filteredCards);
  };

  const handleDeleteCard = (card: Card): void => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <div className="rounded-2xl bg-white p-3 shadow-card backdrop-blur-xl lg:p-4">
            <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
              Are you sure you want to delete this card?
            </p>

            <div className="mt-4 flex flex-row justify-end gap-x-2">
              <button
                className="rounded-full bg-[#4A9ECC] px-2 py-1 uppercase text-white transition-all hover:bg-[#0e6696]"
                onClick={() => onClose()}
              >
                cancel
              </button>

              <button
                className="rounded-full bg-red-500 px-2 py-1 font-bold uppercase text-white transition-all hover:bg-red-700"
                onClick={() => {
                  deleteCard(card);
                  onClose();
                }}
              >
                delete
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="px-3 lg:mt-3 lg:px-0">
      {/*Mobile*/}
      <div className="flex flex-row items-center justify-center gap-1">
        <h1 className="mt-3 text-center text-2xl font-semibold text-gray-800 dark:text-white">
          {exerciseType.name}
        </h1>
        {isProgressCompleted && (
          <Icon
            icon={successTick}
            className="mt-3 text-green-500 transition-all"
            fontSize={32}
          />
        )}
      </div>
      <div className="flex w-full flex-row justify-center !text-white">
        {!isProgressCompleted && (
          <Progress
            theme={{
              active: {
                color: exerciseType.seriesCardsColor,
              },
            }}
            style={{ width: '50%' }}
            percent={progress}
          />
        )}
      </div>
      <style>{`
        .react-sweet-progress-symbol {
          color: ${isDarkMode ? '#FFFFFF' : '#000000'};
          font-weight: bold;
        }
      `}</style>
      <div className="flex flex-col items-center lg:hidden">
        {dynamicCards.map((card) => (
          <div
            className={`
              relative mt-2.5 flex h-18 w-[80%] cursor-pointer flex-col 
              items-center justify-center rounded-3xl p-2 shadow-card 
              transition-all hover:opacity-90
            `}
            style={{
              backgroundColor: exerciseType.seriesCardsColor,
              color: exerciseType.cardTextColor,
            }}
            onClick={() => handleDeleteCard(card)}
          >
            <div className="absolute left-1.5 top-1.5 rounded-full bg-white py-0.75 px-2">
              <h1 className="text-2xl font-bold text-slate-800">
                {card.id.split('_')[1]}
              </h1>
            </div>
            <div
              className={`
                absolute top-1.5 right-1.5 self-start 
                overflow-hidden rounded-full border-2 py-1 
                px-2 font-semibold
              `}
              style={{ position: 'absolute' }}
            >
              <div
                style={{
                  backgroundColor: exerciseType.seriesCardsColor,
                  color: exerciseType.cardTextColor,
                  filter: 'brightness(0.6)',
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                }}
              />
              <div className="relative z-10">
                <p>
                  Repetitions:{' '}
                  {exerciseType.numberOfRepetitions !== null &&
                    exerciseType.numberOfRepetitions !== 0 && (
                      <span className="text-lg">
                        {exerciseType.numberOfRepetitions}
                      </span>
                    )}
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 w-full rounded-br-3xl rounded-bl-3xl bg-white py-1 px-2.5">
              <h1 className="text-xl font-semibold text-slate-800">
                {card.name}{' '}
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/*Desktop*/}
      <div className="hidden lg:flex lg:flex-row lg:flex-wrap lg:items-center lg:gap-3">
        {dynamicCards.map((card, index: number) => (
          <div
            key={`type_card_desktop_${index}`}
            className={`
              flex h-10 w-full cursor-pointer flex-col 
              items-center justify-center rounded-2xl p-2 shadow-card 
              transition-all hover:opacity-90 lg:w-43
            `}
            style={{
              backgroundColor: exerciseType.seriesCardsColor,
              color: exerciseType.cardTextColor,
            }}
            onClick={() => handleDeleteCard(card)}
          >
            <h1 className="text-md font-semibold">
              {card.name}{' '}
              {exerciseType.numberOfRepetitions !== null &&
                exerciseType.numberOfRepetitions !== 0 && (
                  <span>({exerciseType.numberOfRepetitions})</span>
                )}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseTypeCard;
