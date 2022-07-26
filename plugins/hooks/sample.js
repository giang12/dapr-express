module.exports = function sampleHooks({serverSettings, routes, routeSettings, daprClient}) {

    return async function(req, res, next) {
        console.log("Hello from sample sampleHooks")
    	//remember to call next() if you send reponse yourself
        next();
    }
}