const http = require('http');
const fs = require('fs');
let fact=require('./fact.js')
let students = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

const server = http.createServer((req, res) => {
    const pathname = req.url;
    if (pathname==='/'){
        res.write('this is home page')
        res.end()
    }
    // GET all the student details 
    else if (pathname === '/students') {
            res.end(JSON.stringify(students));
    }
    //finding users with particular user ids
    else if (pathname.startsWith('/students/')) {
        const userId = parseInt(pathname.split('/').pop());
        const user = students.find(u => u.id === userId);
        if (user) {
            res.end(JSON.stringify(user));
        } else {
            res.end(JSON.stringify({ error: 'User not found' }));
        }
    }
    else if(pathname==='/index.html'){
        fs.readFile('./index.html',(err,data)=>{
            if(err){
                res.end("Error fetching the file")
            }
            else{
                res.end(data)
            }
        }) 
    } 
    else if(pathname.startsWith('/fact')){
        let n=parseInt(pathname.split('/').pop())
        res.end(JSON.stringify(fact.fact(n)))
    }else {
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
});
server.listen(2000, () => {
    console.log(`Server is listening on port 2000`);
});
