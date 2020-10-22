const CurrentLocation = {
    namespaced: true,
    state: {
        currentLocation: {
            lat: null,
            lng: null
        }
    },
    mutations: {
        setCurrentLocation(state, currentLocation) {
            state.currentLocation = currentLocation

        }
    },
    actions: {
        setCurrentLocation(context, currentLocation) {
            context.commit("setCurrentLocation", currentLocation);

        }
    },
    getters: {
        getCurrentLocation(state) {
            return state.currentLocation
        }
    }
}

export default CurrentLocation;