document.addEventListener("DOMContentLoaded", function() {
  const todoValue = document.getElementById("todoText");
  const todoAlert = document.getElementById("Alert");
  const listItems = document.getElementById("list-items");
  const addUpdate = document.getElementById("AddUpdateClick");

  let todo = JSON.parse(localStorage.getItem("todo-list"));
  if (!todo) {
      todo = [];
  }

  window.CreateToDoItems = function() {
      if (todoValue.value === "") {
          todoAlert.innerText = "Please enter your todo text!";
          todoValue.focus();
      } else {
          let IsPresent = false;
          todo.forEach((element) => {
              if (element.item == todoValue.value) {
                  IsPresent = true;
              }
          });

          if (IsPresent) {
              setAlertMessage("This item is already present in the list!");
              return;
          }

          let li = document.createElement("li");
          const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                            <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" />
                            <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" /></div></div>`;
          li.innerHTML = todoItems;
          listItems.appendChild(li);

          let itemList = { item: todoValue.value, status: false };
          todo.push(itemList);
          setLocalStorage();
      }
      todoValue.value = "";
      setAlertMessage("Todo item Created Successfully!");
  }

  window.DeleteToDoItems = function(e) {
      let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;

      if (confirm(`Are you sure you want to delete this ${deleteValue}?`)) {
          e.parentElement.parentElement.setAttribute("class", "deleted-item");
          todoValue.focus();

          todo = todo.filter(element => element.item !== deleteValue.trim());

          setTimeout(() => {
              e.parentElement.parentElement.remove();
          }, 1000);

          setLocalStorage();
      }
  }

  window.CompletedToDoItems = function(e) {
      if (e.style.textDecoration === "") {
          const img = document.createElement("img");
          img.src = "/images/check-mark.png";
          img.className = "todo-controls";
          e.style.textDecoration = "line-through";
          e.appendChild(img);
          e.parentElement.querySelector("img.edit").remove();

          todo.forEach((element) => {
              if (e.innerText.trim() === element.item) {
                  element.status = true;
              }
          });
          setLocalStorage();
          setAlertMessage("Todo item Completed Successfully!");
      }
  }

  window.UpdateToDoItems = function(e) {
      // Placeholder function for updating to-do items
      const updateValue = e.parentElement.parentElement.querySelector("div").innerText;
      todoValue.value = updateValue;
      todo = todo.filter(element => element.item !== updateValue.trim());
      e.parentElement.parentElement.remove();
      setLocalStorage();
      setAlertMessage("Edit the item and click the '+' to update.");
  }

  function setLocalStorage() {
      localStorage.setItem("todo-list", JSON.stringify(todo));
  }

  function setAlertMessage(message) {
      todoAlert.removeAttribute("class");
      todoAlert.innerText = message;
      setTimeout(() => {
          todoAlert.classList.add("toggleMe");
      }, 1000);
  }

  addUpdate.addEventListener("click", CreateToDoItems);

  // Add event listeners for dynamically created elements
  document.body.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('delete')) {
          DeleteToDoItems(e.target);
      } else if (e.target && e.target.classList.contains('edit')) {
          UpdateToDoItems(e.target);
      }
  });
});
