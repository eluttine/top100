migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("up6zd1nxj50l0x3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ts7jmb4j",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("up6zd1nxj50l0x3")

  // remove
  collection.schema.removeField("ts7jmb4j")

  return dao.saveCollection(collection)
})
