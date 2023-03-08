const pessoa = (function () {
  const nome = Symbol('nome');
  const idade = Symbol('idade');

  return {
    [nome]: 'Moisés',
    [idade]: 26,
    setNome: function (n) {
      this[nome] = n;
    },
    setIdade: function (i) {
      this[idade] = i;
    },
    getNome: function () {
      return this[nome];
    },
    getIdade: function () {
      return this[idade];
    }
  };
})();
console.log(pessoa.getNome());
pessoa.setNome('João');
pessoa.setIdade(25);
console.log(pessoa.getNome()); // João
console.log(pessoa.getIdade()); // 25
console.log(pessoa.nome);


const secretKeys = [Symbol('secret')];

const OBJ = {
  [secretKeys[0]]: 123
};

const handler = {
  get: function (target, key) {
    const S = secretKeys.find((v) => v.toString() === Symbol(key).toString());
    return target[S] || undefined;
  },
  set: function (target, key, value) {
    try{
      const S = secretKeys.find((v) => v.toString() === Symbol(key).toString());
      if (!target[S]) { 
        throw new Error(`SET - Não existe essa key:${key} no objeto.`); 
      }
      target[S] = value;
    }catch(error){
      console.error(error);
    }finally{
      return true;
    }
  },
  ownKeys: function (target, key) {
    return Object.keys(target);
  },
};

const proxy = new Proxy(OBJ, handler);

console.log(proxy.secret);
proxy.secret = 'hi';
console.log(proxy.secret);
console.log(OBJ, proxy);
