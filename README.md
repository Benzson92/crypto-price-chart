# Cryptocurrency Price Chart

This project was bootstrapped with React, TypeScript and Material UI.

<br />

To run the project in the development mode:

```sh
cd crypto-price-chart
```

## Running the project without Dockerfile:

Install dependencies before running the project:

```sh
yarn
```
<br />

Runs the app in the development mode.<br />
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console:

```sh
yarn dev
```
<br />

## Running the project with Dockerfile:

run Docker

build the Docker image from the Dockerfile by running the `docker build` command:

```sh
docker build -t crypto-price-chart .
```
<br />

verify the image by running the `docker images` command:

```sh
docker images
```
<br />

run the Docker image with the `docker run` command, mapping the system port 3000 to Docker container port 3000<br />
Open http://localhost:3000 to view it in the browser:

```sh
docker run -p 3000:3000 crypto-price-chart
```
<br />

## Running the test

```sh
yarn test
```
<br />
