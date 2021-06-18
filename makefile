APP_NAME=sannin
PORT=5000


build:
	docker build -t $(APP_NAME) .

run:
	docker run -it --rm -p=$(PORT):$(PORT) --name="$(APP_NAME)" $(APP_NAME) flask run -p $(PORT) -h 0.0.0.0

run-dev:
	docker run -d --name="$(APP_NAME)dev" -v "$(shell pwd)":/app $(APP_NAME)

up-dev: build run-dev

up: build run

stop:
	docker stop $(APP_NAME); docker rm $(APP_NAME)