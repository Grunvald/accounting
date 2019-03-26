export default {
  state: {
    processing: false,
    error: null,
    categories: {
      cafe: {
        id: 'cafe',
        title: 'Кафе'
      },
      cloth: {
        id: 'cloth',
        title: 'Одежда'
      },
      entertainment: {
        id: 'entertainment',
        title: 'Развлечения'
      },
      food: {
        id: 'food',
        title: 'Еда'
      },
      home: {
        id: 'home',
        title: 'Быт'
      },
      hygiene: {
        id: 'hygiene',
        title: 'Гигиена'
      },
      medicine: {
        id: 'medicine',
        title: 'Медицина'
      },
      other: {
        id: 'other',
        title: 'Другое'
      },
      sport: {
        id: 'sport',
        title: 'Спорт'
      },
      taxi: {
        id: 'taxi',
        title: 'Такси'
      },
      transport: {
        id: 'transport',
        title: 'Транспорт'
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
    getError: (state) => state.error,
    getDefauilState: (state) => state.categories,
    today: () => new Date()
  },

  actions: {},
}