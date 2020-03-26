<template lang="pug">
    .main-task-list
        .header
            h1.title Main task list
            button.add-list(@click="addNewList()") Add new ToDo List
        .card-body
            note(v-if="todoLists != null && todoLists.length > 0",
                v-for="(item, i ) in todoLists",
                :item="item",
                :key="i",
                @delete="showQuestionDialog = true",
                :class="item.completed ? 'note-status__completed' : 'note-status'")


        transition(name="fade")
            .modal-overlay(v-if="showQuestionDialog" @click="closeAll")
        transition(name="slide", appear)
            question-dialog(v-if="showQuestionDialog" @response="removeHandler")

</template>

<script>

import Note from "../components/Note";
import QuestionDialog from "../components/QuestionDialog";
export default {
    name: 'MainTaskList',
    components: {
        QuestionDialog,
        Note
    },
    data: () => {
        return {
            todoLists: [],
            lastId: null,
            showNewListDialog: false,
            showQuestionDialog: false
        }
    },
    mounted() {
        this.todoLists = JSON.parse(localStorage.getItem('todoLists'));
        if (this.todoLists && this.todoLists.length > 0) {
            this.lastId = Math.max(...this.todoLists.map(i => i.id));
        } else {
            this.lastId = 0;
        }
    },
    methods: {
        addNewList() {
            if (this.todoLists == null) {
                this.todoLists = [];
            }
            this.lastId++;
            this.todoLists.push({id: this.lastId, title: '', isEditable: true, completed: false, todos: []});
            localStorage.setItem("todoLists", JSON.stringify(this.todoLists));
            this.$router.push({ name: 'todo', params: { id: this.lastId }});
        },
        closeAll() {
            this.showQuestionDialog = false;
        },
        removeHandler(response) {
            this.showQuestionDialog = false;
            if (response && this.todoLists.indexOf(i => i.id === response)) {
                this.todoLists.splice(this.todoLists.indexOf(i => i.id === response), 1);
            }
            localStorage.setItem("todoLists", JSON.stringify(this.todoLists));
        }
    }
}
</script>

<style lang="sass" scoped>
@import "../styles/styles"

.main-task-list
    background-color: #e4e1dc
    border-radius: $border-radius
.header
    position: relative
    display: flex
    justify-content: space-between
    padding: 20px 20px 0 20px
    text-align: center
    &::before
        content: ''
        position: absolute
        display: block
        width: 100%
        height: 1px
        background-color: $main-color
        top: 75px
        left: 0

.add-list
    background-color: $blue
    border-color: darken($blue, 50%)
    color: darken($blue, 50%)
.note-status
    position: relative
    height: 160px
    &::before
        content: ''
        position: absolute
        width: 4px
        height: 112px
        border-radius: $border-radius
        top: 43px
        left: 5px
        background-color: $fail
    &__completed
        position: relative
        height: 160px
        &::before
            content: ''
            position: absolute
            width: 4px
            height: 112px
            border-radius: $border-radius
            top: 43px
            left: 5px
            background-color: $success


</style>
