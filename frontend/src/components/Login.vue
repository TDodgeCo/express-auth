<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>{{ msg }}</h1>
        </div>
      </div>
      <div v-if="login" class="row">
        <div class="col-sm-12 col-md-6 col-md-offset-3">
          <div class="form-margin">
            <h3>Sign In</h3>
            <form class="form-horizontal" @submit.prevent="signIn">
              <div class="form-group">
                <input v-model="name" class="form-control" type="text" name="name" placeholder="Name">
              </div>
              <div class="form-group">
                <input v-model="password" class="form-control" type="text" name="password" placeholder="Password">
              </div>
              <div class="form-group">
                <button class="btn btn-primary" type="submit" name="submit">Sign In</button>
              </div>
            </form>
            <p><a class="login" @click="register = true; login = false">Don't have an account?</a></p>
          </div>
        </div>
      </div>
      <div v-if="register" class="row">
        <div class="col-sm-12 col-md-6 col-md-offset-3">
          <div class="form-margin">
            <h3>Register</h3>
            <form class="form-horizontal" @submit.prevent="createAccount">
              <div class="form-group">
                <input v-model="name" class="form-control" type="text" name="name" placeholder="Name">
              </div>
              <div class="form-group">
                <input v-model="password" class="form-control" type="text" name="password" placeholder="Password">
              </div>
              <div class="form-group">
                <button class="btn btn-primary" type="submit" name="submit">Submit</button>
              </div>
            </form>
            <p><a class="login" @click="register = false; login = true">Already have an account?</a></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <p>{{ showToken }}</p>
          <p> {{ token }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Node, Express and Bootstrap Boilerplate',
      login: true,
      register: false,
      name: '',
      password: '',
      token: '',
      users: {}
    }
  },
  computed: {
    showToken: function () {
      return this.$store.state.token
    }
  },
  methods: {
    signIn: function () {
      axios({
        method: 'post',
        url: '/api/api/authenticate',
        data: {
          name: this.name,
          password: this.password
        }
      }).then(response => {
        this.token = response.data.token
        console.log(response.data.token)
        this.$store.commit('getToken', response.data.token)
        this.$router.push('/home')
      }).catch(error => {
        console.log(error)
      })
    },
    createAccount: function () {
      axios({
        method: 'post',
        url: '/api/register',
        data: {
          name: this.name,
          password: this.password
        }
      }).then(response => {
        if (response.data.success === true) {
          axios({
            method: 'post',
            url: '/api/api/authenticate',
            data: {
              name: this.name,
              password: this.password
            }
          }).then(response => {
            this.token = response.data.token
            this.$router.push('/home')
          }).catch(error => {
            alert(error)
          })
          alert('User created!')
        }
      }).catch(error => {
        alert(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-margin {
  margin: 10vh 0;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.login {
  cursor: pointer;
}
</style>
