<template>
  <v-app> 
    <v-main>  
      <BarraPesquisa/> 
    </v-main>
  </v-app>
</template>

<script> 
import BarraPesquisa from './components/BarraPesquisa.vue'; 

export default {
  name: 'App',

  components: { 
    BarraPesquisa, 
  },

  data: () => ({
    //
  }),
};
</script>
