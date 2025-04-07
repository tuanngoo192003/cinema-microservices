 #!/bin/bash
USERNAME=tuanngoo192003
IMAGES=(
  "cinema-microservices-reactapp"
  "cinema-microservices-proxy"
  "cinema-microservices-cinemaservice"
  "cinema-microservices-userservice"
  "cinema-microservices-bookingservice"
  "mongo"
)
for IMAGE in "${IMAGES[@]}"
do
  TAG="$USERNAME/$IMAGE:latest"

  if [ "$IMAGE" == "mongo" ]; then
    TAG="$USERNAME/cinema-microservices-mongo:latest"
  fi

  echo "Tagging $IMAGE as $TAG"
  docker tag $IMAGE:latest $TAG

  echo "Pushing $TAG"
  docker push $TAG
done