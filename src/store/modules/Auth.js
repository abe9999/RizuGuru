const Auth = {
    namespaced: true,
    state: {
        isAuthed: false
    },
    mutations: {
        setAuth(state, bool) {
            state.isAuthed = bool

        }
    },
    actions: {
        setAuth(context, bool) {
            context.commit("setAuth", bool);

        }
    },
    getters: {
        getAuth(state) {
            return state.isAuthed
        }
    }
}

export default Auth;