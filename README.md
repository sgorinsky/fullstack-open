# Fullstack Open
https://fullstackopen.com/en/

Originally done in mid-2019, this is my work from the an online project-based course to learn fullstack web development primarily in the React-Express stack.
At the time of this course, there were 7 primary modules, with an additional optional module comprising graphql. The course handled the then-new addition of hooks in React 16

## 0 - Web app fundamentals
Overview of the basic client and REST architecture. This module's work comprises building entity-relationship diagrams to gain an understanding of the primary architecture for many modern web applications. That is to say, some client -- in our case, a browser -- makes requests to some api that sits in between the user and the company's database that provides relevant data for the user to consume.

## 1 - Introduction to React
To learn React and the structure of the frontend, we can build a rote application that handles state with in forms and creating displayable entries for the user. This is done with two basic apps, a notes and phonebook app. We can add non-persistent notes or user address entries to our respective notes and phonebook apps that, once submitted, display content for users.

## 2 - Communicating with a server
One of the primary issues with the work done in the previous module was the lack of persistence in our frontend. Whenever a user submitted a form for either our notes or phonebook apps and refreshed the page, the content they submitted was lost because the data wasn't saved. Before creating persistence layer in next module, we first practice querying and handling data from REST api for the various frontends we construct.

## 3 - Creating a server with Node and Express
To address internals of backend construction, we create apis to handle basic CRUD functionality frontend apps we created in previous modules. However, since we haven't set up a db instance, we model that by creating functionality to write objects to a `db.json` file. Once we have that local db modeled, we create a mongodb collection that we query using their  object-relational-modeler api `mongoose` to populate frontend content.

## 4 - Testing backend, user administration
Create unit and integration tests for backend apps using `jest`

## 5 - Testing frontend
Mocking unit, integration, and end-end testing using `jest`

## 6 - Global state management with Redux
We implemented local state in prior modules using React. Now, with Redux, we can implement global state, instead of passing down local props in DOM components from parents to distant children. We implement our previous frontend applications using Redux to handle state.

## 7 - React router, custom hooks, styling, webpack module bundling
For creating different pages on our site, we use `react-router` for single page application route handling. Additionally, we create our own hooks as abstractions for different use cases for our apps, implement styling in different frameworks, and bundle our apps using webpack.

## 8 - GraphQL
In this module, we implement `graphql` as an alternative way of modeling and representing data to query from our backend. 



