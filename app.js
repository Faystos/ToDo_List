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

  // Цветовой список тем.
  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };
  
  let lastSelectedTheme = 'default';

  // Элементы DOM.
    const ulConteiner = document.querySelector('.tasks-list-section .list-group');
    const themeSelect = document.querySelector('#themeSelect');
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

  // Обработка смены цветовой темы.
  function onSelectThemes(evt) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm('Вы точно хотите сменить тему?');
    if(!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
  }

  function setTheme (nameTheme) {
    const selectThemeObj = themes[nameTheme];
    Object.entries(selectThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }  
 
  // Выполнение.
    renderAllTask(objOfTask);
    form.addEventListener('submit', hendlerFormTask);
    ulConteiner.addEventListener('click', onDeleteTask);
    themeSelect.addEventListener('change', onSelectThemes);
})(tasks);
