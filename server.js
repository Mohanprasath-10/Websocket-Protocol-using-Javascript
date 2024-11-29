const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        try {
            const parsedMessage = JSON.parse(message);
            handleClientMessage(ws, parsedMessage);
        } catch (e) {
            console.error('Error parsing message:', e);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function handleClientMessage(ws, message) {
    switch (message.action) {
        case 'login':
            handleLogin(ws, message.payload);
            break;
        case 'getStudents':
            handleGetData(ws, 'students.json', 'studentsData');
            break;
        case 'addStudent':
            handleAdd(ws, 'students.json', message.payload, 'updateSuccess');
            break;
        case 'deleteStudent':
            handleDelete(ws, 'students.json', message.payload.id, 'updateSuccess');
            break;
        case 'updateStudent':
            handleUpdate(ws, 'students.json', message.payload, 'updateSuccess');
            break;
        case 'getTeachers':
            handleGetData(ws, 'teachers.json', 'teachersData');
            break;
        case 'addTeacher':
            handleAdd(ws, 'teachers.json', message.payload, 'updateSuccess');
            break;
        case 'deleteTeacher':
            handleDelete(ws, 'teachers.json', message.payload.id, 'updateSuccess');
            break;
        case 'updateTeacher':
            handleUpdate(ws, 'teachers.json', message.payload, 'updateSuccess');
            break;
        case 'getAdmins':
            handleGetData(ws, 'admins.json', 'adminsData');
            break;
        case 'addAdmin':
            handleAdd(ws, 'admins.json', message.payload, 'updateSuccess');
            break;
        case 'deleteAdmin':
            handleDelete(ws, 'admins.json', message.payload.id, 'updateSuccess');
            break;
        case 'updateAdmin':
            handleUpdate(ws, 'admins.json', message.payload, 'updateSuccess');
            break;
        default:
            console.error('Unknown action:', message.action);
            break;
    }
}

function handleLogin(ws, { username, password }) {
    if (username === 'admin' && password === 'password') {
        ws.send(JSON.stringify({ action: 'loginSuccess' }));
    } else {
        ws.send(JSON.stringify({ action: 'loginFailed' }));
    }
}

function handleGetData(ws, fileName, action) {
    const filePath = path.resolve(__dirname, fileName);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading ${fileName}:`, err);
            ws.send(JSON.stringify({ action, data: [] }));
            return;
        }
        try {
            const parsedData = JSON.parse(data);
            ws.send(JSON.stringify({ action, data: parsedData }));
        } catch (parseErr) {
            console.error(`Error parsing JSON from ${fileName}:`, parseErr);
            ws.send(JSON.stringify({ action, data: [] }));
        }
    });
}

function handleAdd(ws, fileName, item, successAction) {
    const filePath = path.resolve(__dirname, fileName);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading ${fileName}:`, err);
            ws.send(JSON.stringify({ action: 'updateFailed' }));
            return;
        }
        try {
            const items = JSON.parse(data);
            items.push(item);
            fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf-8', writeErr => {
                if (writeErr) {
                    console.error(`Error writing to ${fileName}:`, writeErr);
                    ws.send(JSON.stringify({ action: 'updateFailed' }));
                } else {
                    ws.send(JSON.stringify({ action: successAction }));
                }
            });
        } catch (parseErr) {
            console.error(`Error parsing JSON from ${fileName}:`, parseErr);
            ws.send(JSON.stringify({ action: 'updateFailed' }));
        }
    });
}

function handleDelete(ws, fileName, id, successAction) {
    const filePath = path.resolve(__dirname, fileName);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading ${fileName}:`, err);
            ws.send(JSON.stringify({ action: 'updateFailed' }));
            return;
        }
        try {
            let items = JSON.parse(data);
            items = items.filter(item => item.id !== id);
            fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf-8', writeErr => {
                if (writeErr) {
                    console.error(`Error writing to ${fileName}:`, writeErr);
                    ws.send(JSON.stringify({ action: 'updateFailed' }));
                } else {
                    ws.send(JSON.stringify({ action: successAction }));
                }
            });
        } catch (parseErr) {
            console.error(`Error parsing JSON from ${fileName}:`, parseErr);
            ws.send(JSON.stringify({ action: 'updateFailed' }));
        }
    });
}

function handleUpdate(ws, fileName, updatedItem, successAction) {
    const filePath = path.resolve(__dirname, fileName);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading ${fileName}:`, err);
            ws.send(JSON.stringify({ action: 'updateFailed' }));
            return;
        }
        try {
            let items = JSON.parse(data);
            items = items.map(item => item.id === updatedItem.id ? updatedItem : item);
            fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf-8', writeErr => {
                if (writeErr) {
                    console.error(`Error writing to ${fileName}:`, writeErr);
                    ws.send(JSON.stringify({ action: 'updateFailed' }));
                } else {
                    ws.send(JSON.stringify({ action: successAction }));
                }
            });
        } catch (parseErr) {
            console.error(`Error parsing JSON from ${fileName}:`, parseErr);
            ws.send(JSON.stringify({ action: 'updateFailed' }));
        }
    });
}

console.log('WebSocket server running on ws://localhost:8080');
