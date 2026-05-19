const fs = require('fs');
const path = require('path');

const imgPath = path.join(__dirname, '..', 'public', 'image.png');

if (fs.existsSync(imgPath)) {
  const buffer = fs.readFileSync(imgPath);
  // PNG header check
  if (buffer.toString('ascii', 1, 4) === 'PNG') {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    console.log(`PNG Dimensions: ${width}x${height}`);
  } else {
    console.log('Not a standard PNG file');
  }
} else {
  console.log('Image not found');
}
