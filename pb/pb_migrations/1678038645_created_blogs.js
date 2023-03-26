migrate((db) => {
  const collection = new Collection({
    "id": "up6zd1nxj50l0x3",
    "created": "2023-03-05 17:50:45.369Z",
    "updated": "2023-03-05 17:50:45.369Z",
    "name": "blogs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "g9hvroc9",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 90,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jusruh2k",
        "name": "url",
        "type": "url",
        "required": false,
        "unique": true,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "zatofykz",
        "name": "feed",
        "type": "url",
        "required": false,
        "unique": true,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "zqz9hitn",
        "name": "thumbnail",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif",
            "image/webp"
          ],
          "thumbs": [
            "80x80"
          ]
        }
      },
      {
        "system": false,
        "id": "dypqpm8t",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != \"\" && @request.auth.id = @request.data.user",
    "updateRule": "@request.auth.id = user",
    "deleteRule": "@request.auth.id = user",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("up6zd1nxj50l0x3");

  return dao.deleteCollection(collection);
})
