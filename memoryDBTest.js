
const a = new (require('pouchdb')
    .plugin(require('pouchdb-find'))
    .plugin(require('pouchdb-validation'))
    .plugin(require('pouchdb-adapter-memory'))
)('test', {adapter: 'memory'})

//a.installValidationMethods()

a.put({_id: 'a'})
.then((r) => console.log('p', r))
.catch((e) => console.error(e))

a.find({selector: {_id: 'a'}})
.then((r) => console.log('f', r))
.catch((e) => console.error(e))
