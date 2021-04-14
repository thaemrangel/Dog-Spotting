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
        >
        </v-autocomplete>

        <p v-if="cachorroPesquisado !== ''" class="selectCachorro">
          Você pesquisou por:
          <strong class="orange--text">{{ cachorroPesquisado }}</strong
          >. 🐶
        </p>
      </v-col>
    </v-row>

    <v-data-iterator :items="imagens"
     :items-per-page.sync="itemsPerPage"
     :footer-props="{
       'items-per-page-options' : itemsPerPageArray,
       'items-per-page-all-text' : 'Todos',
     }">

      <template #default="{ items }">
      <v-row>
        <v-col v-for="enderecoImagem in items" :key="enderecoImagem">
          <CardCachorro :endereco-imagem="enderecoImagem" />
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
  },

  beforeDestroy() {},

  methods: {
    async getTodosCachorros() {
      try {
        let response = await this.$http.get(
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
        let response = await this.$http.get(
          `https://dog.ceo/api/breeds/image/random/50`
        );
        this.imagens = response.data.message;
      } catch (error) {
        console.log(error);
      }
    },

    async getCachorroSelecionado() {
      try {
        let raca = this.cachorroPesquisado.replace(" ", "/");
        let response = await this.$http.get(
          `https://dog.ceo/api/breed/${raca}/images/random/50`
        );
        this.imagens = response.data.message;
      } catch (error) {
        console.log(error);
      }
    },

    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
