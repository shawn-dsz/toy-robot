# Toy Robot Simulator

Check out the [Demo](http://robosim.surge.sh)

## Thoughts

The project has been developed in an object-oriented way, as requested in the brief*. I have used a test driven approach (TDD), writing my unit test first before implementation. I have written the unit tests with Mocha testing framework and [Chai's](http://chaijs.com/) expect assertion style. There is passing 27 unit test that validate the solution works.

Following object-oriented principals I have modelled the problem space using the following classes:

- ```Table``` - defines the size & validity of robot moves
- ```Robot``` - keeps track of where it is on the board
- ```Parse``` - verifies that user input is valid; does not contain business rules.
- ```commands``` - acts as a type class to resolve user Input
- ```directionResolver``` - defines the rules for moving left or right

The purpose of this project is to solve the Toy Robot puzzle described. I have not spent too much time optimizing the UI. I am aware FOUC is obvious but have chosen to ignore it for this project. However, one simple way I can resolve this is by splitting out the css from ```app.bundle.js```. I have written the app with minimal CSS and DOM manipulation, but paid attention
to architect the JavaScript logic in a long term scalable manner.

**Since, the brief stated that object-oriented principal (OOP) is to be used; I have not architected the solution using functional programming (FP).* In retrospect, if free to choose the engineering paradigm, I would implement it using Redux. This is because Redux helps you manage state in a single predictable state container. Which makes it easy to reason about with increasingly complex state changes. I also like the idea of uni-direction data flow to render UI.


###### Development workflow
I have used Webpack to help me have a fast & smooth development workflow. I configured webpack so that on any code it checks my ESLint rules, runs unit test, builds & servers my project in the browser. This setup allowed my to get constant instantaneous iterative feedback while maintaining code quality.

## Usage

Open index.html in your browser or navigate to [robosim.surge.sh](http://robosim.surge.sh).

## Technologies used

- ES2015 & [Babel](https://babeljs.io/docs/learn-es2015/)
- [Webpack](https://webpack.github.io/)
- [Karma Test Runner](https://karma-runner.github.io/0.13/index.html)
- [sass](http://sass-lang.com/)

## Installation

```bash
> npm install
```
To run the unit test using the [**Karma Test Runner**](https://karma-runner.github.io/0.13/index.html) run the following:
```
> npm run test
```

To serve the files using webpack's dev server run the following:
```
> npm run dev
```

---

# Description
- The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement
that would result in the robot falling from the table must be prevented, however further valid movement commands must still
be allowed.

- The application that can Reads in commands of the following form
```
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
```
- ```PLACE``` will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, ```EAST``` or ```WEST```.

-  The origin (0,0) can be considered to be the ```SOUTH``` ```WEST``` most corner.

-  The first valid command to the robot is a ```PLACE``` command, after that, any sequence of commands may be issued, in any order, including another ```PLACE``` command. The application should discard all commands in the sequence until a valid ```PLACE``` command has been executed.

-  ```MOVE``` will move the toy robot one unit forward in the direction it is currently facing.

-  ```LEFT``` and ```RIGHT``` will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

-  ```REPORT``` will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.

-  A robot that is not on the table can choose the ignore the ```MOVE```, ```LEFT```, ```RIGHT``` and ```REPORT``` commands.
-  Input can be from a file, or from standard input, as the developer chooses.

-  Provide test data to exercise the application.


## Constraints
The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot.
Any move that would cause the robot to fall must be ignored.

Example Input and Output:
```
a)
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH

b)
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST

c)
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
Output: 3,3,NORTH
```
