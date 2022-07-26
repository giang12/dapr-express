
module.exports = function sampleExecutor({serverSettings, routeSettings, daprClient}) {

    //plain express middleware
    return async function(req, res, next) {
        console.log("Hello from sample executor")

        next();
    }
}