# slack-bot 

This project is a Slack bot with two commands.
In order to run, you need just build Dockerfile then create a container.

`npm run docker-build` (This command will create an image in your docker system)

`npm run release` (This command increases the software version and Docker image version as well, so as to get this, I'm using the npm standard-version library and conventional commits. 

You can read about that here:

Also, this project includes a bitbucket-pipeline file which will be tasked to build and deploy image into AWS ECR.
