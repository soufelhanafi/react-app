## Technical and architectural choices
### architecte choices
I chose to separate the shared components and pages, so I made a folder for the `components` that component that we can use in many other components or pages, and the folder `pages` for the routes.

### Technical choices
1- ant design libray: it's a famous UI library for react.js. I used it only for the spinning when loading data from the server and for the pagination. it's very useful to create a full React App.

2- react-router-dom: for routing

3- axios: to make http requests, sample and flexible to make http requests

4- node-scss: to compile .scss files to .css files

5- modular styling: to be sure will not be duplicate classes.

## Improvement
I made a quick view on the documentation and I saw there's some important api like:
1- Apis of items: the list of items that could be used in the game for healing, powering up, helping catch Pokémon, or to access a new area.
2- Apis of locations: list all locations can be visited in the game
3- Apis of machines: this can be used to teach the pokemon.

## Allocation with more time.
Of course I'll made a clean code with unit testing, that first. also I can work on the UI and made it look good than now :-D
