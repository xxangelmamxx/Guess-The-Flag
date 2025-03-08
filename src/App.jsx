import { useState } from 'react';
import './App.css';

const flashcards = [
  {
    question: 'What is the only country that has more lakes than the rest of the world combined?',
    answer: 'Canada',
  },
  {
    question: 'What is the rarest blood type in the world?"?',
    answer: 'AB negative',
  },
  {
    question: 'What is the only rock that floats on water?',
    answer: 'Pumice',
  },
  {
    question: 'Which country has the most time zones (including overseas territories)?',
    answer: 'France',
  },
  {
    question: 'What is the chemical element with the highest melting point?',
    answer: 'Tungsten (W)',
  },
  {
    question: 'Who was the first U.S. president to be impeached?',
    answer: 'Andrew Johnson',
  },
  {
    question: 'What was the name of the ship that Charles Darwin traveled on during his voyage that led to the theory of evolution?',
    answer: 'HMS Beagle',
  },
  {
    question: 'What year did the Roman Empire officially fall?',
    answer: '476 AD',
  },
  {
    question: 'The longest reigning monarch in world history was from which country?',
    answer: 'PFrance (Louis XIV, 72 years)',
  },
  {
    question: 'What was the original name of New York City before being renamed by the British?',
    answer: 'New Amsterdam',
  },
  {
    question: 'What is the only planet that rotates on its side?',
    answer: 'Uranus',
  },
  {
    question: 'What is the mathematical term for a number that remains the same when flipped upside down?',
    answer: 'Strobogrammatic number',
  },
  {
    question: "What is the most abundant metal in the Earth's crust?",
    answer: 'Aluminum (Al)',
  },
  {
    question: 'What is the only human body part that cannot repair itself?',
    answer: 'Teeth',
  },
  {
    question: 'What is the scientific name for the fear of the number 13?',
    answer: 'Triskaidekaphobia',
  },
  {
    question: 'What is the only U.S. state that grows coffee commercially?',
    answer: 'Hawaii',
  },
  {
    question: 'The largest desert in the world is not the Sahara. What is it?',
    answer: 'Antarctic Desert',
  },
  {
    question: "What is the deepest known point in the world's oceans?",
    answer: 'Challenger Deep (Mariana Trench)',
  },
  {
    question: 'What is the name of the only non-rectangular flag in the world?',
    answer: 'Nepal',
  },
  {
    question: 'Which African country has the highest number of pyramids?',
    answer: 'Sudan',
  },
  {
    question: 'What was the real name of the author Mark Twain?',
    answer: 'Samuel Langhorne Clemens',
  },
  {
    question: 'In Greek mythology, who was the father of the Minotaur?',
    answer: 'King Minos',
  },
  {
    question: 'What is the longest novel ever written (by word count)?',
    answer: 'À la recherche du temps perdu (In Search of Lost Time) by Marcel Proust',
  },
  {
    question: 'In J.R.R. Tolkien’s The Lord of the Rings, what is the name of the sword that was reforged into Andúril?',
    answer: 'Narsil',
  },
  {
    question: 'Who is the only person to have won both an Oscar and a Nobel Prize?',
    answer: 'George Bernard Shaw',
  },
  {
    question: "In The Simpsons, what is Chief Wiggum's first name?",
    answer: 'Clancy',
  },
  {
    question: 'What was the first movie ever to win the Academy Award for Best Picture?',
    answer: 'Wings (1927)',
  },
  {
    question: 'What was the original name of the band "The Beatles"?',
    answer: 'The Quarrymen',
  },
  {
    question: 'What is the highest-grossing film of all time (adjusted for inflation)?',
    answer: 'Gone with the Wind (1939)',
  },
  {
    question: 'Which video game holds the record for the most copies sold worldwide?',
    answer: 'Minecraft',
  },
];

const Flashcard = ({ card, isFlipped, onCardClick }) => {
  return (
    <div
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={onCardClick}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">{card.question}</div>
        <div className="flashcard-back">{card.answer}</div>
      </div>
    </div>
  );
};

function App() {
  const getRandomCard = () =>
    flashcards[Math.floor(Math.random() * flashcards.length)];

  const [currentCard, setCurrentCard] = useState(getRandomCard());
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleNext = () => {
    setCurrentCard(getRandomCard());
    setIsFlipped(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Trivia Flashcards</h1>
        <h2>Let's play a guessing game! &#128527;</h2>
        <h3>Total Cards: {flashcards.length}</h3>
      </header>
      <main>
        <Flashcard
          card={currentCard}
          isFlipped={isFlipped}
          onCardClick={handleCardClick}
        />
        <button onClick={handleNext}>&#8594;</button>
      </main>
    </div>
  );
}

export default App;