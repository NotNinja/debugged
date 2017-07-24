/*
 * Copyright (C) 2017 Alasdair Mercer, !ninja
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

const debug = require('debug');

const _debug = Symbol('debug');
const _instances = Symbol('instances');
const _reload = Symbol('reload');
const _reloadAll = Symbol('reloadAll');

class Debugged {

  static coerce(value) {
    return debug.coerce(value);
  }

  static create(namespace) {
    let instance = Debugged[_instances].get(namespace);
    if (!instance) {
      instance = new Debugged(namespace);

      Debugged[_instances].set(namespace, instance);
    }

    return instance;
  }

  static disable() {
    debug.disable();

    Debugged[_reloadAll]();
  }

  static enable(namespaces) {
    debug.enable(namespaces);

    Debugged[_reloadAll]();
  }

  static enabled(name) {
    return debug.enabled(name);
  }

  static formatArgs(args) {
    debug.formatArgs(args);
  }

  static humanize(value, options) {
    return debug.humanize(value, options);
  }

  static load() {
    return debug.load();
  }

  static save(namespaces) {
    debug.save(namespaces);
  }

  static useColors() {
    return debug.useColors();
  }

  static [_reloadAll]() {
    for (const instance of Debugged[_instances].values()) {
      instance[_reload]();
    }
  }

  static get colors() {
    return debug.colors;
  }

  static get formatters() {
    return debug.formatters;
  }

  static get names() {
    return debug.names;
  }

  static get skips() {
    return debug.skips;
  }

  constructor(namespace) {
    this[_debug] = debug(namespace);
  }

  log() {
    return this[_debug].apply(this[_debug], arguments);
  }

  [_reload]() {
    this[_debug] = debug(this[_debug].namespace);
  }

  get color() {
    return this[_debug].color;
  }

  set color(value) {
    this[_debug].color = value;
  }

  get enabled() {
    return this[_debug].enabled;
  }

  set enabled(value) {
    this[_debug].enabled = value;
  }

  get namespace() {
    return this[_debug].namespace;
  }

  get useColors() {
    return this[_debug].useColors;
  }

  set useColors(value) {
    this[_debug].useColors = value;
  }

}

if (typeof debug.init === 'function') {
  Debugged.init = function(instance) {
    if (instance instanceof Debugged) {
      debug.init(instance[_debug]);
    } else {
      debug.init(instance);
    }
  };
}

if (typeof debug.log === 'function') {
  Debugged.log = function() {
    return debug.log.apply(debug, arguments);
  };
}

if (debug.inspectOpts) {
  Object.defineProperty(Debugged, 'inspectOpts', {
    enumerable: true,
    get() {
      return debug.inspectOpts;
    }
  });
  Object.defineProperty(Debugged.prototype, 'inspectOpts', {
    enumerable: true,
    get() {
      return this[_debug].inspectOpts;
    }
  });
}

if (debug.storage) {
  Object.defineProperty(Debugged, 'storage', {
    enumerable: true,
    get: () => debug.storage
  });
}

Debugged[_instances] = new Map();

module.exports = Debugged;
