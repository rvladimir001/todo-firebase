import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  state: {
    todos: [],
    valid: "",
  },
  getters: {
    getItems: state => {
      return state.todos
    },
    valid: state => {
      return state.valid
    },
  },
  mutations: {
    setItems: state => {
      let todos = []
      db.collection('todos').orderBy('task').onSnapshot((snapshot) => {
        todos = []
        snapshot.forEach((doc) => {
          todos.push({ 
            id: doc.id, task: doc.data().task, 
            status: doc.data().status, 
            time_of_creation: doc.data().time_of_creation })
        })
 
        state.todos = todos
      })
    },
    addToDo: (state, obj) => {
      state.valid = ''
      if (obj.task !== '') {
        db.collection('todos').add({
          task: obj.task,
          status: obj.status,
          time_of_creation: Date.now()
        }).then((response) => {
          if (response) {
            return true
          }
        }).catch((valid) => {
          state.valid = valid
        })
      } else {
        state.valid = 'Поле не должно быть пустым!'
      }
    },
    deleteItem: (state, id) => {
      if (id) {
        db.collection("todos").doc(id).delete().then(function() {
        }).catch(function(valid) {
          state.valid = valid
        })
      } else {
        state.valid = 'Ошибка удаления!'
      }
    },
  },
  actions: {
    setItems: context => {
      context.commit('setItems')
    },
    addToDo: (context, obj) => {
      context.commit('addToDo', obj)
    },
    deleteItem: (context, id) => {
      context.commit('deleteItem', id)
    },
  }
})
