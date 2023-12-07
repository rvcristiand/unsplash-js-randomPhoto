import { createApi } from 'unsplash-js';
import * as nodeFetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// no se publican llaves públicas en repositorios públicos
// todo guardar las llaves en otro archivo y leerles desde allá

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
    	if ( !exists ) {
	    try {
		fs.mkdirSync( folderpath );
	    } catch ( error ) {
		// pass
	    }
	}
    } );

    // download photos
    api.photos.getRandom( {
        // collectionIds: ['abc123'],
        // topicIds: ['def456'],
        // featured: true,
        // username: 'naoufal',
        query: subject,
        count: no_images,
	// lang: 'es',
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

const filepath = path.join( __dirname, 'labels.json' );

const labels = JSON.parse( fs.readFileSync( filepath, 'utf8' ) );

// for ( let i = 0; i < labels[ 'labels'].length; i++ ) {
//     // console.log( labels[ 'labels' ][ i ] );
//     getRandomPhoto( labels[ 'labels' ][ i ], 1 );
//     // break;
// }

getRandomPhoto( 'key data', 10 );

