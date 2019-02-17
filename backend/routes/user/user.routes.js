const express                   = require('express');
const userRouter                = express.Router({ mergeParams: true });
const { register, login }       = require('./user.controller');


class UserRouterClass {
    
    routes() {
        
        userRouter.get('/', (req, res) => {
            res.json('HATEOAS for auth');
        });

        // Register
        userRouter.post('/register', (req, res) => {
            // Use controller function
            
            register(req.body)
            //.then( apiResponse => res.json(apiResponse) )
            //.catch( apiResponse => res.json(apiResponse) )
        });

        // Login
        userRouter.post('/login', (req, res) => {
            // Use controller function
            //console.log('REQ : ', req.body)
            login(req.body)
            //.then( apiResponse => res.json(apiResponse) )
            //.catch( apiResponse => res.json(apiResponse) )
        });

        
    };

    init(){
        this.routes();
        return userRouter;
    }
}

module.exports = UserRouterClass;
