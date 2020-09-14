const Search = {
    namespaced: true,
    state: {
      keyword: ''
    },
    getters: {
      states(state) {
        return state;
      },
    },
    mutations: {
      setKeyword(state, value) {
        state.keyword = value;
      },
    },
    actions: {
      setKeyword(context, value) {
        context.commit("setKeyword", value);
      },
    },
  };
  
  export default Search;
  