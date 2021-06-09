var MagicString = require( 'magic-string' );
var s = new MagicString( 'problems = 99' );

s.overwrite( 0, 8, 'answer' );
console.log(s.toString())
 // 'answer = 99'

s.overwrite( 11, 13, '42' ); // character indices always refer to the original string
s.toString(); // 'answer = 42'

s.prepend( 'var ' ).append( ';' ); // most methods are chainable
s.toString(); // 'var answer = 42;'

var map = s.generateMap({
  source: 'source.js',
  file: 'converted.js.map',
  includeContent: true
}); // generates a v3 sourcemap

console.log('s:', s.toString())
console.log('map:', map.toString())
// require( 'fs' ).writeFile( 'converted.js', s.toString() );
// require( 'fs' ).writeFile( 'converted.js.map', map.toString() );


s = new MagicString('export var name = "然叔"')
// 截取
console.log(s.snip(0,6).toString())

// 删除
console.log(s.remove(0,7).toString())


let bundleString = new MagicString.Bundle()
bundleString.addSource({
  content: 'var a = 1;',
  separator:'\n'
})

bundleString.addSource({
  content: 'var b = 2;',
  separator:'\n'
})

console.log(bundleString.toString())