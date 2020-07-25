FROM node:lts-alpine as front
WORKDIR /srv/frontend/
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --modules-folder ../node_modules/
ENV PATH /srv/node_modules/.bin:$PATH

FROM python:alpine
RUN pip3 install Django django-webpack-loader==0.7.0
WORKDIR /srv/backend/
