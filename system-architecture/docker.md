# Docker

`docker pull mysql` download image    
`docker images` list downloaded images    
`docker run --name yoursql -e MYSQL_ROOT_PASSWORD=123 -d mysql` run instance from image, `mysql:tag` omit means use `latest` tag    
`docker run -it --entrypoint /bin/bash $IMAGE_NAME -s` specify a on boot execute command
`docker run -p host_port:container_port <image>` bind port
`docker ps` list running instances     
`docker logs yoursql` check log .  
`docker exec -it yoursql bash` access docker instance
`docker commit <container hash>` create an image form an container
`docker rm <container hash>` remove container 


## Troublesome:
1. Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

`brew cask install docker` .  
Because docker is a system-level package, you cannot install it using brew install, and must use the cask instead.

2. if your container is broken by you, try this to save the world and yourself:
   `docker cp container:path/file .`  see [this](https://stackoverflow.com/questions/32750748/how-to-edit-files-in-stopped-not-starting-docker-container)