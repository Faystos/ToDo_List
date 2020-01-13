const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
  const objOfTask = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // Элементы DOM.
    const ulConteiner = document.querySelector('.tasks-list-section .list-group');
    const form = document.forms['addTask'];
    const taskTitle = form.elements['title'];
    const taskBody = form.elements['body'];  
  
  // Отображение всех задач в списке задач.
    function renderAllTask (taskList) {
      if (!taskList) {
        console.error('Передайте taskList');
        return;
      }

      const fragmentLi = document.createDocumentFragment();
      Object.values(taskList).forEach(task => {
        const li = listItemTemplate(task);
        fragmentLi.appendChild(li);
      });
      ulConteiner.appendChild(fragmentLi);
    }

    function listItemTemplate ({_id, title, body} = {}) {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
      li.setAttribute('data-task-id', _id);

      const span = document.createElement('span');
      span.textContent = title;
      span.style.fontWeight = 'bold';

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
      deleteBtn.textContent = 'Delete task';

      const article = document.createElement('p');
      article.classList.add('mt-2', 'w-100');
      article.textContent = body;

      li.appendChild(span);
      li.appendChild(article);
      li.appendChild(deleteBtn);

      return li;
    }  

  // Обработка формы и добавление задачи в список задач.
    function hendlerFormTask (evt) {
      evt.preventDefault();

      const taskTitleValue = taskTitle.value;
      const taskBodyValue = taskBody.value;
      
      if (!taskTitleValue || !taskBodyValue) {
        alert('Заполните поля Title и Body');
        return;
      }
      const task = createNewTask(taskTitleValue, taskBodyValue);
      const listItem = listItemTemplate(task);
      ulConteiner.insertAdjacentElement('afterbegin', listItem);
      form.reset();
    }

    function createNewTask (title, body) {
      const newTask = {
        title,
        body,
        completed: false,
        _id: `task-${Math.random()}`
      };
      objOfTask[newTask._id] = newTask;

      return {...newTask}
    }
  
  // Обработка удаления задачи из списка задач.
    function onDeleteTask ({target}) {
      if (target.classList.contains('delete-btn')){      
        const parent = target.closest('[data-task-id]');
        const id = parent.dataset.taskId;
        const confirmed = deleteTask(id);
        deleteTaskFrom(confirmed, parent);      
      }
    }

    function deleteTask (id) {
      const {title} = objOfTask[id];    
      const isConfirm = confirm(`Вы точно хотите удалить задачу ${title}`);

      if (!isConfirm) return isConfirm;
      delete objOfTask[id];

      return isConfirm;
    }

    function deleteTaskFrom (confirmed, el) {
      if (!confirmed) return;
      el.remove();
    }
 
  // Выполнение.
    renderAllTask(objOfTask);
    form.addEventListener('submit', hendlerFormTask);
    ulConteiner.addEventListener('click', onDeleteTask);
})(tasks);
