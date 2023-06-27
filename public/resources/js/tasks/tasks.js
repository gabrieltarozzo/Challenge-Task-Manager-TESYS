/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/tasks/tasks.js":
/*!*************************************!*\
  !*** ./resources/js/tasks/tasks.js ***!
  \*************************************/
/***/ (() => {

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
function loadTasks() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/tasks';
  $.ajax({
    url: url,
    dataType: 'json',
    success: function success(data) {
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
function createTask() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/tasks';
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
    success: function success(data) {
      window.location.href = "/?toast=success";
    },
    error: function error() {
      alert("error!!!!");
    }
  });
}
function loadTask(id) {
  $.ajax({
    url: '/tasks/' + id,
    dataType: 'json',
    success: function success(data) {
      // Processar a resposta com os dados da tarefa aqui
    },
    error: function error(xhr) {
      displayErrorToast();
    }
  });
}
function displayErrorToast() {
  var toastHtml = '<div class="toast align-items-center text-white bg-danger" role="alert" aria-live="assertive" aria-atomic="true">' + '<div class="d-flex">' + '<div class="toast-body">' + 'Nenhuma tarefa encontrada.' + '</div>' + '<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Fechar"></button>' + '</div>' + '</div>';
  $('#toast-container').html(toastHtml);
  var toast = new bootstrap.Toast($('#toast-container .toast'));
  toast.show();
}
function formatarDataHora(data) {
  var opcoes = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Date(data).toLocaleDateString('pt-BR', opcoes);
}
function loadEditTask(taskId) {
  // Redirecionar para a página de edição
  window.location.href = '/tasks/' + taskId;

  // Executar o Ajax para carregar o HTML usando displayEditTask(task)
  $.ajax({
    url: '/tasks/' + taskId,
    type: 'GET',
    success: function success(response) {
      displayEditTask(response);
    },
    error: function error(xhr, status, _error) {
      // Tratar erros, se necessário
      console.error(_error);
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
    success: function success(response) {
      $('#delete-toast').toast('show');
      loadTasks();
    },
    error: function error(xhr, status, _error2) {
      console.error(_error2);
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

/***/ }),

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/resources/js/tasks/tasks": 0,
/******/ 			"resources/css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["resources/css/app"], () => (__webpack_require__("./resources/js/tasks/tasks.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["resources/css/app"], () => (__webpack_require__("./resources/css/app.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;