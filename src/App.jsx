import { useState } from 'react';
import './App.css';

const flashcards = [
  {
    answer: 'South Africa',
    image: 'public/Flags/Bandeira-da-Africa-do-Sul.png'
  },
  {
    answer: 'Botswana',
    image: 'public/Flags/Flag_of_Botswana.svg.png'
  },
  {
    answer: 'Djibouti',
    image: 'public/Flags/Flag_of_Djibouti.svg.png'
  },
  {
    answer: 'Estonia',
    image: 'public/Flags/Flag_of_Estonia.svg.png'
  },
  {
    answer: 'India',
    image: 'public/Flags/Flag_of_India.svg.png'
  },
  {
    answer: 'Kazakhstan',
    image: 'public/Flags/Flag_of_Kazakhstan.svg.png'
  },
  {
    answer: 'Malta',
    image: 'public/Flags/Flag_of_Malta.svg.png'
  },
  {
    answer: 'Namibia',
    image: 'public/Flags/Flag_of_Namibia.svg.png'
  },
  {
    answer: 'Venezuela',
    image: 'public/Flags/Flag_of_Venezuela.svg.png'
  },
  {
    answer: 'United States of America',
    image: 'public/Flags/Flag_of_the_United_States_(DoS_ECA_Color_Standard).svg.png'
  },
];

// Special card to display when all flashcards have been answered correctly.
const congratsCard = {
  answer: "Bazinga! You got them all!!!",
  image: '' // No image for the congratulatory card
};

const Flashcard = ({ card, isFlipped, onCardClick }) => {
  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={onCardClick}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          {card.image ? (
            <img src={card.image} alt="Flashcard" className="flashcard-image" />
          ) : (
            <p>{card.answer}</p>
          )}
        </div>
        <div className="flashcard-back">
          {card.image ? <p>{card.answer}</p> : null}
        </div>
      </div>
    </div>
  );
};

function App() {
  // Initialize the deck: all flashcards except the first one.
  const initialDeck = flashcards.slice(1);
  // History stores objects: { card, guessedCorrectly }
  const initialHistory = flashcards.length > 0 ? [{ card: flashcards[0], guessedCorrectly: false }] : [];
  
  const [deck, setDeck] = useState(initialDeck);
  const [history, setHistory] = useState(initialHistory);
  // currentIndex points to the current card in history.
  const [currentIndex, setCurrentIndex] = useState(initialHistory.length > 0 ? 0 : -1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Retrieve current card info from history; if none exists, use congratsCard.
  const currentHistoryItem = (currentIndex >= 0 && currentIndex < history.length)
    ? history[currentIndex]
    : null;
  const currentCard = currentHistoryItem ? currentHistoryItem.card : congratsCard;
  const currentGuessed = currentHistoryItem ? currentHistoryItem.guessedCorrectly : false;

  const handleCardClick = () => {
    if (currentCard !== congratsCard) {
      setIsFlipped(prev => !prev);
      setFeedback("");
    }
  };

  const handleNext = () => {
    setFeedback("");
    // Try to move forward in history, skipping over cards that are already guessed.
    let newIndex = currentIndex + 1;
    while (newIndex < history.length && history[newIndex].guessedCorrectly) {
      newIndex++;
    }
    if (newIndex < history.length) {
      setCurrentIndex(newIndex);
      setIsFlipped(false);
      return;
    }
    // If history is exhausted, add the next card from the deck (if available).
    if (deck.length > 0) {
      const nextCard = deck[0];
      const newHistoryItem = { card: nextCard, guessedCorrectly: false };
      setHistory([...history, newHistoryItem]);
      setDeck(deck.slice(1));
      setCurrentIndex(history.length); // newHistoryItem will be added at the end.
      setIsFlipped(false);
      setGuess('');
      return;
    }
    // If all cards have been answered correctly, then show the congrats card.
    const allGuessed = history.every(item => item.guessedCorrectly);
    if (allGuessed && history.length > 0 && currentCard !== congratsCard) {
      setHistory([...history, { card: congratsCard, guessedCorrectly: true }]);
      setCurrentIndex(history.length);
      setIsFlipped(false);
    }
  };

  const handleBack = () => {
    setFeedback("");
    // Move backward until an active (not guessed) card is found.
    let newIndex = currentIndex - 1;
    while (newIndex >= 0 && history[newIndex].guessedCorrectly) {
      newIndex--;
    }
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
      setIsFlipped(false);
    }
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (currentCard === congratsCard) return;
    if (guess.trim().toLowerCase() === currentCard.answer.trim().toLowerCase()) {
      // Mark the current card as guessed correctly in history.
      const updatedHistory = history.map((item, index) =>
        index === currentIndex ? { ...item, guessedCorrectly: true } : item
      );
      setHistory(updatedHistory);
      setScore(prevScore => {
        const newScore = prevScore + 1;
        setFeedback("Correct!");
        // If the last card is guessed correctly, automatically display the congrats card.
        if (newScore === flashcards.length) {
          setHistory(prevHistory => {
            const newHistory = [...prevHistory, { card: congratsCard, guessedCorrectly: true }];
            setCurrentIndex(newHistory.length - 1);
            return newHistory;
          });
          setIsFlipped(false);
        }
        return newScore;
      });
    } else {
      setFeedback("Incorrect! Try again.");
    }
    setGuess('');
  };

  return (
    <div className="mosaic-background">
      <div className="App">
        <header>
          <h1>Fun With Flags</h1>
          <h2>Bet you can't guess these flags' country &#128527;</h2>
          <h3>Total Cards Remaining: {flashcards.length - score}</h3>
        </header>
        <main style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
          <div className="flashcard-section">
            <div className="flashcard-container">
              <Flashcard card={currentCard} isFlipped={isFlipped} onCardClick={handleCardClick} />
              {currentCard !== congratsCard && (
                <>
                  <button className="back-button" onClick={handleBack} disabled={currentIndex === 0}>
                    Back
                  </button>
                  <button className="next-button" onClick={handleNext}>
                    Next
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="guess-section">
            <h4>Guess the Answer</h4>
            <form onSubmit={handleGuessSubmit}>
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
                disabled={currentCard === congratsCard || currentGuessed}
              />
              <button type="submit" disabled={currentCard === congratsCard || currentGuessed}>
                Submit Guess
              </button>
            </form>
            {feedback && (
              <p style={{ color: feedback.startsWith("Correct") ? 'green' : 'red' }}>{feedback}</p>
            )}
            <p>Score: {score}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
