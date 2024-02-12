<template>
  <div class="bg-slate-300 w-full justify-center flex">
    <div class="flex w-1/2 items-center justify-center pt-3 md:pt-16">
      <div class="row">
        <div class="w-full">
          <div class="display-t w-full">
            <h1 class="text-center text-negro font-bold text-xl mt-3">
              <span
                class="bg-simplee text-negro text-2xl md:text-4xl font-bold colorprincipal"
                >Calculadora especial
              </span>
            </h1>
            <div class="w-full flex justify-center items-center flex-col mt-6">
              <span class="mb-5 text-primary text-xl font-bold"
                >Por favor ingrese el usuario para generar el calculo</span
              >
              <s-input
                class="w-full md:w-1/2"
                v-model="user.name"
                placeholder="Nombre de usuario"
              />
              <div
                v-if="errorusuario"
                class="w-full mt-1 flex justify-center items-center"
              >
                <span class="text-red-600 text-sm font-bold"
                  >Operación ya fue realizada con este usuario</span
                >
              </div>
              <div
                v-if="buttonsiguiente"
                class="flex flex-row justify-center mt-6"
              >
                <button
                  class="text-white bg-primary border rounded-lg h-12 font-normal text-sm md:text-base focus:outline-none mb-8 w-full w-40 md:w-40"
                  @click="
                    step = 2;
                    buttonsiguiente = false;
                  "
                >
                  Siguiente
                </button>
              </div>
            </div>
            <form
              v-if="step === 2"
              class="w-full"
              @submit.prevent="ViewResults"
            >
              <div class="w-full flex flex-col mt-6">
                <span class="mb-5 text-primary text-lg font-medium"
                  >Ingrese los operandos para calcular</span
                >
                <div class="w-full flex md:flex-row flex-col">
                  <s-input
                    class="w-full md:w-1/3 mr-3"
                    v-model="user.operador1"
                    hintText="Operando 1"
                    :requiredinput="false"
                    :required="false"
                  />
                  <s-input
                    class="w-full md:w-1/3 mr-3"
                    v-model="user.operador2"
                    hintText="Operando 2"
                    :requiredinput="false"
                    :required="false"
                  />
                  <s-input
                    class="w-full md:w-1/3"
                    v-model="user.operador3"
                    hintText="Operando 3"
                    :requiredinput="false"
                    :required="false"
                  />
                </div>
              </div>
              <div
                v-if="erroroperacion"
                class="w-full mt-1 flex justify-center items-center"
              >
                <span class="text-red-600 text-sm font-bold"
                  >Debe ingresar el operando 1 y el operando 2 para realizar el
                  calculo</span
                >
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
import { mapState } from "vuex";
import SInput from "~/components/base/SInput.vue";
export default {
  data() {
    return {
      resultado: "",
      erroroperacion: false,
      errorusuario: false,
      buttonsiguiente: true,
      step: 1,
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
  computed: { ...mapState(["CalcUsers"]) },
  methods: {
    ViewResults() {
      if (!this.user.operador1 || !this.user.operador2) {
        this.erroroperacion = true;
      } else {
        this.errorusuario = false;
        const Object = this.CalcUsers;
        for (let i = 0; i < Object.length; i++) {
          if (
            Object[i].operador1 === this.user.operador1 &&
            Object[i].operador2 === this.user.operador2 &&
            Object[i].operador3 === this.user.operador3
          ) {
            this.user.name = Object[i].name;
            this.errorusuario = true;
          }
        }
        this.erroroperacion = false;
        let result;
        const regex = /^[0-9]*$/;
        const onlyNumbers1 = regex.test(this.user.operador1);
        const onlyNumbers2 = regex.test(this.user.operador2);
        const onlyNumbers3 = regex.test(this.user.operador3);
        if (onlyNumbers1 && onlyNumbers2 && onlyNumbers3) {
          let operador3 = this.user.operador3;
          if (!operador3) {
            operador3 = 0;
          }
          result =
            parseFloat(eval(this.user.operador1)) +
            parseFloat(eval(this.user.operador2)) +
            parseFloat(eval(operador3));
        } else {
          result =
            this.user.operador1 + this.user.operador2 + this.user.operador3;
        }
        this.resultado = result;
        const existUser = this.CalcUsers.find((p) => p.name === this.user.name);
        if (existUser) {
          const filtrados = this.CalcUsers.filter(
            (item) => item.name !== this.user.name
          );
          let payloadtotal = [];
          if (this.CalcUsers) {
            payloadtotal = [...filtrados];
          }
          const payload = {
            name: this.user.name,
            operador1: this.user.operador1,
            operador2: this.user.operador2,
            operador3: this.user.operador3,
            resultado: this.resultado,
          };
          payloadtotal.push(payload);
          this.$store.commit("PostUsersCalculate", payloadtotal);
        } else {
          let payloadtotal = [];
          if (this.CalcUsers) {
            payloadtotal = [...this.CalcUsers];
          }
          const payload = {
            name: this.user.name,
            operador1: this.user.operador1,
            operador2: this.user.operador2,
            operador3: this.user.operador3,
            resultado: this.resultado,
          };
          payloadtotal.push(payload);
          this.$store.commit("PostUsersCalculate", payloadtotal);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
