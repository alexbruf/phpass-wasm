const { hashPassword } = require('../../dist/index.umd');

async function run () {
  console.log('Result: ', await hashPassword('a'));
}

run();
