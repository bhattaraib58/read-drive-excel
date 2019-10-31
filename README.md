# READ GOOGLE DRIVE EXCEL

Nodejs, Express server which serves API after reading the excel file from Google Drive


# USAGE
If link is 
``https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit``  
  
where fileID is :  
1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms  

so request link is:
https://read-drive-excel.herokuapp.com/api/excel/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms


**Note: This API can only read publicly shared excel file.**

If you want to read private excel file and get api, share file with this email:

**google-spreadsheets@intern-report.iam.gserviceaccount.com**

# USAGE LINK
For Local:  
``127.0.0.1/api/excel/fileID``

OR

For Live  
``https://read-drive-excel.herokuapp.com/api/excel/fileID``



## Google's API Limitations
Google's API is somewhat limiting. Calls are made to two differently designed APIs, one made to deal with cells, and one to deal with rows. These APIs will let you manage the data in your sheets, but you cannot make any modifications to the formatting of the cells.

**Row-Based API Limitations**
The row-based API assumes that the "header row" (first row) of your sheet is set. They have limitations on the column names they will accept - all lowercase with no symbols or spaces. If the values in your sheet do not follow their rules, their API will adapt the key it actually returns to you. I recommend just following their rules to avoid confusion.

You can set a formula value into a cell using the row-based API, but when reading rows, you cannot access the formula, or even be aware that there is one in the cell. Any cells with formulas will return the calculated value of the formula. If you try to update a row, the cell with a formula will be overwritten to its calculated value.

***IMPORTANT The row-based API also assumes there are no empty rows in your sheet. If any row is completely empty, you will not be able to access any rows after the empty row using the row-based API.***



---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone git@github.com:bhattaraib58/read-drive-excel.git
    $ cd read-drive-excel
    $ yarn install

## Running the project

    $ yarn start
	OR
    $ npm start

## Simple build for production

    $ yarn build
	OR
    $ npm run-script build


## Running the Development

    $ yarn start:dev
	OR
    $ npm run-script start:dev

## Simple build for Development

    $ yarn build:dev
	OR
    $ npm run-script build:dev

