@extends('layouts.app')

@section('menu')
    @include('includes.menu')
@endsection

@section('content')
    <div class="container-lg">
        <h1 class="text-center mb-4" style="color: #007bff;">Lista de Tarefas</h1>
        <div id="task-results"></div>
        <div id="pagination-links"></div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('resources/js/tasks/tasks.js') }}"></script>
@endpush
