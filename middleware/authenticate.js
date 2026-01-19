

const isAuthenticated =(req, res, next) => {
    if (req.session.user === undefined){
        return res.status(400).json('you do not have access.')
    }
    next();
};

module.exports = {
    isAuthenticated
}