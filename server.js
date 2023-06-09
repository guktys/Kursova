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
        const query = "SELECT * FROM `users` WHERE `name` = ? AND `password` = ?";
        const rows = await conn.query(query, [name, pass]);

        if (rows.length > 0) {
            console.log('Login successful FOR ROLE ' + JSON.stringify(rows));
            res.json({ message: 'Login successful', login: true, id: rows[0].id, role:rows[0].role });
        } else {
            res.json({ message: 'Login failed', login: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
});
// Роут для получения данных из базы данных
app.get('/doctors', async (req, res) => {
    const query = "SELECT * FROM doctor";
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Failed to login'});
    }
});
app.get('/getDoctors', async (req, res) => {
    const { id } = req.query; // Используйте req.query для получения параметра id из строки запроса
    const query = "SELECT * FROM doctor WHERE userId = ?";
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query, [id]); // Передайте параметр id в качестве аргумента
        console.log('Doctor' + JSON.stringify(rows));
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get doctors' });
    }
});

app.post('/appoint', async (req, res) => {
    const {
        reason,
        doctor,
        data,
        user,
        pet
    } = req.body;

    let conn;
    try {
        conn = await pool.getConnection();
        const query = "INSERT INTO `doctor's_appointments` (`id`, `doctor`, `user`, `reason`, `data`,`pet`) VALUES (?, ?, ?, ?, ?,?)";
        const values = ['', doctor, user, reason, data,pet];
        const rows = await conn.query(query, values);
        if (rows.length > 0) {
            res.json({ message: 'Appointment created successfully' });
        } else {
            res.json({ message: 'I`m work vse ok' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
});
app.get('/data_appoint', async (req, res) => {
    const { user } = req.query;
    const query = "SELECT * FROM `doctor's_appointments` WHERE `user` = ?";
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query, [user]);

        res.json(rows);
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
app.get('/doctor_appoint', async (req, res) => {
    const { doctor } = req.query;
    const query = "SELECT * FROM `doctor's_appointments` WHERE `doctor` = ?";
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query, [doctor]);

        res.json(rows);
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
app.delete('/deleteAppoint', async (req, res) => {
    const { id } = req.query;
    const query = "DELETE FROM `doctor's_appointments` WHERE `id` = ?";
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(query, [id]);

        res.json({ message: 'Appointment deleted successfully', result: result.toString() });
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});
app.get('/getDoctors', async (req, res) => {
    const { id } = req.query;
    const query = "SELECT * FROM `doctor` WHERE `id` = ?";
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query, [id]);

        res.json(rows);
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
