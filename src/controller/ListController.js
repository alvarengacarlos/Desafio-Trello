const database = require("../models/index");

class ListController {

   
    static async getListAndTasksById(req, res) {
        
        const listId = req.params.listId;        
    
        const t = await database.sequelize.transaction();

        try {
            
            const list = await database.List.findOne({
                where: {id: listId},
                transaction: t
            });

            if (!list) {
                t.rollback();
                return res.status(404).json({});
            }
            
            const tasks = await database.Task.findAll({
                where: {ListId: listId},
                transaction: t
            });                  
            
            const listWithTasks = ListController
                .createObjectStructureToPresentListWithTasks(list, tasks);            

            await t.commit();
            return res.status(200).json(listWithTasks);
        
        } catch(error) {
            await t.rollback();
            return res.status(500).json(error);
        }

    }   

    static createObjectStructureToPresentListWithTasks(list, tasks) {
        
        const t = tasks.map(element => element.dataValues);
        return {...list.dataValues, task: t};

    }
   

    static async getAllLists(req, res) {
        
        const t = await database.sequelize.transaction();

        try {
            const lists = await database.List.findAll({transaction: t});

            if (lists.length == 0) {
                t.rollback();
                return res.status(404).json({});
            }
            
            let listsArray = [];
            for (let l of lists) {                            
                
                const tasksFromList = await database.Task.findAll({
                    where: {ListId: l.dataValues.id},
                    transaction: t                    
                });
                
                listsArray.push(
                    ListController.createObjectStructureToPresentListWithTasks(l, tasksFromList)
                );

            }

            t.commit();
            res.status(200).json(listsArray);

        } catch (error) {
            t.rollback();
            return res.status(500).json(error);
        }

    }
   

    static async createList(req, res) {
        
        const listReceived = req.body;

        try {
            const newList = await database.List.create(listReceived);

            return res.status(201).json(newList);
            
        } catch (error) {
            return res.status(500).json(error);
        }

    }

    static async updateListById(req, res) {

        const listId = req.params.id;
        const listReceived = req.body;

        try {
            const result = await database.List.update(listReceived, {where: {id: listId}});           
            
            if (result == 0)
                return res.status(404).json({});

            const newList = await database.List.findOne({where: {id: listId}});

            return res.status(200).json(newList);

        } catch (error) {
            return res.status(500).json(error);
        }

    }

    static async deleteListById(req, res) {

        const listId = req.params.id;

        try {
            const result = await database.List.destroy({where: {id: listId}});
            
            if (result == 0)
                return res.status(404).json({});

            return res.status(204).json({});
        
        } catch (error) {
            return res.status(500).json(error);
        }

    }    
}

module.exports = ListController;