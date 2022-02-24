function reducer(state: boolean = false, action: any) {
    switch (action.type) {
        case "login":
          return state = true
        default:
            return state = false
    }
}

export default reducer;