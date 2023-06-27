<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">

        <a class="navbar-brand mr-auto" href="#">
            <img src="caminho/para/o/logo.png" alt="Logo">
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('tasks.create') }}">Cadastrar Tarefa</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="{{ route('tasks.index') }}">Home</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
