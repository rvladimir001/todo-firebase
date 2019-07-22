<template>
  <div class="content-wrap">
    <section class="todo-app">
      <div class="todo-header">
          <h2>Редактирование</h2>
      </div>
      <div class="todo-list">
        <div class="todo-item">
            <div class="todo-head">
            <textarea class="new-todo-area" 
                      cols="30" 
                      rows="3" 
                      v-model="oneTask.task"  placeholder="Введите текст задачи...">
            </textarea>
            <input type="checkbox" v-model="oneTask.status" >
          </div>
            <div class="add-block">
              <button @click="editTask(oneTask.task, oneTask.status, oneTask.id)">Cохранить</button>
              <button class="cancellation" @click="$router.go(-1)">Отмена</button>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'editpage',
  data: function () {
    return {
      id: this.$router.currentRoute.params['id'],
    }
  },
  methods: {
    ...mapActions({
        addToDo: 'addToDo',
        deleteItem: 'deleteItem',
        getChecked: 'getChecked',
      }),
    editTask(task, status, id){
      let obj = {
        task: task,
        status: status
      } 
      this.deleteItem(id)
      this.addToDo(obj)
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters({
      getItems: 'getItems'
    }),
      oneTask(){
        let actualTask = ""
        let arr = this.getItems
        arr.forEach((elem) => {
           if(elem.id == this.id) {
             actualTask = elem
           }
        });
        return actualTask
      }
  }
}
</script>

<style scoped>
.todo-app {
  height: 150px;
}
.todo-head {
  display: flex;
  align-items: center;
}
.todo-head input {
  margin-right: 10px;
}
.add-block button {
  margin: 5px;
}
.cancellation {
  background: #aec1a8;
}
</style>
