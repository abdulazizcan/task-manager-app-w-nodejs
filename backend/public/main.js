const newTask = document.querySelector('.input-task');
const newTaskAddBtn = document.querySelector('.btn-task-add');
const taskList = document.querySelector('.task-list');
const loadingDOM = document.querySelector('.loading-text');
const deleteButton = document.querySelector('.task-btn-delete');
const formDOM = document.querySelector('.task-form')
const formAlertDOM = document.querySelector('.form-alert')
const taskCompletedDOM = document.querySelector('.task-btn-completed')

const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks')
    if (tasks.length < 1) {
      taskList.innerHTML = '<h5 class="empty-list alert alert-danger">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    };
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task
        if (completed) {
          return `<div class="task-item task-completed"><li class="task-contents">${name}</li><button class="task-btn task-btn-completed" data-id="${taskID}"><i class="fan fa-solid fa-check"></i></button><button class="task-btn task-btn-delete" data-id="${taskID}"><i class="fan fa-solid fa-trash"></i></button></div></ul>`

        } else {
          return `<div class="task-item"><li class="task-contents">${name}</li><button class="task-btn task-btn-completed" data-id="${taskID}"><i class="fan fa-solid fa-check"></i></button><button class="task-btn task-btn-delete" data-id="${taskID}"><i class="fan fa-solid fa-trash"></i></button></div></ul>`
        }
      })
      .join('')
    taskList.innerHTML = allTasks
  } catch (error) {
    taskList.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'

  }

  loadingDOM.style.visibility = 'hidden'
}
showTasks();

taskList.addEventListener('click', async (e) => {
  const el = e.target;
  if (el.classList.contains('task-btn-delete')) {
    loadingDOM.style.visibility = 'visible';
    const id = el.dataset.id;
    console.log(id);
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks()
    } catch (error) {
      console.log(error);
    }
  }

  if (el.classList.contains('task-btn-completed')) {
    const id = el.dataset.id;
    console.log('tıklanilan id:'+ id);
    try {
      const {
        data: { tasks },
      } = await axios.get('/api/v1/tasks');

      const allTasks = tasks
          const { completed, _id: taskID, name } = allTasks
          if (completed) {
            el.parentElement.classList.remove('task-completed');
            axios.patch(`/api/v1/tasks/${id}`, {
              completed: false,
            });

          } else {

            el.parentElement.classList.toggle('task-completed');
            axios.patch(`/api/v1/tasks/${id}`, {
              completed: true,
            });

          };
    } catch (error) {
      console.log(error);

    }
  }
  loadingDOM.style.visibility = 'hidden';
})

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = newTask.value;
  try {
    await axios.post('/api/v1/tasks', { name });
    showTasks();
    newTask.value = '';
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add('alert');
    formAlertDOM.classList.add('alert-info');
  } catch (error) {
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `error, please try again`;
    console.log(error);
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000)
});