$(document).ready(function () {
    loadTasks();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $(document).on('click', '#pagination-links a', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        loadTasks(url);
    });

    $('#taskForm').submit(function (event) {
        event.preventDefault();
        createTask();

    });

});

function loadTasks(url = '/tasks') {
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            if (data.data.length > 0) {
                displayTasks(data.data);
                displayPagination(data.links);
            } else {
                $('#task-results').html('');
                $('#pagination-links').html('');
                displayErrorToast();
            }
            if (data.success && data.message) {
                $('#toast-success .toast-body').text(data.message);
                var toastSuccess = new bootstrap.Toast($('#toast-success'));
                toastSuccess.show();
            }
        }
    });
}

function createTask(url = '/tasks') {

    var formData = $(this).serialize();
    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    var titulo = $('#titulo').val();
    var descricao = $('#descricao').val();

    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': csrfToken
        },
        data: {
            _token: $('meta[name="csrf-token"]').attr('content'),
            titulo: titulo,
            descricao: descricao
        },
        success: function (data) {
            window.location.href = "/?toast=success";
        },
        error: function () {
            alert("error!!!!");
        }
    });
}




function loadTask(id) {
    $.ajax({
        url: '/tasks/' + id,
        dataType: 'json',
        success: function (data) {
            // Processar a resposta com os dados da tarefa aqui
        },
        error: function (xhr) {
            displayErrorToast();
        }
    });
}

function displayErrorToast() {
    var toastHtml = '<div class="toast align-items-center text-white bg-danger" role="alert" aria-live="assertive" aria-atomic="true">' +
        '<div class="d-flex">' +
        '<div class="toast-body">' +
        'Nenhuma tarefa encontrada.' +
        '</div>' +
        '<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Fechar"></button>' +
        '</div>' +
        '</div>';

    $('#toast-container').html(toastHtml);

    var toast = new bootstrap.Toast($('#toast-container .toast'));
    toast.show();
}

function formatarDataHora(data) {
    const opcoes = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', opcoes);
}





function loadEditTask(taskId) {
    // Redirecionar para a página de edição
    window.location.href = '/tasks/' + taskId;

    // Executar o Ajax para carregar o HTML usando displayEditTask(task)
    $.ajax({
        url: '/tasks/' + taskId,
        type: 'GET',
        success: function (response) {
            displayEditTask(response);
        },
        error: function (xhr, status, error) {
            // Tratar erros, se necessário
            console.error(error);
        }
    });
}

function deleteTask(taskId) {
    $.ajax({
        url: '/tasks/' + taskId,
        type: 'DELETE',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            $('#delete-toast').toast('show');
            loadTasks();
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function displayTasks(tasks) {
    var taskHtml = '<div class="table-responsive"><table class="table table-striped table-bordered">';
    taskHtml += '<thead class="thead-dark"><tr><th scope="col">Título</th><th scope="col">Descrição</th><th scope="col">Criado em</th><th scope="col">Atualizado em</th><th scope="col">Ações</th></tr></thead>';
    taskHtml += '<tbody>';

    tasks.forEach(function (task) {
        taskHtml += '<tr>';
        taskHtml += '<td>' + task.titulo + '</td>';
        taskHtml += '<td>' + task.descricao + '</td>';
        taskHtml += '<td>' + formatarDataHora(task.created_at) + '</td>';
        taskHtml += '<td>' + formatarDataHora(task.updated_at) + '</td>';
        taskHtml += '<td>';
        taskHtml += '<a class="btn btn-primary btn-sm d-block mb-1 btn-edit" data-task-id="' + task.id + '" onclick="displayEditTask(' + task.id + ')">Editar</a>';
        taskHtml += '<form method="POST" class="d-inline">';
        taskHtml += '<input type="hidden" name="_method" value="DELETE">';
        taskHtml += '<button type="button" data-task-id="' + task.id + '" class="btn btn-danger btn-sm d-block btn-delete" style="width:100%;">Excluir</button>';
        taskHtml += '</form>';
        taskHtml += '</td>';
        taskHtml += '</tr>';
    });

    taskHtml += '</tbody></table></div>';

    $('#task-results').html(taskHtml);


    // Registrar evento de clique nos botões de exclusão
    $('.btn-delete').on('click', function () {
        var taskId = $(this).data('task-id');
        var confirmDelete = confirm('Tem certeza que deseja excluir esta tarefa?');

        if (confirmDelete) {
            deleteTask(taskId);
        }
    });

    $('.btn-edit').on('click', function () {
        var taskId = $(this).data('task-id');
        window.location.href = '/tasks/' + taskId;
    });
}


function displayPagination(links) {
    var paginationHtml = '<nav aria-label="Navegação de página"><ul class="pagination justify-content-center">';

    links.forEach(function (value) {
        var activeClass = value.active ? 'active' : '';
        paginationHtml += '<li class="page-item ' + activeClass + '">';
        paginationHtml += '<a class="page-link" href="' + value.url + '">' + value.label + '</a>';
        paginationHtml += '</li>';
    });

    paginationHtml += '</ul></nav>';

    $('#pagination-links').html(paginationHtml);
}

