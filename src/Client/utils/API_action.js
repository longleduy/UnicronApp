export const signOut =  async (client,history) => {
    client.resetStore();
    localStorage.removeItem('userInfo');
    history.push('/');
}