// error_handler.js
function error_handler(err, req, res, next) {
    console.error(err); // Log the error
    res.status(500)
    res.render('errors/500')

}

module.exports = error_handler;