/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var absf = require( '@stdlib/math-base-special-absf' );
var uniform = require( '@stdlib/random-base-uniform' ).factory;
var Float32Array = require( '@stdlib/array-float32' );
var Uint8Array = require( '@stdlib/array-uint8' );
var tryRequire = require( '@stdlib/utils-try-require' );


// VARIABLES //

var smskabs = tryRequire( resolve( __dirname, './../lib/smskabs.native.js' ) );
var opts = {
	'skip': ( smskabs instanceof Error )
};
var rand = uniform( -100.0, 100.0 );


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof smskabs, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function has an arity of 7', opts, function test( t ) {
	t.strictEqual( smskabs.length, 7, 'arity of 7' );
	t.end();
});

tape( 'the function computes the absolute value for each element according to a mask array', opts, function test( t ) {
	var expected;
	var x;
	var m;
	var y;
	var i;

	x = new Float32Array( 10 );
	m = new Uint8Array( x.length );
	y = new Float32Array( x.length );

	expected = new Float32Array( x.length );
	for ( i = 0; i < x.length; i++ ) {
		x[ i ] = rand();
		if ( rand() < 0.8 ) {
			expected[ i ] = absf( x[ i ] );
		} else {
			m[ i ] = 1;
			expected[ i ] = y[ i ];
		}
	}

	smskabs( x.length, x, 1, m, 1, y, 1 );

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function supports an `x` stride', opts, function test( t ) {
	var expected;
	var x;
	var m;
	var y;
	var N;

	x = new Float32Array([
		rand(), // 0
		rand(),
		rand(), // 1
		rand(),
		rand()  // 2
	]);
	m = new Uint8Array([
		0, // 0
		1, // 1
		0, // 2
		0,
		0
	]);
	y = new Float32Array([
		0.0, // 0
		0.0, // 1
		0.0, // 2
		0.0,
		0.0
	]);
	N = 3;

	smskabs( N, x, 2, m, 2, y, 1 );

	expected = new Float32Array([
		absf( x[ 0 ] ),
		y[ 1 ],
		absf( x[ 4 ] ),
		0.0,
		0.0
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function supports a mask stride', opts, function test( t ) {
	var expected;
	var x;
	var m;
	var y;
	var N;

	x = new Float32Array([
		rand(), // 0
		rand(), // 1
		rand(), // 2
		rand(),
		rand()
	]);
	m = new Uint8Array([
		0, // 0
		0,
		1, // 1
		0,
		0  // 2
	]);
	y = new Float32Array([
		0.0, // 0
		0.0, // 1
		0.0, // 2
		0.0,
		0.0
	]);
	N = 3;

	smskabs( N, x, 1, m, 2, y, 1 );

	expected = new Float32Array([
		absf( x[ 0 ] ),
		y[ 1 ],
		absf( x[ 2 ] ),
		0.0,
		0.0
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function supports a `y` stride', opts, function test( t ) {
	var expected;
	var x;
	var m;
	var y;
	var N;

	x = new Float32Array([
		rand(), // 0
		rand(), // 1
		rand(), // 2
		rand(),
		rand()
	]);
	m = new Uint8Array([
		0, // 0
		1, // 1
		0, // 2
		0,
		0
	]);
	y = new Float32Array([
		0.0, // 0
		0.0,
		0.0, // 1
		0.0,
		0.0  // 2
	]);
	N = 3;

	smskabs( N, x, 1, m, 1, y, 2 );

	expected = new Float32Array([
		absf( x[ 0 ] ),
		0.0,
		y[ 2 ],
		0.0,
		absf( x[ 2 ] )
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function returns a reference to the destination array', opts, function test( t ) {
	var out;
	var x;
	var m;
	var y;

	x = new Float32Array( 5 );
	m = new Uint8Array( x.length );
	y = new Float32Array( x.length );

	out = smskabs( x.length, x, 1, m, 1, y, 1 );

	t.strictEqual( out, y, 'same reference' );
	t.end();
});

tape( 'if provided an `N` parameter less than or equal to `0`, the function returns `y` unchanged', opts, function test( t ) {
	var expected;
	var x;
	var m;
	var y;

	x = new Float32Array( [ rand(), rand(), rand(), rand(), rand() ] );
	m = new Uint8Array( x.length );
	y = new Float32Array( [ 0.0, 0.0, 0.0, 0.0, 0.0 ] );

	expected = new Float32Array( [ 0.0, 0.0, 0.0, 0.0, 0.0 ] );

	smskabs( -1, x, 1, m, 1, y, 1 );
	t.deepEqual( y, expected, 'returns `y` unchanged' );

	smskabs( 0, x, 1, m, 1, y, 1 );
	t.deepEqual( y, expected, 'returns `y` unchanged' );

	t.end();
});

tape( 'the function supports negative strides', opts, function test( t ) {
	var expected;
	var x;
	var m;
	var y;
	var N;

	x = new Float32Array([
		rand(), // 2
		rand(),
		rand(), // 1
		rand(),
		rand()  // 0
	]);
	m = new Uint8Array([
		0, // 2
		0,
		1, // 1
		0,
		0  // 0
	]);
	y = new Float32Array([
		0.0, // 2
		0.0, // 1
		0.0, // 0
		0.0,
		0.0
	]);
	N = 3;

	smskabs( N, x, -2, m, -2, y, -1 );

	expected = new Float32Array([
		absf( x[ 0 ] ),
		y[ 1 ],
		absf( x[ 4 ] ),
		0.0,
		0.0
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function supports complex access patterns', opts, function test( t ) {
	var expected;
	var x;
	var m;
	var y;
	var N;

	x = new Float32Array([
		rand(), // 0
		rand(),
		rand(), // 1
		rand(),
		rand(), // 2
		rand()
	]);
	m = new Uint8Array([
		0, // 0
		1, // 1
		0, // 2
		0,
		0,
		0
	]);
	y = new Float32Array([
		0.0,  // 2
		0.0,  // 1
		0.0,  // 0
		0.0,
		0.0,
		0.0
	]);
	N = 3;

	smskabs( N, x, 2, m, 1, y, -1 );

	expected = new Float32Array([
		absf( x[ 4 ] ),
		y[ 1 ],
		absf( x[ 0 ] ),
		0.0,
		0.0,
		0.0
	]);

	t.deepEqual( y, expected, 'deep equal' );
	t.end();
});

tape( 'the function supports view offsets', opts, function test( t ) {
	var expected;
	var x0;
	var m0;
	var y0;
	var x1;
	var m1;
	var y1;
	var N;

	// Initial arrays...
	x0 = new Float32Array([
		rand(),
		rand(), // 2
		rand(),
		rand(), // 1
		rand(),
		rand()  // 0
	]);
	m0 = new Uint8Array([
		0,
		0, // 2
		1, // 1
		0, // 0
		0,
		0
	]);
	y0 = new Float32Array([
		0.0,
		0.0,
		0.0,
		0.0, // 0
		0.0, // 1
		0.0  // 2
	]);

	// Create offset views...
	x1 = new Float32Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 ); // begin at 2nd element
	m1 = new Uint8Array( m0.buffer, m0.BYTES_PER_ELEMENT*1 ); // begin at 2nd element
	y1 = new Float32Array( y0.buffer, y0.BYTES_PER_ELEMENT*3 ); // begin at the 4th element

	N = 3;

	smskabs( N, x1, -2, m1, -1, y1, 1 );
	expected = new Float32Array([
		0.0,
		0.0,
		0.0,
		absf( x0[ 5 ] ),
		y0[ 4 ],
		absf( x0[ 1 ] )
	]);

	t.deepEqual( y0, expected, 'deep equal' );
	t.end();
});
