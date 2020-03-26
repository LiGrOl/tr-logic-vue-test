<template lang="pug">
    .todo-list
        .header
            .title
                h1(v-if="!todoList.isEditable") {{todoList.title}}
                input.title-input(v-else, v-model="todoList.title", ref="titleInput")
                img(src="../assets/pen.svg", width="20px", height="20px", @click="todoList.isEditable = true")
            .header-buttons.df
                button.save(v-if="todoList.isEditable", @click="todoList.isEditable = false") Save title
                button.add-list(@click="addNewTodoItem") Add new ToDo
                button.back(@click="saveAndReturn") Save and return
        .card-body
            .todos
                .todo-item.df.aic.jcsb(v-for="item in todoList.todos", :key="item.id")
                    .todo-item__values.df.aic
                        label.df.aic(v-if="!item.isEditable")
                            input.checkbox(type="checkbox", v-model="item.completed", :ref="'todoInputValue' + item.id")
                            .todo-item__title {{item.value}}
                        input(v-else, v-model="item.value")
                    .todo-item__buttons.df.aic
                        button(@click="editToDo(item)", :class="item.isEditable ? 'save-todo' : 'edit-todo'") {{item.isEditable ? "Save" : "Edit"}}
                        button.delete-todo(@click="deleteItem(item)") Delete

        transition(name="fade")
            .modal-overlay(v-if="showQuestionDialog" @click="closeAll")
        transition(name="slide", appear)
            question-dialog(v-if="showQuestionDialog" @response="handler")


</template>

<script>
    import QuestionDialog from "../components/QuestionDialog";
    export default {
        name: 'ToDoList',
        components: {QuestionDialog},
        data: () => {
            return {
                showQuestionDialog: false,
                itemForRemove: null,
                lastId: 0,
                todoLists: [],
                todoList: [],
                toSave: false
            }
        },
        mounted() {
            this.todoLists = JSON.parse(localStorage.getItem('todoLists'));
            this.todoList = this.todoLists.find(i => i.id === parseInt(this.$route.params.id, 10));
            if (this.todoList) {
                this.lastId = Math.max(...this.todoList.todos.map(i => i.id)) | 0
            }
            if (this.todoList.isEditable) {
                this.$nextTick(() => {
                    this.$refs.titleInput.focus();
                });
            }
        },
        methods: {
            addNewTodoItem() {
                this.lastId++;
                this.checkingList();
                this.todoList.todos.push({id: this.lastId, value: '', isEditable: true, completed: false});
            },
            deleteItem(item) {
                this.showQuestionDialog = true;
                this.itemForRemove = item;
            },
            closeAll() {
                this.showQuestionDialog = false;
            },
            handler(response) {
                this.showQuestionDialog = false;
                if (response && this.todoList.todos.indexOf(i => i.id === this.itemForRemove.id)) {
                    this.todoList.todos.splice(this.todoList.todos.indexOf(i => i.id === this.itemForRemove.id), 1);
                    this.itemForRemove = null;
                }
            },
            saveAndReturn() {
                this.checkingList();
                this.save();
                this.$router.push('/');
            },
            save() {
                this.todoList.isEditable = false;
                if (!this.toSave) {
                    this.todoLists.splice(this.todoLists.indexOf(i => i.id === this.todoList.id), 1);
                }
                localStorage.setItem("todoLists", JSON.stringify(this.todoLists));

            },
            checkingList() {
                this.todoList.isEditable = false;
                const idsForDelete = [];
                let listCompleted = true;

                this.todoList.todos.forEach(item => {
                    if (item.value.length === 0) {
                        idsForDelete.push(item.id);
                    }
                    item.isEditable = false;
                    if (!item.completed) {
                        listCompleted = false;
                    }
                });

                idsForDelete.forEach(id => {
                    const index =  this.todoList.todos.indexOf(i => i.id === id);
                    this.todoList.todos.splice(index, 1);
                });

                this.todoList.completed = listCompleted;
                this.toSave = !(this.todoList.todos.length === 0 && this.todoList.title.length === 0);
            },
            editToDo(todo) {
                this.todoList.todos.forEach(item => {
                    if (todo.isEditable) {
                        item.isEditable = false;
                    } else {
                        item.isEditable = item.id === todo.id;
                    }
                });
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../styles/styles"

    .todo-list
        background-color: #e4e1dc
        border-radius: $border-radius
    .header
        display: flex
        justify-content: space-between
        align-items: center
    .title
        display: flex
        align-items: center
        h1, input
            margin-right: 20px
        img
            display: block
            fill: $main-color

    .add-list
        margin-right: 10px
        background-color: $blue
        border-color: darken($blue, 50%)
        color: darken($blue, 50%)
    .back
        background-color: transparent
        border-color: darken($main-bgc, 50%)
        color: darken($main-bgc, 50%)
    .todo-item
        padding: 15px
        margin-bottom: 15px
        background-color: lighten(#e4e1dc, 4%)
        border-bottom: 1px solid $main-bgc
        border-radius: $border-radius
        &:last-child
            border: none

    .checkbox
        margin-right: 10px
    .edit-todo
        margin-right: 10px
        background-color: $blue
        border-color: darken($blue, 50%)
        color: darken($blue, 50%)
    .save-todo, .save
        margin-right: 10px
        background-color: $success
        border-color: darken($success, 50%)
        color: darken($success, 50%)
    .delete-todo
        background-color: $fail
        border-color: darken($fail, 50%)
        color: darken($fail, 50%)
</style>
