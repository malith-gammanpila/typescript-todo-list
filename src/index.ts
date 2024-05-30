const wrapper = document.createElement('div') as HTMLDivElement;
wrapper.className = 'wrapper';
document.body.appendChild(wrapper);

const textInput = document.createElement('input') as HTMLInputElement;
textInput.type = 'text';
textInput.placeholder = 'Enter something here';
wrapper.appendChild(textInput);

const button = document.createElement('button') as HTMLButtonElement;
button.textContent = 'Add';
wrapper.appendChild(button);

const list = document.createElement('ul');
wrapper.appendChild(list);

type Todo = {
  text: string;
  done: boolean;
};

const storedTodos = localStorage.getItem('todos');
const parsedTodos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
const todos: Todo[] = parsedTodos;

const renderTodo = (todo: Todo) => {
  const listItem = document.createElement('li') as HTMLLIElement;

  const liWrapper = document.createElement('div') as HTMLDivElement;
  liWrapper.style.display = 'flex';

  const textSpan = document.createElement('span') as HTMLSpanElement;

  const checkbox = document.createElement('input') as HTMLInputElement;
  checkbox.type = 'checkbox';

  checkbox.addEventListener('change', () => {
    todo.done = checkbox.checked;
    textSpan.style.textDecoration = todo.done ? 'line-through' : 'none';
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  textSpan.textContent = todo.text;
  checkbox.checked = todo.done;
  textSpan.style.textDecoration = todo.done ? 'line-through' : 'none';

  liWrapper.appendChild(textSpan);
  liWrapper.appendChild(checkbox);
  listItem.appendChild(liWrapper);
  list.appendChild(listItem);
};

const renderTodos = (todos: Todo[]) => {
  list.innerHTML = '';
  todos.forEach(renderTodo);
};

renderTodos(todos);

button.addEventListener('click', () => {
  const text = textInput.value;
  textInput.value = ''; // reset the input field

  const todo: Todo = {
    text,
    done: false,
  };

  todos.push(todo);
  renderTodo(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
});
