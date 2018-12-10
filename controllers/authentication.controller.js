const Error = require("../models/ApiError");
const User = require("../models/User");
const auth = require("../auth/authentication");

module.exports = {

    validateToken(req, res, next) {
        console.log("validatie token");
        let token = req.header("x-access-token") || '';
        auth.decodeToken(token, (err, payload) => {
            if (err) {
                const error = new Error(401, err.message || err);
                next(error);
            } else {
                console.log("geauthenticeerd payload = ");
                req.user = payload.sub;
                console.log(req.user);
                next();
            }
        });
    },

    loginUser(req,res,next){
        const userProps = req.body;

        if(userProps.username === user.username && userProps.password === user.password){
            res.status(200).json({
                "token": auth.encodeToken(rows[0].id),
                "username": user.username
            })
            .catch((err) =>{
                next(new Error(err, 401 +" Password or Username is/are incorrect"))
            })
        }

    },

    registerUser(req, res, next) {
        const userProps = req.body;

        User.create(userProps)
            .then(user => {
                res.status(201).json({
                    "message": "User has been succesfully created.",
                    "code": 201,
                    "token": auth.encodeToken(rows[0],id),
                    "user": user
                })
            })
            .catch((err) => {
                next(new Error(err, 500))
            })
    },


}