module.exports = {
  /**
   * Checks if a string is a valid Idx
   * */
  validIdx: function (str) {
    return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str);
  }
};

