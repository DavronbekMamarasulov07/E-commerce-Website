const InitialState = {
    loading : false,
    user : null,
    token: null,
    error: null,
    isSucess: false,
    isError: false
}

const  Reducer = (state = InitialState, action) => {
    console.log(action)
}

export default Reducer