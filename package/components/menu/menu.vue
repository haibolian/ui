<template>
  <div class="l-menu">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name:'LMenu'
}
</script>

<style lang="scss" scoped>
.l-menu{
  width: 100%;
  background-color: #000;
  color: #fff;
  
}
li{
  list-style-type: none;
}

</style>