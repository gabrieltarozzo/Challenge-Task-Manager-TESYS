@extends('layouts.app')

@section('menu')
    @include('includes.menu')
@endsection

@section('content')
    <div class="container-lg">
        <h1 class="text-center mb-4" style="color: #007bff;">Criar Tarefa</h1>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <form id="taskForm" class="taskForm" method="POST">
                    @csrf
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label for="titulo">Título</label>
                        <input type="text" class="form-control" id="titulo" name="titulo" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="descricao">Descrição</label>
                        <textarea class="form-control" id="descricao" name="descricao" rows="5" required></textarea>
                    </div>
                    <br>
                    <button id="btn-save-task" type="submit" class="btn btn-primary">Criar Tarefa</button>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('resources/js/tasks/tasks.js') }}"></script>
@endpush
