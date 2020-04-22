const fetch = require("node-fetch");
const fs = require('fs');

const Repos = ['repo1','repo2','repo3'];

const BitRepo = 'https://api.bitbucket.org/2.0/repositories/sakthivel434/';

const File = '/src/master/package.json';

let requests = Repos.map(repo => BitRepo +  repo + File);

const getRepo = async (repo) => {
    const result = await fetch(repo);
    const json = await result.json();
    return json.Response;
  };

  const getData = async () => {
    return Promise.all(requests.map(item => getRepo(item)))
  }

  getData().then(data => {
      let response = {Transaction : true, Response : data};
      fs.writeFile('RepoFile.json', JSON.stringify(response,null,2), () => {                
        console.log('Repo data saved!');        
    });
});

module.exports = getData;