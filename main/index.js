const fetch = require("node-fetch");
const cron = require("node-cron");

const Repos = ['repo1','repo2','repo3'];

const BitRepo = 'https://api.bitbucket.org/2.0/repositories/sakthivel434/';

const GitRepo = 'https://api.github.com/repos/sakthi7081/maintainer/contents/';

const GitFile = 'src/actions/RepoFolders.json';

const File = '/src/master/package.json';

const Token = 'Bearer e5769c0236044b862cde18cdcbeecdb47fb24fb8';

let requests = Repos.map(repo => BitRepo +  repo + File);

const getURL = async (url) => {
    const result = await fetch(url);
    const json = await result.json();
    return json;
  };

  const getData = () => {    
    return Promise.all(requests.map(item => getURL(item))).then(async data => {      
      let repoDetail = await getURL(GitRepo + GitFile);       
      let repoJson = {Transaction : true, Response : data.map(value => value.Response)};
      let oldData = JSON.parse(new Buffer.from(repoDetail.content, 'base64').toString('ascii'));      
      if(JSON.stringify(repoJson) != JSON.stringify(oldData)){      
        let repoData = new Buffer.from(JSON.stringify(repoJson,null,2)).toString('base64');      
        let body = {
              message : 'update on ' + new Date(),
              content : repoData,
              sha : repoDetail.sha
            };
        fetch(GitRepo + GitFile, {
          method: 'PUT',
          headers: {
            'Authorization': Token,          
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then(response => response.json()).then(res => res);        
        return true
      }
      return false
  });
  }

  getData();

  cron.schedule("* * * * 6",getData);  
  
 
module.exports = getData;