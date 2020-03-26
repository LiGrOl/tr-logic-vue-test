<template lang="pug">
    .note-wrapper
        h3.title {{noteData.title}}
        .note-inner
            .short-todo-list
                .short-todo-item(v-if="noteData != null && noteData.todos.length > 0", v-for="(item, i) in noteData.todos", :key="i")
                    .short-todo-item__complete-point(:class="item.completed ? 'completed' : ''")
                    .short-todo-item__title {{item.value}}
            .button-block
                button.button-block__button.button-block__button--edit(@click="openToDo") Edit list
                button.button-block__button.button-block__button--delete(@click="deleteList") Delete list

</template>

<script>
    export default {
        name: "Note",
        props: {
            item: Object
        },
        data: () => {
            return {
                noteData: {}
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.noteData = this.item;
                this.noteData.todos = this.noteData.todos.splice(0, 3)
            })
        },
        methods: {
            openToDo() {
                this.$router.push({ name: 'todo', params: { id: this.noteData.id }});
            },
            deleteList() {
                this.$emit('delete', this.noteData.id)
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../styles/styles"

    .note-wrapper
        width: 100%
        border-radius: $border-radius
        box-sizing: border-box
        margin-bottom: 10px
        box-shadow: 0 0 10px #ccc
        height: 100%

    .note-inner
        display: flex
        align-items: center
        height: 105px
        justify-content: space-between
        padding: 10px 10px 10px 20px

    .short-todo-item
        display: flex
        align-items: center
        &__complete-point
            width: 17px
            height: 15px
            border: 2px solid $title-text-color1
            border-radius: 100%
            margin-right: 10px
        .completed
            position: relative
            &::after
                content: ''
                display: block
                width: 12px
                height: 12px
                border: 3px
                background-color: $success
                border-radius: 50%
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, - 50%)

    .button-block
        display: flex
        text-align: center
        height: 100%
        &__button
            height: 100%
            &--edit
                margin-right: 10px
                background-color: $blue
                border-color: darken($blue, 50%)
                color: darken($blue, 50%)
            &--delete
                background-color: $fail
                border-color: darken($fail, 50%)
                color: darken($fail, 50%)


</style>
