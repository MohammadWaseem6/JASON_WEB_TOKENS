import express, { urlencoded } from 'express';
import users from '../LEARNAPIS/MOCK_DATA.json' assert { type: 'json' };
const app = express();
const port = 9090

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>`;

    return res.send(html);
});
app.get("/api/users", (req, res) => {
    return res.json(users)

});
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
})

app.post('/api/users', (req, res) => {
    const body = req.body;
    return res.json({ status: "successfully data sent", body })







})
app.listen(port, () => {
    console.log(`Listening at port: ${port} `);
});