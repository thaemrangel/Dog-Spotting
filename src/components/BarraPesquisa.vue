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
    tiposDeCachorro() {
      return this.racasCachorro.reduce((arrayFinal, cachorro) => {
        if (cachorro.subRaca.length === 0) {
          arrayFinal.push(cachorro.raca);
          return arrayFinal;
        }
        return [
          ...arrayFinal,
          ...cachorro.subRaca.map((subRaca) => `${subRaca} ${cachorro.raca}`),
        ];
      }, []);
    },
  },

  watch: {},

  created() {},

  mounted() {
    this.getTodosCachorros();
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

      console.log(this.racasCachorro); 
    },

    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
