import { createApi } from 'unsplash-js';
import * as nodeFetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const accessKey = "G5-jFtX59X7U7epZu2mPrKblFXdw0hTLGbnkzG8EaiM"; // LdO6CwoeEzn4Ms3qhRLjk5LaiSPC3xdNYeZV1lfnAVE

const api = createApi( {
    accessKey: accessKey,
    fetch: nodeFetch.default,
} );

const downloadFromUrl = async ( id, fileUrl, downloadFolder ) => {
    try {
	const response = await axios( {
	    method: 'get',
	    url: fileUrl,
	    responseType: 'stream',
	} );

	const extension = response[ 'headers' ][ 'content-type' ].split( '/' ).pop();

	const filename = id;
	const filepath = path.resolve( __dirname, downloadFolder, filename + '.' + extension );
		
	response.data.pipe( fs.createWriteStream( filepath ) );
    } catch ( err ) {
	throw new Error( err );
    }
}

const getUrl = async ( fileUrl ) => {
    const filename = path.basename( path.basename ( path.dirname( fileUrl ) ) );
    const filepath = path.resolve( __dirname, 'api', filename );
    
    try {
	const response = await axios( {
	    method: 'get',
	    url: fileUrl,
	    responseType: 'stream',
	    headers: {
		Authorization: "Client-ID " + accessKey
	    }
	} );

	let stream = fs.createWriteStream( filepath , {
	    flags: 'w'
	} );

	const w = response.data.pipe( stream );
	// stream.end();

    	// w.on( 'finish',  () => {
    	//     const url = JSON.parse( fs.readFileSync( filepath, 'utf8' ) )[ 'url' ];
    	//     downloadFromUrl( url, subject );
    	// } );
	// console.log( url );
	// w.then( ( response, reject ) => {
	//     console.log( response );
	// } );
	// stream.end();
	// await w;
	
	// console.log( w );
	return [ w, filepath ];
    } catch ( err ) {
	// console.log( err );
	// console.log( err[ 'response' ] );
	throw new Error( err );
    }
}

const getRandomPhoto = ( subject, no_images ) => {
    // create folder subject
    const folderpath = path.join( __dirname, 'images', subject );

    fs.exists( folderpath, exists => {
    	if ( !exists ) fs.mkdirSync( folderpath );
    } );

    // download photos
    api.photos.getRandom( {
        // collectionIds: ['abc123'],
        // topicIds: ['def456'],
        // featured: true,
        // username: 'naoufal',
        query: subject,
        count: no_images,
    } ).then( ( res, rej ) => {
    	res[ 'response' ].forEach( resp => {
	    // save photo info
	    const id = resp[ 'id' ];
	    fs.writeFileSync( path.join( folderpath, id + '.json' ), JSON.stringify( resp, null, 2 ) );
	    
    	    getUrl( resp[ 'links' ][ 'download_location' ] ).then( ( res, rej ) => {
    	    	const w = res[0];
    	    	const filepath = res[1];

    	    	w.on( 'finish',  () => {
    	    	    const url = JSON.parse( fs.readFileSync( filepath, 'utf8' ) )[ 'url' ];
    	    	    downloadFromUrl( id, url, path.join( 'images', subject ) );
    	    	} );
    	    } );
    	} );
    } ).catch( err => {
	console.log( err );
	throw new Error( err );
    } );
}

getRandomPhoto( 'data science', 9 );




// // const axios = require('axios');
// // declare global {
// //     var fetch: typeof nodeFetch.default;
// //     type RequestInit = nodeFetch.RequestInit;
// //     type Response = nodeFetch.Response;
// // }
// // global.fetch = nodeFetch.default;


// // const http = require('http');

// // const hostname = '127.0.0.1';
// // const port = 3000;

// // const server = http.createServer((req, res) => {
// //     res.statusCode = 200;
// //     res.setHeader('Content-Type', 'text/plain');
// //     res.end('hola mundo');
// // });

// api.photos.get( { photoId: 'mtNweauBsMQ' } )
//     .then( ( resp, reject ) => {
// 	return resp[ 'response' ];
//     } ).then( response => {
// 	return response[ 'links' ];
//     } ).then( links => {
// 	return links[ 'download_location' ];
//     } ).then( link => {//	const a = .then( ) console.log(  );
// 	getUrl( link, 'downloads' ).then( (res, rej) => {
// 	    const w = res[0];
// 	    const filepath = res[1];

// 	    w.on( 'finish',  () => {
// 		const url = JSON.parse( fs.readFileSync( filepath, 'utf8' ) )[ 'url' ];
// 		downloadFromUrl(url, 'downloads' );
// 	    } );	
	    

// 	} ); 
	
// 	// a.then( ( resp ) => {
// 	//     console.log( resp );
// 	// } );
// 	// a.then( ( resp ) => console.log( resp.data ) )
// 	// console.log( a );
// 	// a.on( 'finish', () => {
	    
// 	} );
// 	// console.log( a );
// 	// } );


// 	// then( ( resp ) => {
// 	//     console.log( resp );
// 	// } );
// 	// console.log( url );
// 	// console.log( filepath );
// 	// const filename = path.basename( link );
// 	// const filepath = path.resolve( __dirname, 'downloads', filename );
	
// 	// axios.get( link, {
// 	//     headers: {
// 	// 	Authorization: "Client-ID LdO6CwoeEzn4Ms3qhRLjk5LaiSPC3xdNYeZV1lfnAVE",
// 	// 	responseType: 'stream'
// 	//     }
// 	// } )
// 	//     .then( ( response ) => {
// 	// 	// console.log( 'holi' );
// 	// 	const w = response.data.pipe( fs.createWriteStream( filepath ) );
// 	//     } );
// // } );



// // api.search.getCollections({ query: 'cat', page: 1, perPage: 10 })
// //     .then( (resolve, reject) => {
// // 	return resolve[ 'response' ];
// //     } ).then( (resolve, reject ) => {
// // 	resolve[ 'results' ].forEach( image => {
// // 	    console.log( image[ 'links' ][ 'self' ] );
// // 	} );
// //     } );

// // server.listen(port, hostname, () => {
// //     console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
// // })
