APP_NAME=sannin
PORT=80
DOCKERHUB_REPO='drakiez92/sannin'
build:
	docker build -t $(APP_NAME) .

run:
	docker run -it --rm -p=$(PORT):$(PORT) --name="$(APP_NAME)" $(APP_NAME) flask run -p 80 -h 0.0.0.0

up: build run

stop:
	docker stop $(APP_NAME); docker rm $(APP_NAME)

push:
	docker tag $(APP_NAME):latest $(DOCKERHUB_REPO):latest
	docker push $(DOCKERHUB_REPO):latest