<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-md-offset-3">
        <form class="form-horizontal" @submit.prevent="createQuote">
          <h3>Quote Request</h3>
          <div class="form-group">
            <input v-model="width" class="form-control" type="text" name="width" placeholder="Width">
          </div>
          <div class="form-group">
            <input v-model="length" class="form-control" type="text" name="length" placeholder="Length">
          </div>
          <div class="form-group">
            <input v-model="height" class="form-control" type="text" name="height" placeholder="Height">
          </div>
          <div class="form-group">
            <div class="col-sm-6 col-md-4 col-sm-offset-6 col-md-offset-8">
              <button class="btn btn-primary btn-block" type="submit" name="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <p>{{ showToken }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'home',
  data: () => ({
    width: '',
    length: '',
    height: '',
    token: ''
  }),
  computed: {
    showToken: function () {
      return this.$store.state.token
    }
  },
  methods: {
    createQuote: function () {
      axios({
        method: 'post',
        url: '/api/api/quote',
        data: {
          width: this.width,
          length: this.length,
          height: this.height
        }
      }).then(response => {
        alert(response.data.price)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
</style>
