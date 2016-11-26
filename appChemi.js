/*eslint-env node*/

const erisDbFactory = require('eris-db');
const erisContracts = require('eris-contracts');
const solc = require('solc');
const accounts = require("./accounts.js").accounts;
const nodes = require("./ips.js").ips;

var erisdb; /* ErisDB Factory */
var erisdbURL; /* ErisDB RPC URL */
var pipe; /* Pipe for creating contracts */
var contractManager;/* Contract Manager for creating contracts*/
var account = accounts[0].address;
var greeterSource = 'contract greeter { string greeting; function greeter(string _greeting) public { greeting = _greeting; } function greet() constant returns (string) { return greeting; } }'

/*Initialize ERISDB*/
erisdb = erisDbFactory.createInstance(nodes[0]);
erisdb.start(function(error){
    if(!error){
        console.log("Ready to go");
    }
});

pipe = new erisContracts.pipes.DevPipe(erisdb, accounts); /* Create a new pipe*/
contractManager = erisContracts.newContractManager(pipe); /*Create a new contract object using the pipe */

/*Get account list*/
erisdb.accounts().getAccounts((err, res) => { console.log(res.accounts.map(item => {
  return ({
    ADDR: item.address,
    BALANCE: item.balance
  })
})) });

/* Compile the Greeter Contract*/
var compiledContract = solc.compile(greeterSource);
console.log("Compiled Contract:" + compiledContract)
var contractFactory = contractManager.newContractFactory(JSON.parse(compiledContract.contracts.greeter.interface)); //parameter is abi
console.log("Contract Factory:" + contractFactory)

/* Send the contract */
contractFactory.new.apply(contractFactory, ["Hello World",
 {from: account, data:compiledContract.contracts.greeter.bytecode}, (err, contractInstance)=> {
  console.log(contractInstance.address);
  contractInstance["greet"].apply(contractInstance, [(error,result)=> {
     if (error) {
       console.log(error);
     }
    else {
      console.log(result);
    }
  }]);

 }]);







var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
 
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hola Node.js Madrid\n');
}).listen(port, host);
console.log('Server running at http://' + host + ':' + port + '/');