<template>
  <v-container>
    <v-row class="mt-16 flex-column" align="center">
      <v-icon size="60" align="center" color="orange">mdi-paw</v-icon>
      <p class="mt-2 titulo">Cachorros fofinhos!</p>
    </v-row>

    <v-row class="mt-2 flex-column" align="center">
      <v-col cols="10" md="6">
        <v-autocomplete
          v-model="cachorroPesquisado"
          color="orange"
          label="Escolha um tipo de cachorro."
          append-icon="mdi-magnify"
          :items="tiposDeCachorro"
          @change="getCachorroSelecionado"
          outlined
        >
        </v-autocomplete>

        <p v-if="!!cachorroPesquisado" class="selectCachorro mb-16">
          Você pesquisou por: <strong class="orange--text">{{ cachorroPesquisado }}</strong
          >. 🐶
        </p>
      </v-col>
    </v-row>
 
    <v-row v-if="loading" class="mt-3 mb-10 flex-column" align="center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="orange"
        indeterminate
      ></v-progress-circular>
    </v-row> 

    <v-data-iterator
      v-if="!loading"
      :items="imagens"
      :items-per-page.sync="itemsPerPage"
      :footer-props="{
        'items-per-page-options': itemsPerPageArray,
        'items-per-page-all-text': 'Todos',
      }"
    >
      <template #default="{ items }">
        <v-row>
          <v-col v-for="enderecoImagem in items" :key="enderecoImagem">
            <CardCachorro
              v-if="verificarExiste(enderecoImagem)"
              :endereco-imagem="enderecoImagem"
              :favorito="true"
              @adicionar="adicionarListaFavoritos"
              @remover="removerListaFavoritos"
            />
            <CardCachorro
              v-else
              :endereco-imagem="enderecoImagem"
              :favorito="false"
              @adicionar="adicionarListaFavoritos"
              @remover="removerListaFavoritos"
            />
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import CardCachorro from "./CardCachorro.vue";

export default {
  name: "BarraPesquisa",

  components: {
    CardCachorro,
  },

  props: {},

  data: () => ({
    cachorroPesquisado: "",
    imagens: [],
    listaFavoritos: [],
    loading: true, 
    racasCachorro: [],
    itemsPerPage: 8,
    itemsPerPageArray: [8, 16, 24, -1],
  }),

  computed: {
    tiposDeCachorro() {
      return this.racasCachorro.reduce((arrayFinal, cachorro) => {
        if (!cachorro.subRaca.length) {
          arrayFinal.push(cachorro.raca);
          return arrayFinal;
        }
        return [
          ...arrayFinal,
          ...cachorro.subRaca.map((subRaca) => `${cachorro.raca} ${subRaca}`),
        ];
      }, []);
    },
  },

  watch: {},

  created() {},

  mounted() {
    this.getTodosCachorros();
    this.populaCachorros();
    this.getCachorrosFavoritados();
  },

  beforeDestroy() {},

  methods: {
    async getTodosCachorros() {
  
      try {
        const response = await this.$http.get(
          "https://dog.ceo/api/breeds/list/all"
        );
        this.racasCachorro = Object.keys(response.data.message).map((raca) => ({
          raca,
          subRaca: response.data.message[raca],
        }));
      } catch (error) {
        console.log(error);
      }
 
    },

    async populaCachorros() {
      try {
        const response = await this.$http.get(
          `https://dog.ceo/api/breeds/image/random/50`
        );
        this.imagens = response.data.message;

      } catch (error) {
        console.log(error);
      }

      this.loading = false; 
    },

    async getCachorroSelecionado() {
      try {
        const raca = this.cachorroPesquisado.replace(" ", "/");
        const response = await this.$http.get(
          `https://dog.ceo/api/breed/${raca}/images/random/50`
        );
        this.imagens = response.data.message;
      } catch (error) {
        console.log(error);
      }
    },

    adicionarListaFavoritos(enderecoImagem) {
      if (!this.verificarExiste(enderecoImagem)) {
        this.listaFavoritos.push(enderecoImagem);
        this.saveCachorroFavoritado();
      }
    },

    removerListaFavoritos(enderecoImagem) {
      if (this.verificarExiste(enderecoImagem)) {
        const indice = this.listaFavoritos.findIndex(
          (favorito) => favorito === enderecoImagem
        );
        this.listaFavoritos.splice(indice, 1);
        this.saveCachorroFavoritado();
      }
    },

    verificarExiste(enderecoImagem) {
      return this.listaFavoritos.includes(enderecoImagem);
    },

    getCachorrosFavoritados() {
      if (localStorage.getItem("listaFavoritos")) {
        this.listaFavoritos = JSON.parse(
          localStorage.getItem("listaFavoritos")
        );
      }
    },

    saveCachorroFavoritado() {
      localStorage.setItem(
        "listaFavoritos",
        JSON.stringify(this.listaFavoritos)
      );
    },

    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
