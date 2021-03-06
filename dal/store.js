import app from '../app';
import {MongoClient} from 'mongodb';

export function connect({
  host = 'localhost',
  port = 27017,
  database = app.get('DB')
} = {}) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(`mongodb://${host}:${port}/${database}`, 
    (err, db) => {
      err ? reject(err) : resolve(db);
    });
  });
}

export function checkIndices() {
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.collection('rangers')
        .ensureIndex('name', {unique: true}, (err, name) => {
          if (err) return reject(err);
        });
      db.collection('wombats')
        .ensureIndex('name', {unique: true}, (err, name) => {
          if (err) return reject(err);
        });
      resolve();
    })
    .catch(reject);
  });
}

export function getDocuments(collection) {
  return new Promise((resolve, reject) => {
    let documents = [];
    connect().then(db => db.collection(collection).find())
      .then(cursor => {
        cursor.each((err, doc) => {
          if (err) return reject(Error(err));
          doc ? documents.push(doc) : resolve(documents);
        });
      });
  });
}

export function getDocument(name, collection) {
  return new Promise((resolve, reject) => {
    connect().then(db => db.collection(collection)
      .findOne({ name: name.toLowerCase() }, (err, doc) => {
        if (err) return reject(err);
        resolve(doc);
      })
    );
  });
}

export function createDocument(doc, collection) {
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.collection(collection).count().then(count => {
        if (count >= app.get(collection.toUpperCase())) {
          return reject("Max limit reached.");
        } 
        db.collection(collection).insertOne(doc, (err, result) => {
          if (err) return reject(err);
          resolve(doc);
        });
      });
    });
  });
}

export function updateDocument(doc, collection) {
  return new Promise((resolve, reject) => {
    connect()
      .then(db => db.collection(collection).update({ _id: doc._id }, doc)) 
      .then(resolve, reject);
  });
}

export function removeDocument(name, collection) {
  return new Promise((resolve, reject) => {
    connect().then(db => db.collection(collection)
      .remove({ name: name.toLowerCase() }, { justOne: true }, (err, doc) => {
        if (err) return reject(err);
        resolve(doc);
      })
    );
  });
}

