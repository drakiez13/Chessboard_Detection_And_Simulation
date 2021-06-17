APP_NAME=sannin
PORT=5000


build:
	docker build -t $(APP_NAME) .

run:
	docker run -it -p=$(PORT):$(PORT) --name="$(APP_NAME)" $(APP_NAME)

run-dev:
	docker run -d -p=$(PORT):$(PORT) --name="$(APP_NAME)dev" -v "$(shell pwd)":/app $(APP_NAME)

up-dev: build run-dev

up: build run

stop:
	docker stop $(APP_NAME); docker rm $(APP_NAME)