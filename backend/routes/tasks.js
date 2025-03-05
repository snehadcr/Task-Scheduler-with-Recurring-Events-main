//@ts-nocheck

const express = require('express');
const fs = require('fs');
const path = require('path');  // Required for absolute paths
const router = express.Router();

// Absolute path for the tasks.json file
const tasksFile = path.join(__dirname, '../db/tasks.json');

// Get All Tasks
router.get('/', (req, res) => {
    try {
        const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Failed to read tasks' });
    }
});

// Add a New Task
router.post('/', (req, res) => {
    try {
        const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
        const newTask = req.body;

        // Ensure new task has an id (for example, by using the next available id)
        newTask.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;

        tasks.push(newTask);
        fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add task' });
    }
});

// Update a Task
router.put('/:id', (req, res) => {
    try {
        const tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
        const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id, 10));

        if (taskIndex !== -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
            fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
            res.json(tasks[taskIndex]);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to update task' });
    }
});

// Delete a Task
router.delete('/:id', (req, res) => {
    try {
        let tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
        tasks = tasks.filter(task => task.id !== parseInt(req.params.id, 10));
        fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task' });
    }
});

module.exports = router;
