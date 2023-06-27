@extends('layouts.app')

@section('menu')
    @include('includes.menu')
@endsection

@section('content')
    <div class="container-lg">
        <h1 class="text-center mb-4" style="color: #007bff;">Editar Tarefa</h1>
        <form id="edit-task-form">
            <div class="form-group">
                <label for="titulo">Título</label>
                <input type="text" class="form-control" id="titulo" name="titulo">
            </div>
            <br>
            <div class="form-group">
                <label for="descricao">Descrição</label>
                <textarea class="form-control" id="descricao" name="descricao"></textarea>
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('resources/js/tasks/tasks.js') }}"></script>
    <script>
        $(document).ready(function() {
            var toastSuccess = $('#toast-success-edit');

            toastSuccess.hide();

            function showSuccessToast() {
                toastSuccess.show();
                setTimeout(function() {
                    toastSuccess.hide();
                }, 3000);
            }

            $('#edit-task-form').on('submit', function(event) {
                event.preventDefault();

                var formData = $(this).serialize();

                $.ajax({
                    url: '/tasks/' + taskId,
                    type: 'PUT',
                    data: formData,
                    success: function(response) {
                        showSuccessToast();
                    },
                    error: function(xhr, status, error) {
                        $('#error-toast').toast('show');
                    }
                });
            });

            var taskId = window.location.href.split('/').pop();
            $.ajax({
                url: '/tasks/' + taskId,
                type: 'GET',
                success: function(response) {
                    $('#titulo').val(response.titulo);
                    $('#descricao').val(response.descricao);
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        });
    </script>
@endpush
