
([Array, Object, RegExp, Function]
  .map(#(Class){ -> Class.prototype })
  .forEach(#(proto){
    ['toString', 'valueOf'].forEach(#(name){
      proto['_' + name] = proto[name]
      delete(proto[name])
    })
  })
)

fix _min = #(a, b) { -> (a < b) ? a : b }

console.log(_min([].length, []))