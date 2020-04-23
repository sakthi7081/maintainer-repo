const getData = require('./index');
const fs = require('fs');
jest.mock('fs');

describe('Test the Repo write functionality',()=>{
    
    it('Should write the file in the repo',async ()=>{               
        console.log = jest.fn();        
        fetch = jest.fn().mockResolvedValue({
            json: () => data
        });          
        jest.spyOn(fs, 'writeFile').mockImplementation((path, options, callback) => 
            console.log('Repo data saved!')
        )       
        await getData('somefile');             
        expect(console.log).toHaveBeenCalledWith('Repo data saved!');
    });

});
        