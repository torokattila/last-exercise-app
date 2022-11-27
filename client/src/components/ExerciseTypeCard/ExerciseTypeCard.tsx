import { useMemo, useState } from 'react';
import ExerciseType from '../../models/ExerciseType';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

type Props = {
  exerciseType: ExerciseType;
};

type Card = {
  name: string;
};

const ExerciseTypeCard = ({ exerciseType }: Props) => {
  const cards: Card[] = useMemo(() => {
    const generatedCards: Card[] = [];

    if (exerciseType.seriesCardNumber) {
      for (let i = 0; i < exerciseType.seriesCardNumber; i++) {
        generatedCards.push({
          name: `${exerciseType.name} ${i + 1}`,
        });
      }
    }

    return generatedCards;
  }, [exerciseType]);

  const [dynamicCards, setDynamicCards] = useState<Card[]>(cards);

  const deleteCard = (card: Card) => {
    const filteredCards = dynamicCards.filter(
      (dCard) => dCard.name !== card.name
    );

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
    <div className="mt-1 flex flex-col items-center gap-3 px-3 lg:mt-3 lg:flex-row lg:flex-wrap lg:px-0">
      <>
        {dynamicCards.map((card, index: number) => (
          <div
            key={`type_card_${index}`}
            className="flex h-10 w-full cursor-pointer flex-col items-center justify-center rounded-2xl p-2 shadow-card transition-all hover:opacity-90 lg:w-43"
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
      </>
    </div>
  );
};

export default ExerciseTypeCard;
