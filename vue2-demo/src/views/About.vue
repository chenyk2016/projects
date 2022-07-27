<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input
      @keydown="keydown"
      @keyup="keyup"
      @input="inputEvent"
      type="text"
    />
  </div>
</template>

<script>
export default {
  methods: {
    keydown(event) {
      console.log('keydown',{
        event,
        keyCode: event.keyCode,
        charCode: event.charCode,
        key:event.key,
      });
      // for (const property in event) {
      //   if(typeof event[property] == "function"){
      //     console.log(`${property}: `+':its a  fuction');
      //   }else{
      //     console.log(`${property}: ${event[property]}`+':  its a property');
      //   }
      // }
    },
    keyup(event) {
      console.log('keyup', {
        event,
        keyCode: event.keyCode,
        charCode: event.charCode,
        key:event.key,
      } );
      // for (const property in event) {
      //   if(typeof event[property] == "function"){
      //     console.log(`${property}: `+':its a  fuction');
      //   }else{
      //     console.log(`${property}: ${event[property]}`+':  its a property');
      //   }
      // }
    },
    inputEvent(event) {
      console.log('inputEvent', {
        event,
        keyCode: event.keyCode,
        charCode: event.charCode,
        key:event.key,
        data: event.data,
      } );
      // for (const property in event) {
      //   if(typeof event[property] == "function"){
      //     console.log(`${property}: `+':its a  fuction');
      //   } else {
      //     console.log(`${property}: ${event[property]}`+':  its a property');
      //   }
      // }
    },
  }
}
</script>
