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
          :items="listaCachorros"
        >
        </v-autocomplete>

        <p v-if="cachorroPesquisado !== ''" class="selectCachorro">
          Você pesquisou por:
          <strong class="orange--text">{{ cachorroPesquisado }}</strong
          >. 🐶
        </p>
      </v-col>
    </v-row>

    <v-row>
      <card-cachorro :raca="cachorroPesquisado"></card-cachorro>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BarraPesquisa",
  components: {},
  props: {},
  data: () => ({
    cachorroPesquisado: "",
    racasCachorro: [],
  }),
  computed: {
    listaCachorros() {
      const dados = this.racasCachorro.message;
      let racas = [];

      for (let key in dados) {
        if (key.indexOf(dados[key]) >= 0) {
          racas.push(`${this.capitalize(key)}`);
        }

        for (let keySubracas in dados[key]) {
          dados[key].forEach((element) => {
            racas.push(`${this.capitalize(element)} ${this.capitalize(key)}`);
          });
        }
      }

      return racas.sort();
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.getTodosCachorros();
  },
  beforeDestroy() {},
  methods: {
    getTodosCachorros() {
      fetch("https://dog.ceo/api/breeds/list/all")
        .then((resposta) => resposta.json())
        .then((racas) => (this.racasCachorro = racas));
    },

    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
 