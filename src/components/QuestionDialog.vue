<template lang="pug">
    .card.modal
        .header
            h1.title Are you sure?
        .body.df.jcsa
            button.yes(@click="$emit('response', true)") Yes
            button.cancel(@click="$emit('response', false)") Cancel
</template>

<script>
    export default {
        name: "QuestionDialog"
    }
</script>

<style lang="sass" scoped>
    @import "../styles/styles"

    .card
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        width: 400px
        background-color: #e4e1dc
        border-radius: $border-radius
        .body
            padding: 20px

        .todo-item
            display: flex
            justify-content: space-between
            margin-bottom: 10px


        .yes
            width: 150px
            background-color: $blue
            border-color: darken($blue, 50%)
            color: darken($blue, 50%)
        .cancel
            width: 150px
            background-color: transparent
            border-color: darken($main-bgc, 50%)
            color: darken($main-bgc, 50%)
</style>
