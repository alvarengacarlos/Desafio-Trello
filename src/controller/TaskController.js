const database = require("../models/index");

class TaskController {

    static async getAllTasksFromTheList(req, res) {

        const listId = req.params.listId;

        try {
            const tasks = await database.Task.findAll({where: {ListId: listId}});

            if (tasks.length != 0)
                return res.status(200).json(tasks);

            return res.status(404).json({});

        } catch (error) {
            return res.status(500).json(error);
        }

    }

    static async getTaskByIdFromTheList(req, res) {

        const listId = req.params.listId;
        const taskId = req.params.id;

        try {

            const task = await database.Task.findOne({where: {
                id: taskId,
                ListId: listId
            }});

            if (task) 
                return res.status(200).json(task);
            
            return res.status(404).json({});

        } catch (error) {
            return res.status(500).json(error);
        }       

    }

    static async createTaskFromList(req, res) {
        
        const listId = req.params.listId;
        const tasksReceived = req.body;

        if (!TaskController.validateTasksReceived(tasksReceived))
            return res.status(400).json({message: "Tasks must be array"});        

        const tasksWithId = TaskController.addListIdToTasks(listId, tasksReceived);

        try {
            const tasks = await database.Task.bulkCreate(tasksWithId);

            return res.status(201).json(tasks);
        
        } catch (error) {
            return res.status(500).json(error);
        }

    }

    static validateTasksReceived(tasksReceived) {
        if (tasksReceived instanceof Array) 
            return true;

        return false;
    }

    static addListIdToTasks(listId, tasksArray) {
        tasksArray.forEach(element => element.ListId = listId);
        
        return tasksArray;
    }

    static async updateTaskByIdFromTheList(req, res) {

        const listId = req.params.listId;
        const taskId = req.params.id;
        const taskReceived = req.body;

        try {
            const result = await database.Task.update(taskReceived, {where: {
                id: taskId,
                ListId: listId
            }});

            if (result == 0) 
                return res.status(404).json({});

            const newTask = await database.Task.findOne({where: {id: taskId}});

            return res.status(200).json(newTask);

        } catch (error) {
            return res.status(500).json(error);
        }

    }

    static async deleteTaskByIdFromTheList(req, res) {

        const listId = req.params.listId;
        const taskId = req.params.id;

        try {
            const result = await database.Task.destroy({where: {
                id: taskId,
                ListId: listId
            }});

            if (result == 0) 
                return res.status(404).json({});

            return res.status(204).json({});

        } catch (error) {
            return res.status(500).json(error);
        }

    }

}

module.exports = TaskController;