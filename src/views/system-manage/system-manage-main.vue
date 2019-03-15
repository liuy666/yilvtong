<template>
  <div>
    <keep-alive :include="cachePage">
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  computed:{
    cachePage () {
        return this.$store.state.app.cachePage;
    }
  }
}
</script>

<style>

</style>