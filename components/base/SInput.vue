<template>
  <div
    ref="inputContainer"
    class="s-input-container"
    :class="{
      valid: value && !error, // esta es la clase que le agrega los estilos cunado es valido
      error: immediateError, // esta clase es la que le agrega los estilos de error
      alert: immediateError && errorType === 'alert',
      showError: required && (!value || error), // si esta clase existe, el SForm detectara que no es valido
      invisibleError: invisibleError,
    }"
  >
    <div class="material-input-container">
      <div v-if="placeholder" class="label-container flex flex-row items-center">
        <label class="mb-0 mr-1">
        </label>
        <tool-tip v-if="tooltipMessage" :text="tooltipMessage" />
        <div v-if="modalMessage" class="pl-1 pt-1 relative inlineimpor">
          <span
            @click="$emit('onChangeModal')"
            class="inlineimpor justify-center items-center cursor-pointer"
          >
            <i class="w-6 text-xl fas fa-info-circle colorblueclaro" />
          </span>
        </div>
      </div>
      <div
        class="flex items-center w-full"
        :class="{
          'input-field h-normal': normal,
          'input-field': !textarea && !normal,
          'text-area mb-0': textarea,
          'bg-gray-100 text-BlackSecond2': disabled,
          's-input': !Asegurate,
          's-input-asegurate': Asegurate,
        }"
        @click="$refs[uuid].focus()"
      >
        <div v-if="prefixText" class="pl-4 pr-2 text-almostPureBlack">
          {{ prefixText }}
        </div>
        <textarea
          v-if="textarea"
          :ref="uuid"
          class="px-4 py-2"
          :class="{
            capitalize: capitalize,
            valid: value,
          }"
          v-model="inputValue"
          :name="name"
          :placeholder="hintText"
          :minlength="minlength"
          :maxlength="maxlength"
          :required="true"
          @input="$emit('onChange', $event)"
          @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)"
        />
        <input
          v-else
          :ref="uuid"
          class="pr-4 py-2"
          :class="{
            thin: thin,
            capitalize: capitalize,
            'pl-5': !prefixText,
          }"
          v-model="inputValue"
          :placeholder="hintText"
          :list="list"
          :type="type"
          :pattern="pattern"
          :minlength="minlength"
          :maxlength="maxlength"
          :min="min"
          :max="max"
          :title="title"
          :name="name"
          :autofocus="autofocus"
          :required="requiredinput"
          :disabled="disabled"
          :autocomplete="disabledSugestions ? 'off' : 'on'"
          @keypress="validateOnPress"
          @input="$emit('onChange', $event)"
          @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)"
        />
        <div
          v-if="(type === 'date' || showSelectIcon || showLoader) && mounted"
          class="px-4 ml-auto"
        >
        </div>
      </div>
    </div>
    <p
      v-if="showErrorMessage && required && (!value || error)"
      class="text-errorColor font-normal text-sm mb-0 mt-1 hidden inputErrorMessage"
    >
      {{
        immediateError
          ? immediateErrorMessage
          : errorMessage || "Este campo es requerido"
      }}
    </p>
  </div>
</template>
<script>
import { uuid } from "vue-uuid";

