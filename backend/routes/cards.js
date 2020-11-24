const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:_cardId', deleteCard);
router.put('/cards/likes/:_cardId', likeCard);
router.delete('/cards/likes/:_cardId', dislikeCard);
router.post('/cards', createCard);

module.exports = router;
