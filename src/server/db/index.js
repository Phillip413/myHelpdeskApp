// file to export all of our database functions that may eventually be spread out across multiple files int he db directory

module.exports = {
  ...require('./users'),
}

// as you add new files with more database functions, we should add them here