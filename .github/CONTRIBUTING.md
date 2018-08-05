# Contributing

You are free to contribute as you want to however, if you wish to make a pull request, I will ask that you try to respect the architecture of the project which is the one below. If you think we can make a better architecture, open an Issue to discuss about it and we can see how we can move to a better architecture. 

```
repo
   \ .github
   |     \ this file 
   |
   \ js
   |     \ javascript files
   |
   \ scss
   |     \ component_folder
   |     |     \ scss files regarding different components who serve roughly the same use
   |     |
   |     \ other general purpose scss files
   |
   \ sql
   |    \ mysql queries to run against the Symbioz Database
   |
   \ templates
   |    \ html files templated using Moustache, its kind of a routing system
   |
   \ tests
   |    \ xml files or other format which are in some cells of the database
   |
   \ other config files & html/js entry points
   
```

Prefered node package manager tool is yarn.

## Contribution ideas
If you truly wish to add something to this quickly made tool but not sure where to start here are some quick things that could get you started:

* Make the route changes more fluid (e.g modify the light green nav path to go back and forth the pages)
* Work on possible planned feature written in the README.md at the root of the repo
* Make the thing prettier (I promise I did my best while designing it but maybe you can come up with something better)
