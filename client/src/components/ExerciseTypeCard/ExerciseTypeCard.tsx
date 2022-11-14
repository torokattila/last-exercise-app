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
          <div className="shadow-card bg-white p-3 lg:p-4 rounded-2xl backdrop-blur-xl">
            <p className="text-left text-gray-800 font-medium lg:font-bold text-md lg:text-lg">
              Are you sure you want to delete this card?
            </p>

            <div className="mt-4 flex flex-row gap-x-2 justify-end">
              <button
                className="px-2 py-1 bg-[#4A9ECC] hover:bg-[#0e6696] rounded-full text-white transition-all"
                onClick={() => onClose()}
              >
                CANCEL
              </button>

              <button
                className="px-2 py-1 bg-red-500 transition-all hover:bg-red-700 rounded-full text-white font-bold"
                onClick={() => {
                  deleteCard(card);
                  onClose();
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3 items-center mt-1 lg:mt-3 px-3 lg:px-0">
      <>
        {dynamicCards.map((card, index: number) => (
          <div
            key={`type_card_${index}`}
            className="flex flex-col justify-center items-center rounded-2xl shadow-card h-10 w-full lg:w-43 p-2 cursor-pointer transition-all hover:opacity-90"
            style={{
              backgroundColor: exerciseType.seriesCardsColor,
              color: exerciseType.cardTextColor,
            }}
            onClick={() => handleDeleteCard(card)}
          >
            <h1 className="font-semibold text-md">{card.name}</h1>
          </div>
        ))}
      </>
    </div>
  );
};

export default ExerciseTypeCard;
