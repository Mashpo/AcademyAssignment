// Initialisation
const bcrypt = require('bcrypt');

function hash_password(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
};

// Compare passwords
function compare_passwords(password, hashed_password) {
    
   let comparisonResult = bcrypt.compareSync(password, hashed_password);

    return comparisonResult;
};

module.exports = {
    hash_password, compare_passwords
};