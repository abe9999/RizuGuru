const UserData = {
    namespaced: true,
    state: {
        id: "id",
        password: "password",
        name: "name",
    },
    getters: {
        getUserData(state) {
            return state;
        }
    },
    mutations: {
        setUserData(state, user) {
            state.id = user.id;
            state.password = user.password;
        }
    },
    actions: {
        setUserData(context, {user}) {
            console.log(user.id);
            console.log(user.password);
            context.commit("setUserData", user);
        },
    }
}

export default UserData