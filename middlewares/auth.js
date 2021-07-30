const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const authHeader = req.get('Authentication');
    try {
        if (!authHeader) {
            const error = new Error('شما مجوز ندارید');
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRET');
        if (!decodedToken) {
            const error = new Error('شما مجوز ندارید');
            error.statusCode = 401;
            throw error;
        }

        req.id = decodedToken.user.userId;

        next();



    } catch (err) {
        next(err);

    }

}
