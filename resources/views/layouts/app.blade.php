<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('resources/css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<body>
    <div id="app">
        @yield('menu')

        <div id="toast-container" class="position-fixed top-0 end-0 p-3">
            <!-- Os toasts serão adicionados aqui -->
            <div id="toast-success" class="toast align-items-center text-white bg-success" role="alert"
                aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        Tarefa criada com sucesso!
                    </div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"
                        aria-label="Fechar"></button>
                </div>
            </div>

            <div id="delete-toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true"
                data-autohide="true">
                <div class="toast-header">
                    <strong class="me-auto">Exclusão de Tarefa</strong>
                    <small>1 sec ago</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Tarefa excluída com sucesso!
                </div>
            </div>

            <div id="toast-success-edit" class="toast" role="alert" aria-live="assertive" aria-atomic="true"
                data-autohide="true">
                <div class="toast-header text-bg-primary">
                    <strong class="me-auto">Alteração</strong>
                    <small>1 sec ago</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Tarefa alterada com Sucesso!
                    <div class="mt-2 pt-2 border-top">
                        <button type="button" class="btn btn-primary btn-sm"
                            onclick="window.location.href = '/';">Voltar à lista</button>

                    </div>
                </div>
            </div>

            <div class="toast" id="error-toast" role="alert" aria-live="assertive" aria-atomic="true"
                data-delay="5000">
                <div class="toast-header text-bg-danger">
                    <strong class="me-auto">Alteração</strong>
                    <small>1 sec ago</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body" id="error-toast-message">
                    Preencha os campos corretamente.
                </div>
            </div>


        </div>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>

<!-- Scripts -->
<script src="{{ asset('resources/js/app.js') }}" defer></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>



<script>
    document.addEventListener('DOMContentLoaded', function() {
        var toastSuccess = new bootstrap.Toast(document.getElementById('toast-success'));

        @if (session('success'))
            var successMessage = '{{ session('success') }}';
            document.getElementById('toast-success').querySelector('.toast-body').textContent = successMessage;
            toastSuccess.show();
        @endif
    });

    document.addEventListener('DOMContentLoaded', function() {
        var toastSuccess = new bootstrap.Toast(document.getElementById('toast-success'));

        var urlParams = new URLSearchParams(window.location.search);
        var successMessage = urlParams.get('success_message');
        if (successMessage) {
            document.getElementById('toast-success').querySelector('.toast-body').textContent = successMessage;
            toastSuccess.show();
        }
    });

    $(document).ready(function() {
        // Verificar se o parâmetro 'toast' está presente na URL
        var urlParams = new URLSearchParams(window.location.search);
        var toastParam = urlParams.get('toast');

        if (toastParam === 'success') {
            $('#toast-success').toast('show');
        }
    });
</script>

@stack('scripts')

</html>
