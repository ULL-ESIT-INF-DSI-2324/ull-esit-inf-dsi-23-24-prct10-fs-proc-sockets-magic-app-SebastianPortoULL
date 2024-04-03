import net from 'net';
import {watchFile, existsSync} from 'fs';
import {spawn} from 'child_process';

function Usage() : void {
  console.log('Tiene que indicar el modo y el fichero como parámetros de la siguiente forma: ');
  console.log('Usage: node dist/server.js [--lines|--words|--chars] nombre_fichero');
  console.log('--lines: número de líneas\n--words: número de palabras\n--chars: número de caracteres');
  throw Error('Parámetros no válidos.')
}

if (process.argv.length !== 4) {
  Usage();
} else {
  const mode : string = process.argv[2];
  if (mode !== '--lines' && mode !== '--words' && mode !== '--chars') Usage();
  const fileName = process.argv[3];
  if (!existsSync(fileName)) Usage();
  net.createServer((connection) => {
    console.log('A client has connected.');
    connection.write(JSON.stringify({'type': 'watch', 'file': fileName}) +
    '\n');
    watchFile(fileName, (curr, prev) => {
      console.log(`File was ${prev.size} bytes before it was modified.`);
      console.log(`Now file is ${curr.size} bytes.`);
    
      // const cat = spawn('cat', [fileName]);
      // cat.stdout.pipe(process.stdout);
      const wc = spawn('wc', [mode, fileName])
      
      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);

      wc.on('close', () => {
        const wcOutputAsArray = wcOutput.split(/\s+/);
        switch(mode) {
          case '--lines':
            console.log(`File ${fileName} has ${wcOutputAsArray[0]} lines`);
            break;
          case '--words':
            console.log(`File ${fileName} has ${wcOutputAsArray[0]} words`);
            break;
          case '--chars':
            console.log(`File ${fileName} has ${wcOutputAsArray[0]} characters`);
            break;
        }
      });
    });

    connection.on('close', () => {
      console.log('A client has disconnected.');
    });
  }).listen(60300, () => {
    console.log('Waiting for clients to connect.');
  });
}
