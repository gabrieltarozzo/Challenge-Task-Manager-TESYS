<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function getAllTasks($perPage = 10)
    {
        return Task::paginate($perPage);
    }

    public function getTaskById($id)
    {
        return Task::find($id);
    }

    public function createTask($data)
    {
        return Task::create($data);
    }

    public function updateTask($id, $data)
    {
        $task = Task::find($id);
        if (!$task) {
            return null;
        }

        $task->update($data);
        return $task;
    }

    public function deleteTask($id)
    {
        $task = Task::find($id);
        if (!$task) {
            return false;
        }

        return $task->delete();
    }
}
