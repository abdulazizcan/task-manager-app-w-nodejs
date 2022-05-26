FROM node
RUN apt-get update
WORKDIR opt/task-management/
COPY . .
ENV MONGO_URI="mongodb+srv://abdulaziz:1234@cluster.usv45.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
CMD ["npm", "start","app.js"]
