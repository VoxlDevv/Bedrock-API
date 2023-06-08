let Player = ["Asep", "Bagas", "Malik"]
let playerName = "Malik"
const finds = Player.find((name) => name === playerName)

console.log(finds)

const string = "LL      iii DDDDD     AAA   RRRRRR  \nLL          DD  DD   AAAAA  RR   RR \nLL      iii DD   DD AA   AA RRRRRR  \nLL      iii DD   DD AAAAAAA RR  RR  \nLLLLLLL iii DDDDDD  AA   AA RR   RR \n                                     ";

console.log(string)


let tag = ["tag:one", "two:three", "string:number"];

let fnd = tag.find((plr) => plr.startsWith("tag:"));
console.log(fnd)

console.log("2000".slice(-2))