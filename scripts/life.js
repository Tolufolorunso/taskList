const todo = (function () {
  var clearStorageBtn = document.getElementById("clear-storage");
  var output = document.getElementById("output");
  var cancelBtn = document.querySelector(".cancel");
  // var todoState = "add";

  var category = document.getElementById("category");
  var title = document.getElementById("title");
  var message = document.getElementById("content");

  form = document.getElementById("form");

  function eventListener() {
    form.addEventListener("submit", addMessage);
    output.addEventListener("click", deleteTodoFromUI);
    output.addEventListener("click", editTodo);
    cancelBtn.addEventListener("click", cancelUpdate);
    clearStorageBtn.addEventListener("click", clearStorage);
  }

  function addMessage(e) {
    e.preventDefault();

    var category = document.getElementById("category");
    var message = document.getElementById("content");
    var title = document.getElementById("title");
    var id = document.getElementById("id");
    if (message.value === "" || title.value === "" || message.value === "") {
      showAlert("fail", "enter all feilds");
      return;
    }

    const todoObj = {
      category: category.value,
      message: message.value,
      title: title.value,
    };

    if (id.value === "") {
      todoObj._id =
        "todo-" +
        Math.floor(Math.random() * 500000) +
        title.value.substring(0, 3);
      addToLocalStorage(todoObj, "add");
      showAlert("success", "Task added successfully");
    } else {
      todoObj._id = id.value;
      addToLocalStorage(todoObj, "edit");
    }
    title.value = "";
    content.value = "";
  }

  function addToLocalStorage(todoObj, todoState) {
    const todoFromStorage = getTodoFromStorage();
    if (todoState === "add") {
      todoFromStorage.push(todoObj);
      localStorage.setItem("todos", JSON.stringify(todoFromStorage));
      addTodoToUI();
    } else if (todoState === "edit") {
      var oldTodo = todoFromStorage.filter(function (item) {
        return todoObj._id !== item._id;
      });
      oldTodo.push(todoObj);
      localStorage.setItem("todos", JSON.stringify(oldTodo));
      addTodoToUI();
      changeState("add");
      clearFields();
    }
  }

  function getTodoFromStorage() {
    var todos;
    const todoFromStorage = localStorage.getItem("todos");
    if (todoFromStorage === null) {
      todos = [];
    } else {
      todos = JSON.parse(todoFromStorage);
    }
    return todos;
  }

  function addTodoToUI() {
    const todoFromStorage = getTodoFromStorage();
    todoFromStorage.reverse();
    let htmlTemplate = "";

    todoFromStorage.forEach(function (todo) {
      htmlTemplate += `
       <div class="card" >
         <div class="card-body">
          <h4>${todo.title}</h4>
          <p class="card-text">${todo.message}</p>
         </div>
         <div class="card-footer">
          <input type="hidden" value="${todo.category}" class="" id="category"> 
          <a href="#" class="remove" data-id="${todo._id}" id="remove">
           <i class="fa fa-trash-alt"></i>
          </a>
          <a href="#add" id="edit" class="edit" data-id="${todo._id}">
           <i class="fa fa-edit"></i>
          </a>
         </div>
       </div>
      `;
    });
    output.innerHTML = htmlTemplate;
  }
  {
  }

  function deleteTodoFromUI(evt) {
    if (evt.target.classList.contains("remove")) {
      evt.target.parentElement.parentElement.remove();
      deleteFromStorage(evt.target.dataset.id);
      showAlert("success", "Task deleted successfully");
    }
  }

  function deleteFromStorage(id) {
    const todoFromStorage = getTodoFromStorage();

    const newTodos = todoFromStorage.filter(function (item) {
      return id !== item._id;
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function clearStorage(todo) {
    const clear = confirm("Are you sure you want to clear LocalStorage");
    if (clear == true) {
      localStorage.clear("todos");
      showAlert("success", "You cleared DB successfully");
      addTodoToUI();
      return false;
    } else {
      return;
    }
  }

  function editTodo(evt) {
    state = "edit";
    if (evt.target.classList.contains("edit")) {
      var id = evt.target.dataset.id;
      var title =
        evt.target.parentElement.previousElementSibling.firstElementChild
          .textContent;
      var message =
        evt.target.parentElement.previousElementSibling.lastElementChild
          .textContent;
      var category =
        evt.target.previousElementSibling.previousElementSibling.value;
      const todoEditObj = {
        id,
        title,
        category,
        message,
      };

      editT(todoEditObj);
    }
  }

  function editT(todo) {
    var id = document.getElementById("id");

    title.value = todo.title;
    message.value = todo.message;
    category.value = todo.category;
    id.value = todo.id;
    changeState("edit");
  }

  function changeState(state) {
    if (state === "edit") {
      document.getElementById("add-button").style.background = "orange";
      document.getElementById("add-button").style.color = "#fff";
      document.getElementById("add-button").textContent = "Update";
      document.getElementById("cancel").setAttribute("type", "button");
    } else {
      document.getElementById("add-button").textContent = "Add";
      document.getElementById("cancel").setAttribute("type", "hidden");
      document.getElementById("add-button").style.background = "#0eadf4";
    }
  }

  function cancelUpdate(evt) {
    if (evt.target.classList.contains("cancel")) {
      changeState("add");
      clearFields();
    }
  }
  // showAlert("success", "Task added successfully");

  function showAlert(alertType, alertMessage) {
    var alertDiv = document.getElementById("alert");
    var alertParagraph = document.getElementById("alert-p");

    if (alertType === "success") {
      alertParagraph.textContent = alertMessage;
      alertDiv.style.background = "green";
      alertDiv.style.opacity = 1;
    } else {
      alertParagraph.textContent = alertMessage;
      alertDiv.style.background = "red";
      alertDiv.style.opacity = 1;
    }

    setTimeout(function () {
      alertParagraph.textContent = "";
      alertDiv.style.background = "";
      alertDiv.style.opacity = 0;
    }, 2000);
  }

  function clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("category").value = "Select category";
    document.getElementById("id").value = "";
  }

  return {
    init: function event() {
      eventListener();
      addTodoToUI();
    },
  };
})();

todo.init();
// if (1) {
//   output.innerHTML = "<p>Write what hjhghj you have in mind</p>";
// }
