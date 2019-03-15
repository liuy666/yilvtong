<template>
    <div>
        123
    </div>
</template>

<script>
    export default {
        created () {
            let url = JSON.parse(sessionStorage.getItem('szmemo1'));
            const username = JSON.parse(sessionStorage.getItem('user'));
            const password = JSON.parse(sessionStorage.getItem('password'));
            url = url.replace('username', username);
            url = url.replace('password', password);
            window.open(url);
            this.$common.closePage(this);
        }
    }
</script>

<style>

</style>