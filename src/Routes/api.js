const express = require("express");
const profileController = require('../Controllers/profileController');
const toDoListController = require('../Controllers/toDoListController');
const authVerifyMiddleware = require('../Middlewares/authVerifyMiddleware');

const router = express.Router();


router.post('/CreateProfile', profileController.CreateProfile);
router.post('/UserLogin', profileController.UserLogin);

router.get('/SelectProfile',authVerifyMiddleware, profileController.SelectProfile);
router.post('/UpdateProfile',authVerifyMiddleware, profileController.UpdateProfile);

// todo api :::::::::

router.post('/CreateToDo', authVerifyMiddleware, toDoListController.CreateToDo);
router.get('/SelectToDo', authVerifyMiddleware, toDoListController.SelectToDo);
router.post('/UpdateTodo', authVerifyMiddleware, toDoListController.UpdateTodo);
router.post('/UpdateStatusTodo', authVerifyMiddleware, toDoListController.UpdateStatusTodo);
router.post('/RemoveTodo', authVerifyMiddleware, toDoListController.RemoveTodo);
router.post('/SelectTodoByStatus', authVerifyMiddleware, toDoListController.SelectTodoByStatus);
router.post('/SelectToDoByDate', authVerifyMiddleware, toDoListController.SelectToDoByDate);

module.exports = router;