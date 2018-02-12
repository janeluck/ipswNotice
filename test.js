/**
 * Created by jane on 12/02/2018.
 */
const semver = require('semver')

console.log(semver.satisfies('10.11.2', '<11'))
console.log(semver.satisfies('9.2.0', '<11'))
console.log(semver.satisfies('8.2', '<11'))