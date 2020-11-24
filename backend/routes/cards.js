const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.delete('/:_cardId', deleteCard);
cardsRouter.put('/likes/:_cardId', likeCard);
cardsRouter.delete('/likes/:_cardId', dislikeCard);
cardsRouter.post('/', createCard);

module.exports = cardsRouter;
