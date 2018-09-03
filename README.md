Shortcuts is a simple JavaScript module (ESM) for handling keyboard shortcuts, either globals or attached to DOM elements.

It's licenced under MIT licence.

Shortcuts is a tiny library, less than 200 lines of code, weighting 4 kB before minification. It has support for keypress, keydown, and keyup events on specific keys, keyboard combinations, or key sequences.


## Getting started

1. Install Shortcuts via Npm:

    ```
    npm i @LostInBrittany/shortcuts
    ```

1. Import Shortcuts in your code:

    ```JavaScript
    import shortcuts from '@LostInBrittany/shortcuts';
    ```

1. Add some shortcuts

    ```JavaScript
    // A shortcut bound to document.body on the keydown event    
    shortcuts.add('a', () => console.log('a'));

    // A shortcut bound to an HTML element with id `myTarget` on the keydown event 
    let elem = document.querySelector('#myTarget'); 
    shortcuts.add('b', () => console.log('b'), elem);

    // A shortcut bound to document.body on the keyup event    
    shortcuts.add('c', () => console.log('c'), 'keyup');

    // A shortcut bound to an HTML element with id `myTarget` on the keyup event 
    let elem = document.querySelector('#myTarget'); 
    shortcuts.add('d', () => console.log('d'), {element: elem, eventType: 'keyup'});

    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)
