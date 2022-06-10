function makeAdder(x) {
  var y = 1;
  return function(z) {
    y = 100;
    console.log(x, y, z);
    return x + y + z;
  };
}
var add5 = makeAdder();
var add10 = makeAdder();

console.log(typeof(add5(2)));
console.log(typeof(add10(2)));