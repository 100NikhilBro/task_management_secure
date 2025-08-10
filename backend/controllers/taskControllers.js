const Task = require("../models/task");
const User = require("../models/user");

exports.createTask = async(req, res) => {
    try {


        const { name, body, status } = req.body;

        const userid = req.user.id


        if (!name || !body || !status || !userid) {
            return res.status(400).json({ msg: "name, body, and status are required to create task" });
        }

        const task = await Task.create({ name, body, status, createdBy: userid });

        // user mein bhi to add krna hai --> array mein 
        await User.findByIdAndUpdate(userid, { $push: { tasks: task._id } });

        res.status(201).json({
            message: "Task created successfully",
            task: {
                name: task.name,
                body: task.body,
                status: task.status,
                createdBy: userid
            },
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Failed to create a task" });
    }
};



exports.updateTask = async(req, res) => {
    try {
        const taskId = req.params.id;
        const updates = req.body;

        if (!taskId) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        Object.assign(task, updates);

        await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            task: {
                id: task._id,
                name: task.name,
                body: task.body,
                status: task.status,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update task" });
    }
};




exports.deleteTask = async(req, res) => {
    try {
        const taskid = req.params.id;

        if (!taskid) {
            return res.status(400).json({
                message: "Task ID is required"
            });
        }

        const deletedTask = await Task.findByIdAndDelete(taskid);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found or already deleted"
            });
        }

        // Remove the deleted task ID from the creator user's tasks array
        await User.findByIdAndUpdate(deletedTask.createdBy, {
            $pull: { tasks: taskid }
        });

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (e) {
        console.error("Delete Task Error:", e);

        return res.status(500).json({
            message: "Failed to delete the task"
        });
    }
};




exports.getAllTasks = async(req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;

        const tasks = await Task.find({ createdBy: userId })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        const totalCount = await Task.countDocuments({ createdBy: userId });

        res.json({
            tasks,
            page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};





exports.getTaskByStatus = async(req, res) => {
    try {
        const userId = req.user.id;
        const status = req.params.status;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;

        const tasks = await Task.find({ createdBy: userId, status: status })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        const totalCount = await Task.countDocuments({ createdBy: userId, status: status });

        res.json({
            tasks,
            page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};