<template>
  <div>
    {{ getCachorroEspecifico }}

    <v-card class="d-flex flex-wrap justify-center mb-10" elevation="0">
      <v-card
        class="mx-auto mt-10"
        width="250"
        outlined
        v-for="enderecoImagem in imagem.message"
        :key="enderecoImagem"
      >
        <v-img aspect-ratio="1" :src="enderecoImagem"></v-img>

        <v-card-text align="right" class="indigo lighten-5">
          <v-icon @click="changeColorHandler()" :color="cor">mdi-heart</v-icon>
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>


<script>
export default {
  props: ["raca"],
  data() {
    return {
      imagem: [],
      cor: "indigo lighten-4",
    };
  },
  methods: {
    getTodosCachorros() {
      fetch("https://dog.ceo/api/breeds/image/random/50")
        .then((resposta) => resposta.json())
        .then((data) => (this.imagem = data));

      this.imagem = [...new Set(this.imagem)];
    },

    changeColorHandler() {
      if (this.cor == "indigo lighten-4") {
        this.cor = "orange";
      } else {
        this.cor = "indigo lighten-4";
      }
    },
  },
  computed: {
    getCachorroEspecifico() {
      let html = "";
      let racaPesquisada = this.raca.toLowerCase();

      if (racaPesquisada != "") {
        if (racaPesquisada.includes(" ")) {
          racaPesquisada = racaPesquisada.split(" ");
          racaPesquisada = racaPesquisada[1] + "/" + racaPesquisada[0];
        }

        fetch(`https://dog.ceo/api/breed/${racaPesquisada}/images/random/50`)
          .then((resposta) => resposta.json())
          .then((data) => (this.imagem = data));
      }

      return html;
    },
  },

  created() {
    this.getTodosCachorros();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");

p {
  font-size: 1.5rem;
  text-align: center;
  font-family: "Barlow", sans-serif;
}
</style>