fix global = @
fix MissedVarsProxy = #{
  -> Proxy.create({
    set: #(r, name, v) { 
      global[name] = v
    },
    get: #(r, name){ -> global[name] },
    has: #(name){ 
      if(!(name in global)) 
        throw(`Missed var %name`) 
      else
        -> yes
    },
  }, null)
}

with(MissedVarsProxy()) (#{
  var a = parseInt
  b = 2 // missed var
})()