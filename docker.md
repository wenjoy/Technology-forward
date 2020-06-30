# Docker

`docker pull mysql` download image    
`docker images` list downloaded images    
`docker run --name yoursql -e MYSQL_ROOT_PASSWORD=123 -d mysql` run instance from image, `mysql:tag` omit means use `latest` tag    
`docker ps` list running instances     
`docker logs yoursql` check log .  
`docker exec -it yoursql bash` access docker instance

## Troublesome:
1. Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

`brew cask install docker` .  
Because docker is a system-level package, you cannot install it using brew install, and must use the cask instead.