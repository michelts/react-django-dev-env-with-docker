FROM node:lts-alpine as front

FROM python:alpine
RUN pip3 install Django django-webpack-loader==0.7.0
WORKDIR /srv/backend/
