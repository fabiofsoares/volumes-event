const express       = require('express');
const userRouter    = express.Router({ mergeParams: true });


class UserRouterClass {
    
    routes() {
        
        userRouter.get('/', (req, res) => {
            res.json('HATEOAS for auth');
        });
        
    };

    init(){
        this.routes();
        return userRouter;
    }
}

module.exports = UserRouterClass;
