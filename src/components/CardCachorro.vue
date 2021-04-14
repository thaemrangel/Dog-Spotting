<template>
  <v-card class="d-flex flex-wrap mb-5" elevation="0">
    <v-card class="mx-auto" width="250" outlined>
      <v-img aspect-ratio="1" :src="enderecoImagem"></v-img>

      <v-card-text class="indigo lighten-5">
        <v-card-title>
          <v-btn class="flex-row-reverse" icon @click="toggleFavorito">
            <v-icon color="orange" v-if="favorito"> mdi-heart </v-icon>
            <v-icon v-else color="indigo lighten-4"> mdi-heart-outline </v-icon>
          </v-btn>
        </v-card-title>
      </v-card-text>
    </v-card>
  </v-card>
</template>


<script>
export default {
  name: "CardCachorro",
  components: {},
  props: {
    enderecoImagem: { type: String, default: "" },
    favorito: { type: Boolean, default: false },
  },
  data: () => ({}),
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    adicionarFavorito() {
      this.$emit("adicionar", this.enderecoImagem);
    },

    removerFavorito() {
      this.$emit("remover", this.enderecoImagem);
    },

    toggleFavorito() {
      if (this.favorito) {
        this.removerFavorito();
      } else {
        this.adicionarFavorito();
      }
    },
  },
};
</script> 