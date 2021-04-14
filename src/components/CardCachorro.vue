<template>
    <v-card class="mx-auto" width="250">
      <v-img aspect-ratio="1" :src="enderecoImagem"></v-img> 
      <v-card-actions class="indigo lighten-5">
        <v-spacer />
        <v-btn icon @click="toggleFavorito">
          <v-icon color="orange" v-if="favorito"> mdi-heart </v-icon>
          <v-icon v-else color="indigo lighten-4"> mdi-heart-outline </v-icon>
        </v-btn>
      </v-card-actions> 
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
