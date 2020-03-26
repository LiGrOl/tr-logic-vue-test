<template lang="pug">
  #app
    .wrapper
      router-view
</template>

<style lang="sass">

    @import "./styles/styles"

#app
    position: relative
    width: 100vw
    height: 100vh

.wrapper
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 700px
    height: 900px
    box-shadow: 0 0 30px rgba(0, 0, 0, .5)
    border-radius: $border-radius
    background-color: #fff

</style>
