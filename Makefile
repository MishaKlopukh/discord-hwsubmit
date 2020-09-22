.phony: build run stop

docker:
	docker build . -t discord-hwsubmit

run: docker
	docker run --rm --name hwsubmit -v `pwd`/config.json:/usr/src/app/config.json -it discord-hwsubmit

stop:
	docker container stop hwsubmit
