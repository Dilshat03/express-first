const express = require('express')
const fs = require('fs')
const server = express()

server.use(express.json())

const getAllUsers = () => JSON.parse(fs.readFileSync('users.json', 'utf8'))


server.get('/api/users', (req, res) => {
    const users = getAllUsers()
    res.json(users)
})

server.get('/api/users/:id', (req, res) => {
    const users = getAllUsers()
    const selectedUser = users.find(el => el.id === +req.params.id)
    if (selectedUser) {
        res.json(selectedUser)
    } else {
        res.status(404).json({status: 'Not found'})
    }
})


server.delete('/api/users/:id', (req, res) => {
    const users = getAllUsers()
    const selectedUser = users.find(el => el.id === +req.params.id)
    const filteredUser = users.filter(el => el.id !== +req.params.id)
    fs.writeFileSync('users.json', JSON.stringify(filteredUser, null, 2))
    res.json(selectedUser)
})



server.post('/api/users', (req, res) => {
    const users = getAllUsers()
    const addUser = [...users, req.body]
    fs.writeFileSync("users.json", JSON.stringify(addUser, null, 2))
    res.json(addUser)
})

server.put("/api/users/:id", (req, res) => {
    const users = getAllUsers()
    const selectedUser = users.map(item => item.id === +req.params.id ? {...item, ...req.body} : item)
    fs.writeFileSync("users.json", JSON.stringify(selectedUser , null, 2))
    res.json(selectedUser)
})

// const port = process.env.PORT || 9000

server.listen(8000, () => {
    console.log('Server is running')
})