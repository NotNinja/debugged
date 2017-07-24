    8888888b.           888                                               888
    888  "Y88b          888                                               888
    888    888          888                                               888
    888    888  .d88b.  88888b.  888  888  .d88b.   .d88b.   .d88b.   .d88888
    888    888 d8P  Y8b 888 "88b 888  888 d88P"88b d88P"88b d8P  Y8b d88" 888
    888    888 88888888 888  888 888  888 888  888 888  888 88888888 888  888
    888  .d88P Y8b.     888 d88P Y88b 888 Y88b 888 Y88b 888 Y8b.     Y88b 888
    8888888P"   "Y8888  88888P"   "Y88888  "Y88888  "Y88888  "Y8888   "Y88888
                                               888      888
                                          Y8b d88P Y8b d88P
                                           "Y88P"   "Y88P"

[Debugged](https://github.com/NotNinja/debugged) is a lightweight wrapper for the
[debug](https://www.npmjs.com/package/debug) module.

[![Build Status](https://img.shields.io/travis/NotNinja/debugged/develop.svg?style=flat-square)](https://travis-ci.org/NotNinja/debugged)
[![Peer Dependency Status](https://img.shields.io/david/peer/NotNinja/debugged.svg?style=flat-square)](https://david-dm.org/NotNinja/debugged?type=peer)
[![Dev Dependency Status](https://img.shields.io/david/dev/NotNinja/debugged.svg?style=flat-square)](https://david-dm.org/NotNinja/debugged?type=dev)
[![License](https://img.shields.io/npm/l/debugged.svg?style=flat-square)](https://github.com/NotNinja/debugged/blob/master/LICENSE.md)
[![Release](https://img.shields.io/npm/v/debugged.svg?style=flat-square)](https://www.npmjs.com/package/debugged)

* [Install](#install)
* [API](#api)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using `npm`:

``` bash
$ npm install --save debugged
```

You'll need to have at least [Node.js](https://nodejs.org) 4 or newer and `debug@^2` is required as a peer dependency.

## API

The API is really just a wrapper around the [debug](https://www.npmjs.com/package/debug) module that follows an
Object-oriented Programming (OOP) pattern. The main purpose of it is not really for the API design, but for a shared
bucket of debug instances per namespace whose enabled status is automatically refreshed.

The only real difference is how you create debug instances and how you log messages:

``` javascript
const Debugged = require('debugged');

const debug = Debugged.create('app');
debug === Debugged.create('app');
//=> true
debug === Debugged.create('app:example');
//=> false

debug.log('Started %d', process.uptime());

debug.enabled;
//=> false

Debugged.enable('app');

debug.enabled;
//=> true

Debugged.disable();

debug.enabled;
//=> false
```

## Bugs

If you have any problems with Debugged or would like to see changes currently in development you can do so
[here](https://github.com/NotNinja/debugged/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/NotNinja/debugged/blob/master/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Debugged contributors can be found in
[AUTHORS.md](https://github.com/NotNinja/debugged/blob/master/AUTHORS.md).

## License

See [LICENSE.md](https://github.com/NotNinja/debugged/raw/master/LICENSE.md) for more information on our MIT license.

[![Copyright !ninja](https://cdn.rawgit.com/NotNinja/branding/master/assets/copyright/base/not-ninja-copyright-186x25.png)](https://not.ninja)
