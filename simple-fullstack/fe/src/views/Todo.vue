<script setup>
import { reactive } from 'vue';

import API from '../util/api.js';

const STATE = reactive({
  todos: [],
  newTodo: '',
});

const validation = {
  validateAll: (txt, limitLength = 100) => {
    let isValidate = true;
    let errorMessage = '';

    if (txt.length < 1) {
      isValidate = false;
      errorMessage = `To do can't be empty!`;
    }

    if (txt.length > limitLength) {
      isValidate = false;
      errorMessage = `To do can't over ${limitLength} characters.`;
    }

    if (errorMessage) {
      alert(errorMessage);
    }

    return isValidate;
  },
};

const getTodos = async () => {
  console.log(`[VUE-FN] getTodos()`);

  const url = `http://localhost:8001/todos`;
  const args = {};
  const httpMethod = 'GET';

  const response = await API(httpMethod, url, args);
  STATE.todos = response.result;
};

const insertTodo = async () => {
  console.log(`[VUE-FN] insertTodo()`);
  console.log(STATE.newTodo);

  if (!validation.validateAll(STATE.newTodo)) {
    return;
  }

  const url = `http://localhost:8001/todos`;
  const args = { content: STATE.newTodo };
  const httpMethod = 'POST';

  const response = await API(httpMethod, url, args);
  if (response) {
    alert('입력 완료');
    getTodos();
  }
};

const updateTodo = async (seq, content) => {
  console.log(`[VUE-FN] updateTodo(${seq}, ${content})`);

  if (!validation.validateAll(content)) {
    return;
  }

  const url = `http://localhost:8001/todos/${seq}`;
  const args = { seq, content };
  const httpMethod = 'PATCH';

  const response = await API(httpMethod, url, args);
  if (response) {
    alert('수정 완료');
    getTodos();
  }
};

const deleteTodo = async (seq, content) => {
  console.log(`[VUE-FN] deleteTodo(${seq}, ${content})`);

  if (!confirm(`삭제하시겠습니까?\n\n${content}`)) {
    return;
  }

  const url = `http://localhost:8001/todos/${seq}`;
  const args = { seq };
  const httpMethod = 'DELETE';

  const response = await API(httpMethod, url, args);
  if (response) {
    getTodos();
  }
};

getTodos();
</script>

<template>
  <h1 class="text-2xl">Todo</h1>

  <form>
    <div class="grid gap-2 mb-6 md:grid-cols-1 mt-1">
      <div v-for="todo in STATE.todos" v-if="STATE.todos.length">
        <span class="mr-2">{{ todo.update_date }}</span>
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Wake up"
          required
          v-model="todo.content"
        />
        <button type="button" @click="updateTodo(todo.seq, todo.content)">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            style="display: inline-block; vertical-align: text-bottom; margin-left: 10px"
          >
            <path
              fill-rule="evenodd"
              d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"
            ></path>
          </svg>
        </button>
        <button type="button" @click="deleteTodo(todo.seq, todo.content)">
          <svg
            width="20"
            height="20"
            viewBox="0 2 14 14"
            fill="currentColor"
            style="display: inline-block; vertical-align: text-bottom"
          >
            <path
              fill-rule="evenodd"
              d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
            ></path>
          </svg>
        </button>
      </div>
      <div v-else>
        <h3>There is no to do.</h3>
      </div>
      <div>
        <label for="new_todo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-3"
          >Enter a new to do</label
        >
        <input
          type="text"
          id="new_todo"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Next to do"
          required
          v-model="STATE.newTodo"
        />
        <button
          type="button"
          class="py-2 px-4 rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 dark:border-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ml-2"
          @click="insertTodo()"
        >
          Enter
        </button>
      </div>
    </div>
  </form>
</template>
