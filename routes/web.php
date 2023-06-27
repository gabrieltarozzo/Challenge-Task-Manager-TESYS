<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TaskController;

Route::get('/', [TaskController::class, 'index'])->name('tasks.index');

Route::get('/tasks', [TaskController::class, 'showTasks'])->name('tasks.show');

Route::get('/tasks/create', [TaskController::class, 'create'])->name('tasks.create');

Route::put('/tasks/{id}', [TaskController::class, 'update'])->name('tasks.update');

Route::get('/tasks/{id}', [TaskController::class, 'showTask'])
->name('task.show')
->where('id', '[0-9]+');

Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');

Route::delete('/tasks/{id}', [TaskController::class, 'destroy'])->name('tasks.destroy');




