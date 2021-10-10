# Inconspicuous Encryption

## Description
This web application is a steganography encryption algorithm application. This is a term project for WSU CPTS 427 Intro to Computer Science Course.

### Installation Steps

How to install required packages.
1. For yarn
    1. `npm install --global yarn` ([Link](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) to documentation)
2. If react is not present after calling npm install
    1. `npm install react-scripts --save` ([Link](https://stackoverflow.com/questions/47928735/react-scripts-is-not-recognized-as-an-internal-or-external-command) for troubleshooting) 
    2. You can also try `yarn add react` ([Link](https://classic.yarnpkg.com/lang/en/docs/cli/add/) for yarn react documentation)
    
3. For flask
    1. got to the `react-backend`
    2. run `source venv/Scripts/activate`
    3. You should now be in a virtual environment
    4. Within the virtual environment run `pip install Flask` ([Link](https://flask.palletsprojects.com/en/2.0.x/installation/) to flask documentation)
4. For ant design
    1. `yarn add antd` ([Link](https://ant.design/docs/react/use-in-typescript) to ant design documentation)
5. For typescript
    1. `npm install -g typescript` ([Link](https://www.typescriptlang.org/download) to typescript documentation)

## Functionality

1. Fork the repo
2. If you want to change code and have vs code installed `code qpi-webapp`
3. To run the webapp locally
    1. Go inside the `qpi-webapp` folder
    2. Go inside the `react-frontend` folder
    3. To run the frontend:
        1. `yarn start` <br>
        **Note**: you can only run the backend to look at the UI and designs, but in order for functionality of the UI you need to run the backend as well <br>
      
    1. To run the backend:
        1. open a new terminal
        2. go to the `react-frontend` folder again
        3. `yarn start-back` <br>
        **Note**: You need to go to the frontend instead of the backend folder because the yarn script needs the `package.json` file



### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start-back`

Runs the backend for the application in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You can also use print statements in the code and they will appear in the terminal.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
