import express from 'express';
import { createTodo, deleteTodo, getAllTodos, getTodo, updateTodo } from '../controllers/todo.controller';


const router = express.Router()

router.route("/").get(getAllTodos);
router.route("/:id").get(getTodo);
router.route("/").post(createTodo);
router.route("/:id").patch(updateTodo);
router.route("/:id").delete(deleteTodo);

export default router;