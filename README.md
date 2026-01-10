# olatcg-frontend 🧬

OLATCG is an easy-to-use bioinformatics interface for students from all over the world. 🌎 

## Descrition 📃

Focused on high school and earlier graduation, the platform makes it possible to perform different types of Bioinformatics analysis through pre-established pipelines. Besides it, OLATCG has a **_learn_** section that attempts not only to demonstrate how to use the available **_tools_**, but understand what's behind it's implementation. All available tool uses accurate computatinal models widely disseminated in the scientific academy.

## What can I do with OLATCG? 🤔

Actually, besides the tutorials and explanations present in learn section, we have some features that the actual tools allows us to do. With OLATCG's tools you can

- Align two sequences
  - Globally
  - Locally

- Perform phylogenetic study of multiple sequences getting informations (based on serach against OLATCG's database) like
  - Taxonomy
  - Identity
  - Alignments
  - Country Origin
  - Correponding sequence in GenBank
  
- Generate a simple phylogenetic tree to your homology study

- Use BLASTN (in progress)

- Create your own account in the website

- Log in to access more information of the project

## Actual Deploy ☁

The project was divided in two repositories: olatcg-frontend, which can be accessed through this link https://github.com/LuizMVB/olatcg-frontend, and olatcg-backend,  https://github.com/LuizMVB/olatcg_backend . The frontend repository, as the name suggests, contains what is going to be shown on screen, and also makes a connection with the API through the Routes document. Olatcg-backend on the other hand contains the processing of the project’s data - such as Alignment and Homology search - and the information needed to use the API.


## Running Locally 🏃🏽‍♀️

- Clone the repository
  - Copy the repository link in <>Code, and then run the following command line in the terminal

```shell
git clone + repository_link
```

- Install dependencies

```shell
npm install
```

- Start the development server

```shell
npm start
```

- Or run with Docker

```shell
docker compose up --build 
```
 It will build a container in docker with the project, usually used at the beginning when it is not yet in the virtual machine.

 ## Docker 🐳

 Docker, within OLATCG development, serves as an environment to help run the site more quickly, since it has predefined characteristics to be a favorable place for it. It also guarantees security in case something harmful happens to the source code.
 The project has two files related to the OLATCG virtual machine container, docker-compose.yaml and Dockerfile. The yaml file contains information such as: the name of the container, the port it will be opened on, its restart property and the network customization of the application. The other is a text document containing the commands that users process when creating the software image in it.
 The most commonly used docker-related command lines in the system are:

 ```shell
docker compose up 
```
It will update the container with the changes made to olatcg-frontend.

 ```shell
docker compose down
```
It will delete the existing version of the container within Docker.

## About the code 💻
The project is being developed with the Material UI library, made for use within the ReactJS framework. Its organization has a common React project folder structure, separated as follows:
- pages
  - Contains the main pages that will be rendered on the screen, such as the home page.

- components 
  - Small parts of the code within the page, which are imported when inserted. An example is the steps section within the homologous search.

- routes
  - Will connect the pages to be rendered, so that they can appear by typing in the url
    E.g.: (base_path) + /olatcg/home
  - Also contains a file that connects frontend elements to the project's API.

- services 
  - Most of the system's texts are in this folder.

The structure of OLATCG was designed so that the code would be clean and reusable within its operation. It is therefore recommended that the developer be guided by the components used on each page and how they work within them.

## Making a modification in the project 🛠

If you want to make any changes to the site, you can't change the main branch directly, so you have to create a branch so that you can then make a pull request.
The initial commands run in the terminal that are essential for creating a new branch are: 

```shell
 git fetch origin
 git checkout + branch_name
```

In this way, you can make changes to the project and then evaluate what has been done in the parallel branch.

In addition, the command lines that are present to send what has been done locally to github are:

```shell
git add . 
git commit -m "message" 
git status 
git push origin branch

```
