class Task {
    constructor(value, status) {
        this.value = value;
        this.status = status;
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

class TodoList {
    constructor(el) {
        this.todos = [];
        this.el = el;
        el.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-task')) {
                this.removeTodo(event.target.parentElement.dataset.id);
            } else if (event.target.classList.contains('set-status')) {
                this.changeStatus(event.target.parentElement.dataset.id);
            }
        })
        el.parentElement.addEventListener('click', (event)=> {
            if (event.target.classList.contains('create-task')) {
                this.createNewToDo();
            } else if (event.target.classList.contains('find-task')) {
                console.log(event.target);
                this.findTask();
            }
        })
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(elemId) {
        this.todos = this.todos.filter((el) => {
            return el.id !== elemId;
        });
        document.querySelector(`[data-id='${elemId}']`).remove();
    }

    getTodos() {
        return this.todos;
    }

    changeStatus(id) {
        let index = this.todos.findIndex((el) => el.id === id);
        this.todos[index].status = !this.todos[index].status;
        if (this.todos[index].status === true) {
            document.querySelector(`[data-id='${id}']`).style.backgroundColor = 'green';
        } else {
            document.querySelector(`[data-id='${id}']`).style.backgroundColor = 'yellow';
        }
    }

    createNewToDo() {
        let myTask = document.getElementById('myTask').value;
        let newTask = new Task(myTask, false);
        this.addTodo(newTask);
        this.render();
    }

    findTask() {
        let myTask = document.getElementById('myTask').value;
        let result = this.todos.filter( (el)=> {
            return el.value.includes(myTask);
        })
        console.log(result)
        let lis = '';
        for (let el of result) {
            if (!el) {
                return;
            }
            lis += `<li data-id="${el.id}">${el.value}<button class="set-status">Change status</button><button class="delete-task">Delete</button></li>`;
        }
        this.el.innerHTML = lis;
    }

    render() {
        let lis = '';
        for (let el of this.todos) {
            if (!el) {
                return;
            }
            lis += `<li data-id="${el.id}">${el.value}<button class="set-status">Change status</button><button class="delete-task">Delete</button></li>`;
        }
        this.el.innerHTML = lis;
    }}


let list = document.getElementById('list');
let todo1 = new TodoList(list);
todo1.addTodo(new Task('9345', true));
todo1.addTodo(new Task('2945hv', false));
console.log(todo1.getTodos());
todo1.render();
