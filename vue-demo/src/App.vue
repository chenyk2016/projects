<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |

      <a href="#/test1">test1</a> |
      <span href="" @click="openTest2">open test2</span>
    </div>

    <div>
      <p>测试结果</p>
      <code>
        {{ result }}
      </code>
    </div>

    <div id="view">
      <router-view/>
    </div>

  </div>
</template>

<script>
import test from './test'
export default {
  data () {
    return {
      result: {}
    }
  },
  created () {
    test((result) => {
      this.result = result
    })
  },
  methods: {
    openTest2 () {
      window.open('/#/test2')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
