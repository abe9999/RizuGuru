const Location = {
  namespaced: true,
  state: {
    lat: 0,
    lng: 0,
  },
  getters: {
    states(state) {
      return state;
    },
  },
  mutations: {
    setLocation(state, value) {
      state.lat = value.value.lat;
      state.lng = value.value.lng;
    },
  },
  actions: {
    setLocation(context, value) {
      context.commit("setLocation", value);
    },
  },
};

export default Location;
