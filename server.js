const mariadb = require('mariadb');
const cors = require('cors');
const express = require("express");

const app = express();
const port = 3001;

const pool = mariadb.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "vuebase"
});

app.use(cors());
app.use(express.json());


app.post('/pet', async (req, res) => {
    console.log('i`m work!!!')
    const { id } = req.body;
    console.log(id);
    const query = 'SELECT * FROM `pets` WHERE `owner` = ?';
let conn;
    try {

        conn = await pool.getConnection();
        const result = await conn.query(query, [id]);
        res.json(result);
        console.log(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch pets' });
    }
});

app.post('/user', async (req, res) => {
    const { name, pass } = req.body;

    let conn;
    try {
        conn = await pool.getConnection();
        const query = "SELECT id FROM `users` WHERE `name` = ? AND `password` = ?";
        const rows = await conn.query(query, [name, pass]);

        if (rows.length > 0) {
            res.json({ message: 'Login successful', login: true, id: rows[0].id });
        } else {
            res.json({ message: 'Login failed', login: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
