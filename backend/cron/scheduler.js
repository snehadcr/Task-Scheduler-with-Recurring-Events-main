///@ts-nocheck

const cron = require('node-cron');
const fs = require('fs');
const tasksFile = '../db/tasks.json';

// Schedule recurring tasks
cron.schedule('* * * * *', () => { // Every minute
    console.log('Checking recurring tasks...');
    const tasks = JSON.parse(fs.readFileSync(tasksFile));
    const now = new Date();

    tasks.forEach(task => {
        const taskDate = new Date(task.date);
        if (taskDate.toISOString().slice(0, 16) === now.toISOString().slice(0, 16)) {
            console.log(`Reminder: ${task.name}`);
        }
    });
});
