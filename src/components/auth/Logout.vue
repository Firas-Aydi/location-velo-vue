<template>
  <div>
      <h4>Logout</h4>
        <form>
            <div>
                <button type="submit" @click="handleSubmit">
                    Logout
                </button>
            </div>
        </form>
  </div>
</template>

<script>
    export default {
        data(){
            return {
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                localStorage.removeItem('token')
                window.location.reload();
                this.$router.push({path: '/login'})
            }
        }
    }
</script>

<style>

</style>