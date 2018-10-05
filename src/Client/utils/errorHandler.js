export const errorHandler = (history, error) => {
    console.log(error);
    const errorMessage = error.message.split(':')[0]
    history.push({
        pathname: '/error',
        state: { error: errorMessage, log: error.stack }
    });
}
export const errorHandler2 = (error, client, history) => {
    let code;
    let errorMessage = error.message.split(':')[0]
    try {
        code = error.graphQLErrors[0].extensions.code;
    } catch (error) { }
    if (code === "UNAUTHENTICATED") {
        client.resetStore();
        localStorage.removeItem('userInfo');
        errorMessage = 'AuthenticationError'
    }
    history.push({
        pathname: '/error',
        state: { error: errorMessage, log: error.stack }
    });
}