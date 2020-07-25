FROM node:lts-alpine as front

FROM python:alpine
RUN pip3 install Django
WORKDIR /srv/backend/
