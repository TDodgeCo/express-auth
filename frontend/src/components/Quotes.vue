<template>
  <div>
    <div class="row">
      <div v-for="quote in quotes" class="col-sm-12 col-md-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">Building Quote</h4>
          </div>
          <div class="panel-body">
            {{ quote.width }} x {{ quote.length }} x {{ quote.height }} ${{ quote.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'quotes',
  data: () => ({
    quotes: {}
  }),
  mounted () {
    axios.get('/api/api/quote').then(response => {
      this.quotes = response.data
    })
  }
}
</script>
<style lang="css" scoped>
</style>
