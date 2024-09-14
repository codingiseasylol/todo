let express = require("express");
let router = express.Router();
let pool = require("../pool");

router.get(`/api/todos`, async (req, res, next) => {
    try {
        let userId = req.userId;

        let query = `
            select *
            from todo
            where userId = ?
            ;
        `;

        let result = await pool.query(query, [userId]);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
});

router.post(`/api/todos`, async (req, res, next) => {
    try {
        let userId = req.userId;
        let todo = req.body;

        let query = `
            insert into todo 
                (
                    userId,
                    title, 
                    created
                )
            values 
                (
                    ?,
                    ?,
                    now()
                )
            ;
        `;

        let result = await pool.query(query, [userId, todo.title]);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
});

router.patch(`/api/todos/:todoId`, async (req, res, next) => {
    try {
        let { todoId } = req.params;
        let todo = req.body;
        let userId = req.userId;

        let query = `
            update todo
            set 
                title = ?,
                completed = ?,
                updated = now()
            where 
                id = ?
                and userId = ?
            ;
        `;

        let result = await pool.query(query, [todo.title, todo.completed, todoId, userId]);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
});

router.delete(`/api/todos/:todoId`, async (req, res, next) => {
    try {
        let { todoId } = req.params;
        let userId = req.userId;

        let query = `
            delete from todo
            where 
                id = ?
                and userId = ?
            ;
        `;

        let result = await pool.query(query, [todoId, userId]);

        res.status(200).send(result[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
