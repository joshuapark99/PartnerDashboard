If you are familiar with Docker and using Docker Desktop. I made it easy to start everything with the docker-compose.yaml file. 
You can just run docker-compose up --build and once that's finished, you should be able to see the UI on localhost:3000.

If not, you will have to set up each thing on your own. 
Navigate to /backend just run npm install and npm start and it should open up port 5000 for the API.
Navigate to /frontend and run npm install and npm start and it should automatically open up localhost:3000 on your browser.
You will have to set up a Postgres database and place the URL into a .env file in the backend folder using "DATABASE_URL=your url".
Then run the db.sql file in the initdb folder to setup the DB with some sample data.
I was doing this with psql -U :username: -d :dbname: -f db.sql
