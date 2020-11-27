const cardsRouter = require('express').Router();
const { Joi, celebrate, } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.delete('/:_cardId', celebrate({
  params: Joi.object().keys({
    _cardId: Joi.string().hex().required().length(24)
  })}), deleteCard)

cardsRouter.put('/:_cardId/likes',celebrate({
  params: Joi.object().keys({
    _cardId: Joi.string().required().hex().length(24),
  }),
}), likeCard);


cardsRouter.delete('/:_cardId/likes',celebrate({
  params: Joi.object().keys({
    _cardId: Joi.string().required().hex().length(24),
  }),
}), dislikeCard);


cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(https?\:\/\/)(www\.)?[a-z0-9]{1}[-\.\/a-z0-9-]*\.[a-z0-9]{1}[-\/a-z0-9-]*#?$/),
  }),
}), createCard);

module.exports = cardsRouter;

