import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {ImageUser, ToDoItem} from '../models';
import {Image} from 'react-native';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'water-tracking.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase, tableName: string) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const deleteTable = async (db: SQLiteDatabase, tableName: string) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
export const saveImageUser = async (
  db: SQLiteDatabase,
  imageUser: ImageUser,
  tableName: string,
) => {
  try {
    const imagePath = Image.resolveAssetSource(imageUser.image).uri;
    const insertQuery = `INSERT OR REPLACE INTO ${tableName}(rowid, value) values (?,?)`;
    return db.executeSql(insertQuery, [imageUser.id, imagePath]);
  } catch (e) {
    console.error(e);
  }
};
export const getImageUser = async (
  db: SQLiteDatabase,
  tableName: string,
): Promise<ImageUser> => {
  try {
    let imageUser: ImageUser = {};
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    if (results[0].rows.length > 0) {
      const row = results[0].rows.item(0);
      imageUser.image = {uri: row.value};
      imageUser.id = row.id;
    }
    return imageUser;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get image !!!');
  }
};

export const deleteImageUser = async (
    db: SQLiteDatabase,
    id: number,
    tableName: string,
) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};
