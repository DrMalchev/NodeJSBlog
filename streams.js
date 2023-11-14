const fs = require('fs')

const readStream = fs.createReadStream('./docs/big.txt', { encoding: 'utf-8' })
const writeStream = fs.createWriteStream('./docs/write.txt')

// readStream.on('data', (chunk) => {
//     console.log('--------NEW CHUNK----------')
//     console.log(chunk)
//     writeStream.write("-------NEW CHUNK WRITTEN--------");
//     writeStream.write(chunk);
// })

readStream.pipe(writeStream);