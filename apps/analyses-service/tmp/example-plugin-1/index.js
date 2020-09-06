exports.execute = (pathToRepo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(pathToRepo + " 1");
      resolve(true);
    }, 2000);
  });
};
