import "./dbdata";
import { open as sqliteOpen } from "sqlite";
import sqlite3 from "sqlite3";
const db = sqliteOpen({ filename: "./guoping.db", driver: sqlite3.Database });


// https://github.com/Microsoft/TypeScript/issues/26019#issuecomment-408520542
type Parameters<T> = T extends (...args: infer T) => any ? T : never;

const sql = async (...args: Parameters<Database["all"]>) =>
db.then(dbo => 
        dbo.all(...args)
        .then(
          result=>{
              console.log("db.all result length = ", result.length);
              return result;
            }
          )
        .catch(err=>{
              console.log("rdb.all errno = ", err.errno);
              console.log("rdb.all error code = ", err.code);
              return {error: true, errno: err.errno, code: err.code};
          })
    );

const insert = async (...args: Parameters<Database["run"]>) =>
db.then(dbo => 
    dbo.run(...args)
      .then(
      result=>{
          console.log("db.run result length = ", result.length);
          return result;
          }
      )
      .catch(err=>{
          console.log("rdb.run errno = ", err.errno);
          console.log("rdb.run error code = ", err.code);
          return {error: true, errno: err.errno, code: err.code};
      })
  );

  export {sql, insert};
  