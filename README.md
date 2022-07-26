## dapr-express
simple express server with dapr sample

## features
plugins architecture:
	executors(dapr.invoke, http.proxy, redirect, pubsub, socket, etc)
	before after hooks (global and specific paths)
	authenticators & authorizers
	params parsers / validators
	CORS, json, urlencode, form, stream handlers..etc
	ratelimiters
	..
battery packs included:
healthz & readyz probs, graceful shutdown (localhost:3500/v1.0/shutdown)
http2/3, certz
grpc-grpc

simple & clean & fast

## usage

npm i -g api-ingress

//starting dapr sidecar and api-gw side by side
dapr run --app-id ingress-app --app-port 8080 --dapr-grpc-port 3500 -- dapr-express

## env vars
```
AuthPath=./plugins/auth
ExecutorsPath=./plugins/executors
HooksPath=./plugins/hooks
```