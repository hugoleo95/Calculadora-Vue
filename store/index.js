import Vue from 'vue';
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    state: () => ({
      globalProponent: {
        name: null,
        last_name: null,
        email: null,
        phone: null,
        rut: null,
        user_st: null,
        razon_social: null,
        user_name_st: null,
        insured_maternal_name: null,
        promotional_code: null,
      },
      currentQuoter: null,
      technical_plan: null,
      proposaledit: null,
      currentStep: null,
      currentTag: null,
      previousStep: null,
      totalSteps: null,
      globalCampaign: null,
      product_group: null,
      globalpartnership: null,
      modalErrorMessages: null,
      locations: {
        address: null,
        commune: null,
        location: null,
        ofi: null,
        piso: null,
        region: null,
      },
      showAddressMap: false,
      mapCurrentPlace: null,
      dataBlog: [],
      option: '',
      ga_id: '',
      extra_data: {
        id: '',
        cio_id: ''
      },
      darkMode: false,
      mobile_nav: false,
      menuBlog: {
        tips: true,
        todo: true,
        seguros: true,
        actualidad: true,
        innovacion: true,
        talks: true,
        opinion: true,
        prensa: false,
        recent: true,
      },
      peerPage: 4,
    }),
    mutations: {
      setCurrentQuoter: (state, quoter) => state.currentQuoter = quoter,
      setCurrentQuoterSelect: (state, option = null) => state.technical_plan = option,
      setCurrentTagSelect: (state, option = null) => state.currentTag = option,
      setCurrentQuoterSelectProposalEdit: (state, option = null) => state.proposaledit = option,
      changeCurrentStep: (state, step = null) => state.currentStep = step,
      changePreviousStep: (state, step = null) => state.previousStep = step,
      setTotalSteps: (state, steps = null) => state.totalSteps = steps,
      setCampaign: (state, campaign = null) => state.globalCampaign = campaign,
      setGroup: (state, product_group = null) => state.product_group = product_group,
      setpeerPage: (state, page = null) => state.peerPage = page,
      ViewProductsss: (state, option = null) => state.menuBlog.prensa = option,
      ChangeUserSt: (state, option = null) => state.globalProponent.user_st = option,
      ChangeUserNameSt: (state, option = null) => state.globalProponent.user_name_st = option,
      onChangeGlobalProponentInfoAll: (state, option = null) => state.globalProponent = option,
      setModalErrorMessages: (state, error = null) => state.modalErrorMessages = error,
      onChangeGlobalProponentInfo: (state, event) => Vue.set(state.globalProponent, event.target.name, event.target.value),
      toggleAddressMap: (state, bool = false) => state.showAddressMap = bool,
      toggleMobile: (state, bool) => state.mobile_nav = bool,
      changeCurrentMapPlace: (state, place = null) => state.mapCurrentPlace = place,
      updateLocations(state, { event }) {
        Vue.set(state.locations, event.target.name, event.target.value)
      },
      updateAPPerson(state, { event }) {
        Vue.set(state.locations, event.target.name, event.target.value)
      },
      ViewProducts(state, option = null) {
        state.mobile_nav = false;
        state.peerPage = 12;
        if (option === "todo") {
          state.peerPage = 4;
          state.menuBlog.tips = true;
          state.menuBlog.todo = true;
          state.menuBlog.seguros = true;
          state.menuBlog.actualidad = true;
          state.menuBlog.innovacion = true;
          state.menuBlog.talks = true;
          state.menuBlog.opinion = true;
          state.menuBlog.recent = true;
        } else if (option === "tips") {
          state.menuBlog.todo = false;
          state.menuBlog.tips = true;
          state.menuBlog.seguros = false;
          state.menuBlog.actualidad = false;
          state.menuBlog.innovacion = false;
          state.menuBlog.talks = false;
          state.menuBlog.opinion = false;
          state.menuBlog.prensa = false;
          state.menuBlog.recent = false;
        } else if (option === "seguros") {
          state.menuBlog.todo = false;
          state.menuBlog.tips = false;
          state.menuBlog.seguros = true;
          state.menuBlog.actualidad = false;
          state.menuBlog.innovacion = false;
          state.menuBlog.talks = false;
          state.menuBlog.opinion = false;
          state.menuBlog.prensa = false;
          state.menuBlog.recent = false;
        } else if (option === "actualidad") {
          state.menuBlog.tips = false;
          state.menuBlog.seguros = false;
          state.menuBlog.actualidad = true;
          state.menuBlog.innovacion = false;
          state.menuBlog.talks = false;
          state.menuBlog.opinion = false;
          state.menuBlog.todo = false;
          state.menuBlog.prensa = false;
          state.menuBlog.recent = false;
        } else if (option === "innovacion") {
          state.menuBlog.tips = false;
          state.menuBlog.seguros = false;
          state.menuBlog.actualidad = false;
          state.menuBlog.innovacion = true;
          state.menuBlog.talks = false;
          state.menuBlog.opinion = false;
          state.menuBlog.todo = false;
          state.menuBlog.prensa = false;
          state.menuBlog.recent = false;
        } else if (option === "talks") {
          state.menuBlog.tips = false;
          state.menuBlog.seguros = false;
          state.menuBlog.actualidad = false;
          state.menuBlog.innovacion = false;
          state.menuBlog.talks = true;
          state.menuBlog.opinion = false;
          state.menuBlog.todo = false;
          state.menuBlog.prensa = false;
          state.menuBlog.recent = false;
        } else if (option === "opinion") {
          state.menuBlog.tips = false;
          state.menuBlog.seguros = false;
          state.menuBlog.actualidad = false;
          state.menuBlog.innovacion = false;
          state.menuBlog.talks = false;
          state.menuBlog.opinion = true;
          state.menuBlog.todo = false;
          state.menuBlog.prensa = false;
          state.menuBlog.recent = false;
        } else if (option === "prensa") {
          state.menuBlog.tips = false;
          state.menuBlog.seguros = false;
          state.menuBlog.actualidad = false;
          state.menuBlog.innovacion = false;
          state.menuBlog.talks = false;
          state.menuBlog.opinion = false;
          state.menuBlog.todo = false;
          state.menuBlog.prensa = true;
          state.menuBlog.recent = false;
        } else if (option === "recent") {
          state.menuBlog.tips = false;
          state.menuBlog.seguros = false;
          state.menuBlog.actualidad = false;
          state.menuBlog.innovacion = false;
          state.menuBlog.talks = false;
          state.menuBlog.opinion = false;
          state.menuBlog.todo = false;
          state.menuBlog.prensa = false;
          state.menuBlog.recent = true;
        }
      },
    },
    actions: {
      goToContactSection({ commit }, previousStep) {
        commit('changeCurrentStep', 7);
        commit('changePreviousStep', previousStep);
      },
      goBackFromContactSection({ state, commit }) {
        commit('changeCurrentStep', state.previousStep);
        commit('changePreviousStep', null);
      },
      async PostEvent({ state, commit }, { event }) {
       
      },
      async PostEvent2({ state, commit }, { event }) {
      },
    },
  });
};

export default createStore