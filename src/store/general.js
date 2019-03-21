export default {
  state: {
    processing: false,
    error: null,
    categories: {
      cafe: {
        id: 'food',
        title: ''
      },
      cloth: {
        id: 'cloth',
        title: ''
      },
      entertainment: {
        id: 'entertainment',
        title: ''
      },
      food: {
        id: 'food',
        title: ''
      },
      home: {
        id: 'home',
        title: ''
      },
      hygiene: {
        id: 'hygiene',
        title: ''
      },
      medicine: {
        id: 'medicine',
        title: ''
      },
      other: {
        id: 'other',
        title: ''
      },
      sport: {
        id: 'sport',
        title: ''
      },
      taxi: {
        id: 'taxi',
        title: ''
      },
      transport: {
        id: 'transport',
        title: ''
      },
    }
  },
  mutations: {
    setProcessing(state, payload) {
      state.processing = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    cleanError(state) {
      state.error = null;
    }
  },
  getters: {
    getProcessing: (state) => state.processing,
    getError: (state) => state.error
  },

  actions: {},
}