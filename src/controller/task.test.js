const superTest = require("supertest");
const db = require("../models/index");
const httpServer = require("../index");

beforeEach(async () => {
    
    await db.sequelize.sync({force: true});

    const newList = { 
        "title": "MyTitle",
        "description": "MyDescription"           
    };
    
    await superTest(httpServer)
        .post("/api/project/lists")
        .send(newList)
        .expect(201);

});

afterEach(async () => {
    await db.sequelize.sync({force: true});
});

test("404 http status code for getAllTasksFromTheList", async () => {
    
    const idList = await getIdFromTheList();
    
    await superTest(httpServer)
        .get(`/api/project/lists/${idList}/tasks`)
        .expect(404);

});

getIdFromTheList = async () => {
    
    const response = await superTest(httpServer)
    .get("/api/project/lists")
    .expect(200);

    const idList = JSON.parse(response.text)[0].id;

    return idList;

};

test("404 http status code for getTaskByIdFromTheList", async () => {
    
    
    const idList = getIdFromTheList();
        
    await superTest(httpServer)
        .get(`/api/project/lists/${idList}/tasks/aebed123`)
        .expect(404);

});

test("createTaskFromList", async () => {
    
    

    const idList = await getIdFromTheList();

    const tasks = [
        {
            title: "MyTask1",
            taskRelevance: 1,
            completed: true
        },
        {
            title: "MyTask2",
            taskRelevance: 10,
            completed: false
        }
    ];

    await superTest(httpServer)
        .post(`/api/project/lists/${idList}/tasks`)
        .send(tasks)
        .expect(201);

});

test("updateTaskByIdFromTheList", async () => {
        
    const idList = await getIdFromTheList();

    await createTasks(idList);

    const taskResponse = await superTest(httpServer)
        .get(`/api/project/lists/${idList}/tasks`);

    const idTask = JSON.parse(taskResponse.text)[0].id;        
    
    const newTaskUpdated = {
        title: "MyTask1",
        taskRelevance: 8,
        completed: false
    };

    await superTest(httpServer)
        .patch(`/api/project/lists/${idList}/tasks/${idTask}`)
        .send(newTaskUpdated)
        .expect(200);

});

const createTasks = async (idList) => {

    const newTasks = [
        {
            title: "MyTask1",
            taskRelevance: 1,
            completed: true
        },
        {
            title: "MyTask2",
            taskRelevance: 10,
            completed: false
        }
    ];

    await superTest(httpServer)
        .post(`/api/project/lists/${idList}/tasks`)
        .send(newTasks)
        .expect(201);

}

test("deleteTaskByIdFromTheList", async () => {
    
    const idList = await getIdFromTheList();

    await createTasks(idList);

    const taskResponse = await superTest(httpServer)
        .get(`/api/project/lists/${idList}/tasks`);

    const idTask = JSON.parse(taskResponse.text)[0].id;
    
    await superTest(httpServer)
        .delete(`/api/project/lists/${idList}/tasks/${idTask}`)
        .expect(204);

});