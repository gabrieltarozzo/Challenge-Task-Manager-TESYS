<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TaskService;

class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index()
    {
        return view('tasks.show');
    }

    public function showTasks()
    {
        try {
            $tasks = $this->taskService->getAllTasks();
            return response()->json($tasks);
        } catch (\Exception $ex) {
            return response()->json($ex->getMessage(), $ex->getCode());
        }
    }

    public function showTask($id)
    {
        try {
            $task = $this->taskService->getTaskById($id);

            if (!$task) {
                return response()->json(['error' => 'A tarefa solicitada não foi encontrada.'], 404);
            }

            if (request()->ajax()) {
                return response()->json($task);
            } else {
                return view('tasks.edit', compact('task'));
            }

        } catch (\Exception $ex) {
            return response()->json($ex->getMessage(), $ex->getCode());
        }
    }

    public function create()
    {
        return view('tasks.create');
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'titulo' => 'required',
                'descricao' => 'required',
            ]);
            $task = $this->taskService->createTask($data);
            return response()->json($task, 200);
            //   return response()->json(['message' => 'A tarefa foi cadastrada com sucesso.'], 200);

        } catch (ValidationException $ex) {
            return response()->json([
                'error' => 'Erro de validação',
                'messages' => $ex->errors(),
            ], 422);
        } catch (\Exception $ex) {
            return response()->json($ex->getMessage(), $ex->getCode());
        }
    }


    public function update(Request $request, $id)
    {
        try {
            $data = $request->validate([
                'titulo' => 'required',
                'descricao' => 'required',
            ], [
                'titulo.required' => 'O campo Título é obrigatório.',
                'descricao.required' => 'O campo Descrição é obrigatório.',
            ]);
            $task = $this->taskService->updateTask($id, $data);
            if (request()->ajax()) {
                return response()->json($task);
            } else {
                return view('tasks.edit', compact('task'));
            }
        } catch (ValidationException $ex) {
            return response()->json([
                'error' => 'Erro de validação',
                'messages' => $ex->errors(),
            ], 422);
        } catch (\Exception $ex) {
            return response()->json($ex->getMessage(), $ex->getCode());
        }
    }

    public function destroy($id)
    {
        try {
            $this->taskService->deleteTask($id);
            return response()->json(null, 204);
        } catch (\Exception $ex) {
            return response()->json($ex->getMessage(), $ex->getCode());
        }
    }
}
