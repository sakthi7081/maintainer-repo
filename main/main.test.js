const getData = require('./index');

const fetch = require('node-fetch');

jest.mock('node-fetch');

describe('Test the Repo update functionality',()=>{
    
    it('Should return the result as true',async ()=>{          
        fetch.mockResolvedValue({ json: () => ({ content: 'eyJUcmFuc2FjdGlvbiIgOiB0cnVlLCJSZXNwb25zZSIgOiBbInNhbXBsZSIsInNhbXBsZSIsInNhbXBsZSJdfQ==',Response: 'sample' }) });                                                         
        let response = await getData();
        expect(response).toBe(false);                             
    });

    it('Should return the result as false',async ()=>{          
        fetch.mockResolvedValue({ json: () => ({ content: 'eyJUcmFuc2FjdGlvbiIgOiB0cnVlLCJSZXNwb25zZSIgOiBbInNhbXBsZSIsInNhbXBsZSIsInNhbXBsZSJdfQ==',Response: 'sample1' }) });                                                         
        let response = await getData();
        expect(response).toBe(true);                             
    });
      
});
        