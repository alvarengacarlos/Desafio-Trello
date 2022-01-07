const express = require("express");
const listController = require("../controller/ListController");
const taskController = require("../controller/TaskController");

const routes = express();

/**
 * Lists routes
 */
routes.get("/api/project/lists", listController.getAllLists);
routes.get("/api/project/lists/:listId", listController.getListAndTasksById);
routes.post("/api/project/lists", listController.createList);
routes.patch("/api/project/lists/:id", listController.updateListById)
routes.delete("/api/project/lists/:id", listController.deleteListById);

/**
 * Tasks routes
 */
routes.get("/api/project/lists/:listId/tasks", taskController.getAllTasksFromTheList);
routes.get("/api/project/lists/:listId/tasks/:id", taskController.getTaskByIdFromTheList);
routes.post("/api/project/lists/:listId/tasks", taskController.createTaskFromList);
routes.patch("/api/project/lists/:listId/tasks/:id", taskController.updateTaskByIdFromTheList);
routes.delete("/api/project/lists/:listId/tasks/:id", taskController.deleteTaskByIdFromTheList);

module.exports = routes;