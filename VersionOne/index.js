// TODO: CHANGE THIS
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesAgainst","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"badVotes","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"},{"name":"rating","type":"uint8"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"},{"name":"rating","type":"uint8"}],"name":"voteAgainstCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// TODO: In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xfbe690c34a64c19d2f90afe35d2786ad6371a01f');
candidates = {"Abortion - 93.0%": "issue-1", "Environment - 40.3%": "issue-2", "Gun Control - 14.9%": "issue-3", "Clean Energy - 78.9%": "issue-4", "Taxes - 14.3%": "issue-5", "Fiscal Policy - 97.1%": "issue-6"}

function voteForCandidate() {
  candidateName = $("#issue").val();
  contractInstance.voteForCandidate(candidateName, 1, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

function voteAgainstCandidate() {
  candidateName = $("#issue").val();
  contractInstance.voteAgainstCandidate(candidateName, 1, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id + "d").html(contractInstance.totalVotesAgainst.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
    
    let val2 = contractInstance.totalVotesAgainst.call(name).toString()
    $("#" + candidates[name] + "d").html(val2);
  }
});