
export const signIn = (req, res, next) => {
    res.locals.status = 200;
    res.locals.data = {
        "long": 1,
        "khanh": 2
    }
    next();
};