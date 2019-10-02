export const defaults = {
      isLggedIn: localStorage.getItem('token') !== null
};

export const resolvers = {
    Mutation: {
        logUserIn: (_, { token }, { cache }) => {
            localStorage.setItem('token', token);
            cache.writeData({
                data: { isLoggedIn: true }
            });

            return null;
        },
        logUserOut: (_, __, { cache }) => {
            localStorage.removeItem('token');

            window.location.reload();

            return null;
        }
    }
};