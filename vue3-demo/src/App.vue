<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |

      <a href="#/test1">test1</a> |
      <span href="" @click="openTest2">open test2</span> |

      <router-link to="/keep-alive/test1">/keep-alive/test1</router-link>
    </div>

    <!-- <div>
      <p>测试结果</p>
      <code>
        {{ result }}
      </code>
    </div> -->

    <div id="view">
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->
      <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
      </router-view>
    </div>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
