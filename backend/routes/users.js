const userRouter = require('express').Router();

const {
  getUsers, findUser, changeUserInfo, changeUserAvatar, getOwnerInfo
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getOwnerInfo);
userRouter.get('/:_userId', findUser);
userRouter.patch('/me', changeUserInfo);
userRouter.patch('/me/avatar', changeUserAvatar);

module.exports = userRouter;
