const superTest = require("supertest");
const db = require("../models/index");
const httpServer = require("../index");

beforeEach(async() => {
    await db.sequelize.sync({force: true});
});

afterEach(async() => {
    await db.sequelize.sync({force: true});
});

test("404 http status code for getAllLists", async () => {
    await superTest(httpServer)
        .get("/api/project/lists")
        .expect(404);
});

test("404 http status code for getListAndTasksById", async () => {
    
    await superTest(httpServer)
        .get("/api/project/lists/a23451233")
        .expect(404);

});

test("createList", async () => {
    
    const newList = { 
        title: "MyTitle",
        description: "MyDescription"           
    };
    
    await superTest(httpServer)
        .post("/api/project/lists")
        .send(newList)
        .expect(201);

});

test("getAllLists", async () => {

    await createList();

    await superTest(httpServer)
        .get("/api/project/lists")        
        .expect(200);

});

const createList = async () => {
    
    const newList = { 
        title: "MyTitle",
        description: "MyDescription"           
    };
    
    await superTest(httpServer)
        .post("/api/project/lists")
        .send(newList)
        .expect(201);

};

test("getListAndTasksById", async () => {
    
    await createList();

    const response = await superTest(httpServer)
        .get("/api/project/lists")
        .expect(200);
    
    const idList = JSON.parse(response.text)[0].id;
    
    await superTest(httpServer)
        .get(`/api/project/lists/${idList}`)
        .expect(200);

});

test("updateListById", async () => {
    
    await createList();

    const response = await superTest(httpServer)
        .get("/api/project/lists")
        .expect(200); 

    const idList = JSON.parse(response.text)[0].id;
    
    const newListUpdated = { 
        title: "MyTitle2",
        description: "MyDescription2"           
    };

    await superTest(httpServer)
        .patch(`/api/project/lists/${idList}`)
        .send(newListUpdated)
        .expect(200);

});

test("deleteListById", async () => {
    
    await createList();

    const response = await superTest(httpServer)
        .get("/api/project/lists")
        .expect(200); 

    const idList = JSON.parse(response.text)[0].id;

    await superTest(httpServer)
        .delete(`/api/project/lists/${idList}`)
        .expect(204);

});