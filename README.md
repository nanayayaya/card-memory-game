# Card Memory Game

A classic card matching memory game built with HTML, CSS, and JavaScript. Test and improve your memory by finding pairs of matching cards hidden behind card backs.

## Live Demo

Visit [cardmemorygame.space](https://cardmemorygame.space) to play the game online.

## Features

- **Beautiful Apple-inspired Design**: Clean and modern user interface with Apple's design principles.
- **Responsive Layout**: Works perfectly on all devices from mobile phones to desktop computers.
- **Performance Tracking**: Track your moves, time, and star rating.
- **Animation Effects**: Smooth card flipping animations and visual feedback.
- **Brain Training**: Improve your memory and concentration skills while having fun.

## How to Play

1. All cards start face down, hiding their symbols.
2. Click on any card to flip it and reveal its hidden symbol.
3. Click on a second card to try to find its matching pair.
4. If the cards match, they stay flipped. If not, they turn back over.
5. Remember the symbols and their locations to make matches with fewer moves.
6. Complete the game by matching all pairs to see your performance stats.

## Game Rules

- The game starts when you click on the first card.
- Your star rating is based on the number of moves:
  - ★★★: Less than 8 moves
  - ★★: Between 9-12 moves
  - ★: More than 13 moves
- The timer starts on your first move and stops when all matches are found.
- You can restart the game at any time by clicking the restart button.

## Technical Details

### Technologies Used

- HTML5
- CSS3 (with custom animations)
- JavaScript (ES6)

### Code Structure

- `index.html`: Main HTML document structure
- `style.css`: All styling and animations
- `script.js`: Game logic and functionality

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Android Chrome

## Installation and Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/card-memory-game.git
```

2. Navigate to the project directory:
```bash
cd card-memory-game
```

3. Open index.html in your browser to start the game, or use a local server:
```bash
python -m http.server
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Card shuffling algorithm adapted from [Fisher-Yates (Knuth) Shuffle](https://stackoverflow.com/a/2450976)
- Icons provided by [Font Awesome](https://fontawesome.com/) 