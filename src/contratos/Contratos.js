/*


pragma solidity ^0.4.0;

contract Permission {
    
    mapping (uint => uint[]) public permissionsResources;
    mapping (uint => uint) public numPermissionsPerResource;

    uint numUsers;
    uint numResources;
    
    uint[] users;
    uint[] resources;
    
    // This is the constructor whose code is
    // run only when the contract is created.
    function Permission() {
        delete numUsers;
        delete numResources;
        delete users;
        delete resources;
    }
    
    function createUser(uint user){
        numUsers++;
        users[numUsers] = user;
    }
    
    
    function createResource(uint resource){
        numResources++;
        resources[numResources] = resource;
        numPermissionsPerResource[resource] = 0;
        
    }
    
   
    function addPermission(uint user,uint resource){
        uint[] resourcePermission = permissionsResources[resource];
        uint users = numPermissionsPerResource[resource];
        resourcePermission[users] = user;
        users++;
        numPermissionsPerResource[resource] = users;
    }
    
    //function deletePermission(uint user,uint resource)
    //function deleteUser
    //function deleteResource
    
    

   
}*/

var contratoPermisos = 'contract Permission { mapping (uint => uint[]) public permissionsResources; mapping (uint => uint) public numPermissionsPerResource; uint numUsers; uint numResources; uint[] users; uint[] resources; // This is the constructor whose code is // run only when the contract is created. function Permission() { delete numUsers; delete numResources; delete users; delete resources; } function createUser(uint user){ numUsers++; users[numUsers] = user; } function createResource(uint resource){ numResources++; resources[numResources] = resource; numPermissionsPerResource[resource] = 0; } function addPermission(uint user,uint resource){ uint[] resourcePermission = permissionsResources[resource]; uint users = numPermissionsPerResource[resource]; resourcePermission[users] = user; users++; numPermissionsPerResource[resource] = users; } //function deletePermission(uint user,uint resource) //function deleteUser //function deleteResource }';