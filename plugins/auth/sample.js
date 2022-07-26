
module.exports = function SampleAuth({app, routeSettings, serverSettings, routes}) {

    return async function(req, res, next) {
        // Read the token from header
        let auth = req.headers["authorization"];
        if (!(auth && auth.startsWith("Bearer"))) {
            // No token
            res.status(403);
            return next(new Error("UnAuthorized!"));
        }
        let token = auth.slice(7);
        console.log(`authToken=${token}`);
        // Check the token
        if (token !== "123456") {
        	res.status(403);
            return next(new Error("UnAuthorized!"));
        }

        req.user = { id: 1, name: "John Doe" };
        next();
    };
}