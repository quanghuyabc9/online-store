const httpErrors = require('http-errors');

module.exports = app => {
    app.use((req, res, next) => {
        next(httpErrors(404));
    });
    app.use((err, req, res, next) => {
        let status = err.status || 500;
        let errorCode = 'error';
        if(status === 404)
            errorCode = '400';
        if(status === 500)
            errorCode = '500';
        let errorMsg = err.message;
        res.render('errors/error', {
            layout: false,
            errorCode,
            errorMsg,
            error: err
        });
    });
};