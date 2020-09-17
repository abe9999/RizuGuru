const Filtering = {
  namespaced: true,
  state: {
    isFiltered: false,
    station: "",
    genre: "",
    distance: {
      value: 700,
    },
    budget: {
      value: [300, 700],
    },
    obsessions: [
      { id: 11, boolean: false },
      { id: 12, boolean: false },
      { id: 13, boolean: false },
      { id: 14, boolean: false },
    ],
  },
  getters: {
    states(state) {
      return state;
    },
  },
  mutations: {
    setStationKeyword(state, keyword) {
      state.station = keyword;
    },
    setGenreKeyword(state, keyword) {
      state.genre = keyword;
    },
    setDistance(state, value) {
      state.distance.value = value;
    },
    setBudget(state, value) {
      state.budget.value = value;
    },
    tagToggle(state, index) {
      state.obsessions[index].boolean = !state.obsessions[index].boolean;
    },
    filtered(state) {
      state.isFiltered = true;
    },
  },
  actions: {
    // テキストボックスのタイプ別のミューテーション呼び出し
    setKeyword(context, { type, keyword }) {
      switch (type) {
        case "station":
          context.commit("setStationKeyword", keyword);
          break;
        case "genre":
          context.commit("setGenreKeyword", keyword);
          break;
      }
    },
    // レンジスライダーのタイプ別のミューテーション呼び出し
    setRange(context, { type, value }) {
      switch (type) {
        case "distance":
          context.commit("setDistance", value);
          break;
        case "budget":
          context.commit("setBudget", value);
          break;
      }
    },
    // タグのトグル動作を行うミューテーション呼び出し
    tagToggle(context, index) {
      context.commit("tagToggle", index);
    },
    filtered(context) {
      context.commit("filtered");
    },
  },
};

export default Filtering;
