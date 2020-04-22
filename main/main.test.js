const getData = require('./index');

const fs = jest.genMockFromModule("fs");


describe('Test the Repo write functionality',()=>{
    
    it('Should write the file in the repo',async ()=>{
        const logSpy = jest.spyOn(console, 'log');        
        fetch = jest.fn().mockResolvedValue({
            json: () => data
        });    
        jest.spyOn(fs, 'writeFile').mockImplementation((path, options, callback) => {
                console.log('Repo data saved!');
        });
        await getData();  
        expect(logSpy).toBeCalledWith('Repo data saved!');        
    });

});
        