const todo = (function () {
  var category = document.getElementById("category"),
    content = document.getElementById("content"),
    output = document.getElementById("output");
  form = document.getElementById("form");

  form.addEventListener("submit", addMessage);

  function addMessage(e) {
    e.preventDefault();
    todoObj = {
      category: category.value,
      message: content.value,
    };

    addToLocalStorage(todoObj);
    addTodoToUI();

    content.value = "";
  }

  function addToLocalStorage(todoObj) {
    const todoFromStorage = getTodoFromStorage();
    todoFromStorage.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todoFromStorage));
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
    console.log(typeof todoFromStorage);
    // var htmlTemplate;
    var div = document.createElement("div");

    todoFromStorage.forEach(function (todo) {
      div += `
        <div class="">
         <h2 class="category">${todo.category}</h2>
         <p class="content">${todo.message}</p>
        </div>
      `;

      output.innerHTML = div;
      //   output.appendChild(ul);
    });
  }

  return {
    init: function event() {
      addTodoToUI();
    },
  };
})();

todo.init();
