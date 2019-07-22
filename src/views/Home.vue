<template>
  <div class="content-wrap">
    <div class="todo-app">
      <div class="todo-header">
        <div v-if="valid !== ''" id="errors">{{ valid }}</div>
        <textarea class="new-todo-area" 
        cols="30" 
        rows="3" 
        v-model="myTodo" 
        v-on:keyup.enter="newAdd(myTodo, false)" 
        placeholder="Введите текст задачи...">
        </textarea>
        <div class="add-block">
          <button @click="newAdd(myTodo, false)">Add Card</button>
          <div class="clear-wrap">
            <img @click="myTodo=''" class="icon clear" src="./../assets/clear.png">
          </div>
        </div>
        <div class="sort-wrap">
          <button class="sort" @click="sortsReverse">Cортировка</button>
        </div>
      </div>
      <h3>Задачи</h3>
      <div class="pagination" v-if="countAllItems>10">
            <button @click="backPage()" :disabled='statusBack'><</button>
            <button v-for="item in AllPage"
                    :data="item"
                    :class="{active: isActive == item}" 
                    @click.prevent="isActive = item; goPage(item)"
                    :key="item.id"
                    >{{item}}</button>
            <button @click="nextPages()" :disabled='statusNext'>></button>
      </div>

      <div v-if="getItems && countAllItems > 0">
        
      <div class="todo-task" 
           v-for="(item, index) in getAllTodos" 
           :key="index" 
           v-if="index > indexStart && index < indexEnd">
          <span :class="{ready: item.status}">{{index+1}}) {{ item.task }}</span>
          <div class="edit-block">
            <input type="checkbox" 
                   v-model="item.status" 
                   :id="item.id" 
                   :value="item.status" 
                   @change="editTask(item.task, item.status, item.id)">
            <router-link :to="'/task'+item.id" :key="index">
              <img class="icon" src='./../assets/edit.png'>
            </router-link>
            <img class="icon" @click="deleteItem(item.id)" src='./../assets/del.png'>
          </div>
      </div>
    </div>

   </div>
  </div>
</template>

<script>
import { db } from '@/main'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'home',
  beforeCreate: function () {
    this.$store.dispatch('setItems')
  },
  data: function () {
    return {
      myTodo: '',
      quantityItems: 10,
      indexStart: -1,
      indexEnd: 10,
      statusBack: true,
      statusNext: false,
      isActive: 1,
      statusSort: true
    }
  },
  computed: {
    ...mapGetters({
      getItems: 'getItems',
      valid: 'valid'
    }),
    getAllTodos(){
      if(this.statusSort){
        return this.getItems.sort(this.sortsTime)
      } else {
        return this.getItems.sort(this.sortsTime).reverse()
      }
    },
    countAllItems(){
      return this.getItems.length
    },
    AllPage: function(){
      let countPage = Math.ceil(this.countAllItems/this.quantityItems)+1;
      let arrPage = [];
      for (let i =1;i<countPage; i++) {
        arrPage.push(i)
      }
      return arrPage;
    },
  },
  methods: {
    ...mapActions({
      addToDo: 'addToDo',
      deleteItem: 'deleteItem',
      getChecked: 'getChecked',
    }),
    newAdd(text, stat){
      let obj = {
        task: text,
        status: stat
      } 
      this.addToDo(obj) ? this.myTodo = "": ''
      this.goPage(1)
    },
    editTask(text, stat, id){
      let obj = {
        task: text,
        status: stat
      } 
      this.deleteItem(id)
      this.addToDo(obj)
    },
      nextPages: function(){
        this.page++
        let start = this.indexStart + this.quantityItems
        this.indexStart = start
        let end = this.indexEnd + this.quantityItems
        this.indexEnd = end
        this.isActive = this.page
        if(this.indexStart>-1) {
            this.statusBack = false
        }
        if(this.indexEnd/this.quantityItems>this.countAllItems/this.quantityItems-1){
            this.statusNext = true
        }
      },
      backPage: function(){
        this.page--
        let start = this.indexStart - this.quantityItems
        this.indexStart = start
        let end = this.indexEnd - this.quantityItems
        this.indexEnd = end
        this.isActive = this.page
        if(this.indexStart<0) {
            this.statusBack = true
        }
        if(this.indexStart<this.countAllItems/this.quantityItems){
            this.statusNext = false
        }
      },
      goPage: function(k){
            let start = -1 + ((k-1)*this.quantityItems)
            this.indexStart = start
            let end = this.quantityItems + ((k-1)*this.quantityItems)
            this.indexEnd = end
            this.page = k
        if(this.indexStart>-1) {
            this.statusBack = false
        }
        if(this.indexEnd/this.quantityItems>this.countAllItems/this.quantityItems-1){
            this.statusNext = true
        }
        if(this.indexStart<0) {
            this.statusBack = true
        }
        if(this.indexEnd/this.quantityItems<this.countAllItems/this.quantityItems){
            this.statusNext = false
        }
      },
      sortsTime(taskX, taskY){
        return taskX.time_of_creation - taskY.time_of_creation;
      },
      sortsReverse(){
        this.statusSort = !this.statusSort
      }
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
.content-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #FFF5EE;
  font-family: "Open sans", sans-serif;
}
.todo-app {
  margin-top: 10px;
  border-radius: 7px;
  background-color: #CFD8DC;
  height: 515px; 
}
.new-todo-area {
  margin: 10px 10px 5px 10px;
  border-radius: 5px;
  resize: none;
  outline:none;
  padding: 3px;
}
.add-block {
  display: flex;
  margin-left: 15px;
}
.add-block button {
  border-bottom: 1px solid #319209;
}
.icon {
  width: 15px;
  height: 15px;
  cursor: pointer;
  opacity: 0.5;
}
.clear-wrap {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.sort-wrap {
  display: flex;
  justify-content: flex-start;
  margin: 5px 5px 5px 15px;
}
.sort {
   background:#779aa9;
   border-bottom: 1px solid #221c80;
}
.todo-task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  margin: 5px;
  padding: 3px;
}
.edit-block input, .edit-block img, .edit-block a{
  margin: 0 2px;
}
button {
  outline:none;
  background:#81b773;
  border-radius: 4px;
  padding: 5px;
  border:0;
  color:#fff;
  font-weight:700;
  cursor:pointer;
  box-shadow: 0.1em 0.1em 2px rgba(122,122,122,0.5);
}
button:hover {
  opacity: 0.8;
}
button:active {
  box-shadow: 0 0 40px rgba(0, 0, 0, .1) inset;
}
#errors {
  color:#a52222;
  padding:5px;
  font-size: 9px;
}
.pagination button {
  width: 25px;
  margin: 3px;
  background:#779aa9;
}
  .pagination button.active {
      background: #60789e;
  }
  .ready {
    opacity: 0.3;
    text-decoration: line-through;
  }
</style>
