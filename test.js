/**
 * Created by jane on 12/02/2018.
 */
const semver = require('semver')

function coerce(version) {
    var r = /(?:^|[^\d])(\d{1,16})(?:\.(\d{1,16}))?(?:\.(\d{1,16}))?(?:$|[^\d])/

    if (typeof version !== 'string')
        return null;
    var match = version.match(r);

    if (match == null)
        return null;
    console.log()
    return (match[1] || '0') + '.' + (match[2] || '0') + '.' + (match[3] || '0')
}
