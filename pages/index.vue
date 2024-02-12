<template>
  <div id="top bg-slate-300">
    <div class="flex justify-center pt-3 md:pt-16">
      <div class="row">
        <div class="">
          <div class="display-t">
            <div class="display-tc animate-box" data-animate-effect="fadeIn">
              <h1 class="text-center text-negro font-bold text-xl mt-3">
                <span
                  class="bg-simplee text-negro text-2xl md:text-4xl font-bold colorprincipal"
                  >Calculadora especial
                </span>
              </h1>
            </div>
            <div class="w-full flex flex-col mt-6">
              <span class="mb-5 text-primary text-xl font-bold"
                >Por favor ingrese el usuario para generar el calculo</span
              >
              <s-input
                class=""
                v-model="user.name"
                placeholder="Nombre de usuario"
              />
              <div class="flex flex-row justify-center mt-6">
                <button
                  class="text-white bg-primary border rounded-lg h-12 font-normal text-sm md:text-base focus:outline-none mb-8 w-full w-40 md:w-40"
                  @click="modalsuccess = false"
                >
                  Siguiente
                </button>
              </div>
            </div>
            <form class="w-full" @submit.prevent="ViewResults">
              <div class="w-full flex flex-col mt-6">
                <span class="mb-5 text-primary text-lg font-medium"
                  >Ingrese los operandos para calcular</span
                >
                <div class="w-full flex md:flex-row flex-col">
                  <s-input
                    class="w-full md:w-1/3 mr-3"
                    v-model="user.operador1"
                    placeholder="Operando 1"
                  />
                  <s-input
                    class="w-full md:w-1/3 mr-3"
                    v-model="user.operador2"
                    placeholder="Operando 2"
                  />
                  <s-input
                    class="w-full md:w-1/3"
                    v-model="user.operador3"
                    placeholder="Operando 3"
                  />
                </div>
              </div>
              <div class="w-full mt-5">
                <span class="text-primary text-base font-medium"
                  >El resultado de la operación es: {{ resultado }}</span
                >
              </div>
              <div class="flex flex-row justify-center mt-6">
                <button
                  class="text-white bg-primary border rounded-lg h-12 font-normal text-sm md:text-base focus:outline-none mb-8 w-full w-40 md:w-40"
                  type="submit"
                >
                  Calcular
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import SInput from "~/components/base/SInput.vue";
export default {
  data() {
    return {
      resultado: "",
      user: {
        name: "",
        operador1: "",
        operador2: "",
        operador3: "",
        resultado: "",
      },
    };
  },
  components: {
    SInput,
  },
  head() {
    const title = "Calculadora especial";
    const description = "Calculadora especial de tres operando";
    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", name: "og:title", content: title },
        { hid: "og:description", name: "og:description", content: description },
        { hid: "og:type", name: "og:type", content: "article" },
        { hid: "twitter:title", name: "twitter:title", content: title },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  computed: {},
  methods: {
    ...mapActions(["PostEvent"]),
    ...mapMutations(["setCurrentTagSelect"]),
    ViewResults() {
      let result;
      const regex = /^[0-9]*$/;
      const onlyNumbers1 = regex.test(this.user.operador1);
      const onlyNumbers2 = regex.test(this.user.operador2);
      const onlyNumbers3 = regex.test(this.user.operador3);
      console.log(onlyNumbers1, onlyNumbers2, onlyNumbers3);
      if (onlyNumbers1 && onlyNumbers2 && onlyNumbers3) {
        result =
          parseFloat(eval(this.user.operador1)) +
          parseFloat(eval(this.user.operador2)) +
          parseFloat(eval(this.user.operador3));
      } else {
        result =
          this.user.operador1 + this.user.operador2 + this.user.operador3;
      }
      this.resultado = result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
