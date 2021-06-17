var MagicString = require( 'magic-string' );

const s = new MagicString('export var answer = 42;')

console.log('s',s.snip(7).toString())

var bundle = new MagicString.Bundle();
 
bundle.addSource({
  filename: 'foo.js',
  content: new MagicString( 'var answer = 42;' )
});
 
bundle.addSource({
  filename: 'bar.js',
  content: new MagicString( 'console.log( answer )' )
});

// options are as per `s.generateMap()` above
var map = bundle.generateMap({
  file: 'bundle.js',
  includeContent: true,
  hires: true
});

console.log('map',map)