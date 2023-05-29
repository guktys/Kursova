const mariadb = require('mariadb');
const cors = require('cors');
const express = require("express");

const app = express();
const port = 3001; // Порт для сервера

const pool = mariadb.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "vuebase"
});

// Middleware для обработки CORS
app.use(cors());
app.use(express.json());
app.post('/user', async (req, res) => {
    // Извлекаем данные из тела запроса
    const { name, pass } = req.body;

    let conn;
    try {
        // Получаем соединение из пула
        conn = await pool.getConnection();

        // Создаем параметризованный SQL-запрос
        const query = "SELECT * FROM `users` WHERE `name` = ? AND `password` = ?";

        // Выполняем запрос с использованием параметров
        const rows = await conn.query(query, [name, pass]);

        if (rows.length > 0) {
            res.json({ message: 'Login successful' , login:true});

        } else {
            res.json({ message: 'Login failed', login:false});

        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
