all: clean

clean:
	mvn clean

compile:
	mvn compile

build: compile
	mvn package

run: build
	echo Starting Spring at:  http://localhost:8080
	java -jar /target/server-0.1.jar 

docker-build:
	docker build -t server . 

docker-push:
	mvn package
	docker login
	docker build -t dattritat/server:v0.1 .          
	docker push dattritat/server:v0.1