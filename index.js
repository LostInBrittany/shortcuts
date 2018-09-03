'use_strict';

/**
 *  @LostInBrittany/shorcuts
 * 
 *  A simple JavaScript module (ESM) for handling keyboard shortcuts, either globals or attached to DOM elements"
 *  @license MIT 
 *  @author Horacio Gonzalez <horacio.gonzalez@gmail.com>
 * 
 * Inspired by Shortcuts (https://github.com/rickellis/shortcuts) by
 * 
 */


/**
 * mapping of special keycodes to their corresponding keys
 *
 * everything in this dictionary cannot use keypress events
 * so it has to be here to map to the correct keycodes for
 * keyup/keydown events
 *
 * @type {Object}
 */
let keycodes = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  20: 'capslock',
  27: 'esc',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'ins',
  46: 'del',
  91: 'meta',
  93: 'meta',
  224: 'meta',
  106: '*',
  107: '+',
  109: '-',
  110: '.',
  111 : '/',
  186: ';',
  187: '=',
  188: ',',
  189: '-',
  190: '.',
  191: '/',
  192: '`',
  219: '[',
  220: '\\',
  221: ']',
  222: '\''
}


let shortcuts = {
  eventTracker: {},
  shortcutExists: {},

  add: (shortcut, callback, options) => {

    let eventType = 'keydown';
    let element = document;

    if (typeof options === 'string') {
      eventType = options;
    }

    if (options instanceof Element) {
      element = options;
    }

    if (typeof options == 'object' && options.element) {
      element = options.element;
    }
    
    if (typeof options == 'object' && options.eventType) {
      element = options.eventType;
    }

    // Prevents multiple additions of the same shortcut
    if (shortcuts.shortcutExists[shortcut] === true 
        && shortcuts.shortcutExists[shortcut][eventType] === true) {
      return;
    }

    let keyTracker = (evt) => {
      let event = evt || window.event;
      let keypress = (event.keyCode) ? event.keyCode : event.which;
      let keyvalue = String.fromCharCode(keypress).toLowerCase();
    
      let shortcutFragments = shortcut.split('+');

      let metaPressed = {
        'cmd': event.metaKey,
        'ctrl': event.ctrlKey,
        'shift': event.shiftKey,
        'alt': event.altKey,
      }

      let matches = shortcutFragments
        .filter((fragment) => {
          if (fragment == 'cmd') {
            return metaPressed['cmd'];
          }
          if (fragment == 'ctrl') {
            return metaPressed['ctrl'];
          }
          if (fragment == 'shift') {
            return metaPressed['shift'];
          }
          if (fragment == 'alt') {
            return metaPressed['alt'];
          }
          if (fragment.length > 1 && fragment === keycodes[keypress]) {
            return true;
          }
          return (fragment === keyvalue);
        })
        .length;

      if (matches == shortcutFragments.length) {
        callback();
      }
    };

    // Add the event listener
    element.addEventListener(eventType, keyTracker);

    // Cache the event data so it can be removed later    
    if (!shortcuts.eventTracker[shortcut]) {
      shortcuts.eventTracker[shortcut] = {};
    }
    shortcuts.eventTracker[shortcut][eventType] = { 'element': element, 'callback': keyTracker };

    if (!shortcuts.shortcutExists[shortcut]) {
      shortcuts.shortcutExists[shortcut] = {};
    }
    shortcuts.shortcutExists[shortcut][eventType] = true;
  },

  remove: (shortcut, eventType) => {
    if (!eventType) {
      eventType = 'keydown';
    }
    shortcut = shortcut.toLowerCase();
    if (shortcuts.eventTracker[shortcut] && shortcuts.eventTracker[shortcut][eventType]) {
        let element = shortcuts.eventTracker[shortcut][eventType]['element'];
        let callback = shortcuts.eventTracker[shortcut][eventType]['callback'];

        element.removeEventListener(eventType, callback, false);

        delete (shortcuts.eventTracker[shortcut][eventType]);
        shortcuts.shortcutExists[shortcut][eventType] = false;
    }
  }
}

export { shortcuts };
export default shortcuts;