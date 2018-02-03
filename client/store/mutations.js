export default {
    PULSE_ID_SET(state, payload) {
        state.pulseId = payload
        state.comments = []
        state.replies = []
    },
    SEARCH_RESULTS(state, { type, items, parentId }) {
        if (type === 'comments') {
            state.comments = [
                ...state.comments,
                ...items
            ]
        }
        if (type === 'replies') {
            state.replies[parentId] = state.replies[parentId] || []
            state.replies[parentId] = [
                ...state.replies[parentId],
                ...items
            ]
        }
    }
}