Gorry Gourmet CMS

## Install Docker
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce
```

## How to Run
```
sudo docker build -f Dockerfile -t gorrygourmet-cms .
sudo docker run -p 3000:3000 gorrygourmet-cms 
```
## Run in Background
```
sudo docker build -f Dockerfile -t gorrygourmet-cms .
sudo docker run -t -d -p 3000:3000 gorrygourmet-cms
```
## Docker
### List Container
```
sudo docker ps
sudo docker ps -a
```
### Delete Container
`sudo docker container rm [CONTAINERID]`
### List Images
`sudo docker images`
### Delete Images
`sudo docker image rm [CONTAINERID]`
### Delete All Container and Images
`sudo docker system prune`

## Env
```
ENV=production
API_PRODUCT=https://lpdev.gorrygourmet.com/api/product
API_PRODUCT_GALLERY=https://cy7m7au9oe.execute-api.ap-southeast-1.amazonaws.com/latest/api/productImages
API_ORDER='https://lpdev.gorrygourmet.com/api/orderlp'
API_MIDTRANS=https://lpdev.gorrygourmet.com/api/generateToken
PORT=3000
```
