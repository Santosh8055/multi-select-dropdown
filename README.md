
**Steps to run this project locally.**

1. Clone or download the project.

2. Navigate to the downloaded path in command prompt.

3. Install dependencies by executing the following command.

```
    npm install.
```
   (This might take a while; depending on your internet speed.)

4. Start the web server by typing the following command in command prompt.

```
    npm run dev.    
```
    builds the application and starts a web server. Do not close the command prompt.

    (You should see "server is running" and "webpack: Compiled successfully." messages on the console)    

5. Above command should automatically open your browser, in case it did not. Open the         browser and type the following URL 
```    
    http://localhost:4200/
```


**About the Project file structure**

1. src folder

    This folder contains all the files related to the project, where most of the work is done. Global setup is done in the src level. The majority of our application is under src/app.

    Dropdown can be found under src/app/components.

    Service to connect to the server (provided by node) can found under the src/app/services

    Pipe to filter the data based on the input given by user can be found under the src/app/pipe.

2. style.less in src folder

    Global styles will be in this file.    

3. server folder 

    There will be two files in this folder. server.js and states.json. states.json file data will be served to project by running the server.js file.



**About the framework**

For this project, the Angular framework was chosen. Angular is a component based MVC framework. Since the project is created using cli; it is easy to write clean HTML and CSS markup. Angular has everything out-of-the-box to build a modern web app. Angular uses two-way binding; so outside the component selected state is easily available.
Angular has clear documentation and community support. 

React and Vue are great libraries with a lot of advantages but the reason for not choosing them is that they are view oriented libraries. Vue doesn't have proper IDE support because of .vue extension files.