const fetch = require("node-fetch");
const fs = require('fs');
const cron = require("node-cron");
const git = require('simple-git');

const Repos = ['repo1','repo2','repo3'];

const BitRepo = 'https://api.bitbucket.org/2.0/repositories/sakthivel434/';

const File = '/src/master/package.json';

const USER = 'sakthi7081';
const PASS = 'sakthi@70';
const REPO = 'git@github.com:sakthi7081/sample-repo.git';


const remote = `https://${USER}:${PASS}@${REPO}`;

let requests = Repos.map(repo => BitRepo +  repo + File);

const getRepo = async (repo) => {
    const result = await fetch(repo);
    const json = await result.json();
    return json.Response;
  };

  const getData = (fileName) => {
    return Promise.all(requests.map(item => getRepo(item))).then(data => {
      let response = {Transaction : true, Response : data};
      fs.writeFile(fileName, JSON.stringify(response,null,2), () => { 
        require('simple-git')()
        .add('./*')
        .commit('Commited JSON file on '+ (new Date()))
        .addRemote('origin', remote)
        .push(['-u', 'origin', 'master'], () => console.log('done'));               
          // git.add('./RepoFile.json').commit('Commited JSON file on '+ (new Date()))
          // .addRemote('origin', remote)
          // .push(['-u', 'origin', 'master'], () => console.log('done'));
    });
  });
  }

  getData('RepoFile.json');

  // var task = cron.schedule("* * * * 6",getData('RepoFile.json'));

  // task.start();

  
 
module.exports = getData;