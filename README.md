# Desafio Trello
Api to exercise knowledge learned in Alura ORM, Nodejs and Express courses. She looks like Trello or something to take notes.

The concept is basic a LIST has none or several TASKS.

# End Points

## Lists
|Url|Http Verb|Parameters|Body Json|
|:---|:---|:---|:---|
|/api/project/lists|GET|empty|empty|
|/api/project/lists/id|GET|:id|empty|
|/api/project/lists|POST|empty|yes|
|/api/project/lists/id|PATCH|:id|yes|
|/api/project/lists/id|DELETE|:id|yes|

### Body Json Example
```json
{
    "title": "Begin",
    "description": "Begin is ..."    
}
```
## Tasks
|Url|Http Verb|Parameters|Body Json|
|:---|:---|:---|:---|
|/api/project/lists/listId/tasks|GET|:listId|empty|
|/api/project/lists/listId/tasks/taskId|GET|:listId :taskId|empty|
|/api/project/lists/listId/tasks|POST|:listId|yes|
|/api/project/lists/listId/tasks/taskId|PATCH|:listId :taskId|yes|
|/api/project/lists/listId/tasks/taskId|DELETE|:listId :taskId|empty|

### Body Json Example
```json
[
    {
        "title": "Create task 1",
        "taskRelevance": 10, //Number from 1 to 10
        "completed": true // Boolean
    },
    {
        "title": "Create task 2",
        "taskRelevance": 2,
        "completed": false
    }
]
```

# Database Used
[
    ![](https://mariadb.org/wp-content/uploads/2019/10/mariadb_logo.svg)
](https://www.mariadb.org)