'use strict';
/**
 * Created by nafSadh on 13-Apr-17.
 */

module.exports = function arrayToMap(array, keyField) {
  let map = {};
  for (let i in array) {
    let val = array[i];
    let key = array[i][keyField];
    map[key] = val;
  }
  return map;
};
