<style lang="less" scope>
    
</style>

<template>
    <div style="width:100%;height:100%;background:#fff;position:relative;">
        <div style="text-align:center;position:absolute;top:50%;left:50%;width:300px;height:200px;margin: -100px 0 0 -150px;">
            <img src="../../images/pic_moren_user.png" />
            <div style="line-height:30px;font-size:16px;">姓名： {{username}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username : JSON.parse(sessionStorage.getItem('user'))
            };
        },
        mounted() {

        },
        methods: {
            
        },
       
    };
</script>

<style>

</style>
