
fix _ = #(argsMap, _fn) {
  fix args = (#{
    fix args = []
    for(var i in argsMap)
      args.push({name: i, type: argsMap[i]})
    -> args
  })()
  
  -> #{
    var givenArgs = arguments
    if(arguments.length != args.length)
      throw `Wrong arguments count, given %{arguments.length}, require %{args.length}`
    if(
      !(args
        .map(#(arg){ -> arg.type })
        .every(#(type, i){ -> (Object(givenArgs[i]) instanceof type) })
      )
    )
    {
      throw 'Wrong type'
    }
    
    var scope = Object.create(null)
    
    args.forEach(#(arg, i){
      scope[arg.name] = givenArgs[i]
    })
    scope._var = #(name, type) {
      if(type == null)
        type = Object
      if(name in scope)
        ->
      var v
      Object.defineProperty(scope, name, {
        get: #{ -> v },
        set: #(v_){ 
          if(!(Object(v_) instanceof type)) 
            throw `Type error: %name`
          else
            v = v_
        }
      })
    }
    
    -> _fn.apply(@, [scope])
  }
}


// fix _bar = _({a: Number, b: String}, #(scope){ with(scope) {
fix _bar = _({a: Number, b: String}, #(scope){ with(scope) {
  -> a + b
}})

// _log(_bar(1, '2'))

fix _foo = _({}, #(scope){ with(scope) {
  _var('b', Number); b = 1 
  _var('a', String); a = 1 
  // _fix('a', String); a = 1 
}})

_foo()