module.exports = (base, obj) => {
  for (var key in obj) {
    if (base.prototype.hasOwnProperty(key)) {
      throw new Error(
        "Don't allow override existed prototype method. method: " + key
      );
    }
    base.prototype[key] = obj[key];
  }
};
