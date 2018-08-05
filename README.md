# SymbiozUtils
> A minimal utility tool to administrate a Symbioz2.38 server

This tool has been made with Electron and is designed to work best with small databases of a Symbioz server as research features of this tool are somewhat limited and simplistic. I wrote this tool in order to speed up the process of editing entries in the database.


**Please note that I might not maintain this repo and will add features as I need them.**

## Features
* Quick Account creator/editor
* Quick Character editor
* Item FM IDE

*Potentially planned features:*
* Preconfigured FM'd item giver
* Character stats editor

## Install & run
Copy **dbconf.json.dist** into **dbconf.json** and set the proper value for your database and then run:
```
yarn install
yarn start
```

## Work on it
Open **package.json** change debugmode to true to have developer console show up. Use `yarn sass` to recompile/watch scss, `yarn start` to open the app.

 If you wish to contribute to, please check the **CONTRIBUTING.md** file located in the *.github* directory at the root of the repo for more details on how the tool works. Otherwise just fork the repository and have fun!