export default {
  components: {
  },
  props: {
    value: {
      required: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
    requiredinput: {
      type: Boolean,
      default: true,
    },
    pattern: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    hintText: {
      type: String,
      required: false,
    },
    thin: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    iconi: {
      type: String,
      default: "",
    },
    Asegurate: {
      type: Boolean,
      default: false,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    normal: {
      type: Boolean,
      default: false,
    },
    minlength: {
      type: String,
    },
    maxlength: {
      type: String,
    },
    title: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledSugestions: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    list: {
      type: String,
    },
    name: {
      type: String,
    },
    min: {
      type: String,
    },
    max: {
      type: String,
    },
    capitalize: {
      type: Boolean,
      default: false,
    },
    prefixText: {
      type: String,
      required: false,
    },
    tooltipMessage: {
      type: String,
      required: false,
    },
    modalMessage: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
    immediateErrorMessage: {
      type: String,
      required: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorType: {
      type: String,
      default: "error",
      validator(value) {
        return ["error", "alert"].includes(value);
      },
    },
    invisibleError: {
      type: Boolean,
      default: false,
    },
    PureText: {
      type: Boolean,
      default: false,
    },
    immediateError: {
      type: Boolean,
      default: false,
    },
    showErrorMessage: {
      type: Boolean,
      default: true,
    },
    showSelectIcon: {
      type: Boolean,
      default: false,
    },
    showLoader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uuid: uuid.v1(),
      mounted: false,
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        if (
          this.$refs.inputContainer.classList.contains("error") &&
          !this.immediateError
        ) {
          this.$refs.inputContainer.classList.remove("error");
        }
        this.$emit("input", val);
      },
    },
  },
  watch: {
    inputValue: {
      handler(val, oldVal) {
        let cadenaSinUltimoCaracter;
        if (this.PureText) {
          if (val !== oldVal && val) {
            if (val.length > 1) {
              cadenaSinUltimoCaracter = val.substr(-1);
            } else {
              cadenaSinUltimoCaracter = val;
            }
            const onlyNumbers = cadenaSinUltimoCaracter.replace(/[^0-9]+/g, "");
            if (onlyNumbers) {
              val = val.substring(0, val.length - 1);
              this.value = val;
            }
          }
        }
      },
    },
  },
  methods: {
    validateOnPress($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (
        (keyCode < 48 || keyCode > 57) &&
        keyCode !== 46 &&
        this.type === "number"
      ) {
        $event.preventDefault();
      } else {
        this.$emit("keypress", $event);
      }
    },
  },
  mounted() {
    this.mounted = true;
  },
};
</script>

<style lang="scss">
.material-input-container {
  position: relative;
  .h-normal {
    height: 40px !important;
  }
  .text-area,
  .input-field,
  .select-input {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #d3d3d3;
    height: 52px;

    input,
    textarea {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      /* padding: 0.5rem 1.2rem; */

      // desactiva icono de autocompletado en todos los inputs en safari
      &::-webkit-contacts-auto-fill-button {
        visibility: hidden;
        display: none !important;
        pointer-events: none;
        position: absolute;
        right: 0;
      }

      // desactiva el icono de datepicker en el input de tipo date ------
      &::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
      }

      &:in-range::-webkit-datetime-edit-year-field,
      &:in-range::-webkit-datetime-edit-month-field,
      &:in-range::-webkit-datetime-edit-day-field,
      &:in-range::-webkit-datetime-edit-text {
        /* color: transparent; */
        color: rgb(161, 161, 161) !important;
      }

      &:focus {
        outline-color: transparent;
        outline: none;
      }

      &:focus {
        outline-color: transparent;
        outline: none;
      }

      // type number --------------------------
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type="number"] {
        -moz-appearance: textfield;
        appearance: textfield;
      }

      //type date ----------------------------
      &[type="date"] {
        /* color: transparent; */
        color: rgb(161, 161, 161) !important;
      }

      &[type="date"]:focus::-webkit-datetime-edit {
        color: #828282 !important;
      }

      &[type="date"]::-webkit-datetime-edit-day-field:focus {
        /* background-color: #fff; */
        background-color: transparent;
      }
      //--------------------------------------
    }
  }

  .text-area {
    height: 7rem;

    textarea {
      resize: none;
    }
  }

  /* .thin {
    height: 40px;
    label {
      font-size: 15px;
    }
  } */

  .s-input:has(input:focus),
  .s-input:has(textarea:focus) {
    border: 2px solid #00cc99;
  }
  .s-input-asegurate:has(input:focus),
  .s-input-asegurate:has(textarea:focus) {
    border: 2px solid #fa733d;
  }

  label {
    /* text-transform: capitalize; */
    color: #444444 !important;
    text-align: center !important;
    font-family: Montserrat !important;
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 600 !important;
    line-height: 24px !important; /* 171.429% */
  }

  .label-container {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .calendar-icon,
  .caret-down-icon,
  .loader {
    pointer-events: none;
    width: 1.1rem;

    @media (max-width: 300px) {
      display: none;
    }
  }

  .caret-down-icon {
    width: 0.67rem;
  }

  .loader {
    width: 1.2rem;
  }

  @-webkit-keyframes inputHighlighter {
    from {
      background: #00cc99;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
  @-moz-keyframes inputHighlighter {
    from {
      background: #00cc99;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
  @keyframes inputHighlighter {
    from {
      background: #00cc99;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
}
.valid,
.invisibleError {
  .input-field,
  .text-area {
    border: 1px solid #00cc99;
    &:focus {
      outline-color: #00cc99;
    }
  }
  .inputErrorMessage {
    display: none;
  }
  .input-field {
    color: unset;
  }
}
.error {
  label {
    color: #ea1051;
  }
  .input-field,
  .text-area {
    border: 1px solid #ea1051;
    /* color: #ea1051; */

    &:focus {
      outline-color: #ea1051;
    }
  }
  .inputErrorMessage {
    display: inline;
    margin-bottom: 0;
  }
}
.alert {
  label {
    color: #027afa;
  }
  .input-field,
  .text-area {
    border: 1px solid #027afa;
    /* color: #027afa; */

    &:focus {
      outline-color: #027afa;
    }
    & ~ label {
      color: #027afa;
    }
  }
  .inputErrorMessage {
    display: inline;
    margin-bottom: 0;
  }
}
.inlineimpor {
  display: inline !important;
}
.colorblueclaro {
  color: rgba(3, 122, 250, 0.4);
}
.text-BlackSecond2 {
  color: #000 !important;
}
</style>
