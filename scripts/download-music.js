#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create public/music directory if it doesn't exist
const musicDir = path.join(__dirname, '..', 'public', 'music');

if (!fs.existsSync(musicDir)) {
  fs.mkdirSync(musicDir, { recursive: true });
  console.log('Created directory:', musicDir);
}

// URL mappings
const tracks = [
  {
    name: 'Berubah',
    url: 'https://cdn-spotify.zm.io.vn/download/4qRYdvt8ldAQAPUJwkt7La/QMDA72560815?name=Berubah&artist=Tenxi',
    filename: 'berubah.mp3'
  },
  {
    name: 'Bintang 5',
    url: 'https://cdn-spotify.zm.io.vn/download/0HoWTALX2BktSIrSmflWSP/QMDA72560810?name=Bintang%205&artist=Tenxi',
    filename: 'bintang5.mp3'
  },
  {
    name: 'SO ASU',
    url: 'https://cdn-spotify.zm.io.vn/download/56TRhAB4SqpRn5NdqHSAFy/QMFMF2504729?name=SO%20ASU&artist=Naykilla',
    filename: 'soasu.mp3'
  }
];

// Function to download a file
function downloadFile(url, filePath, trackName) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${trackName}...`);
    
    const fileStream = fs.createWriteStream(filePath);
    
    // Choose the right protocol
    const client = url.startsWith('https:') ? https : http;
    
    const request = client.get(url, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Following redirect for ${trackName}...`);
        return downloadFile(response.headers.location, filePath, trackName)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${trackName}: HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ Downloaded ${trackName} to ${filePath}`);
        resolve();
      });
    });
    
    request.on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete partial file
      reject(new Error(`Failed to download ${trackName}: ${err.message}`));
    });
    
    fileStream.on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete partial file
      reject(new Error(`Failed to write ${trackName}: ${err.message}`));
    });
  });
}

// Main function to download all tracks
async function downloadAllTracks() {
  console.log('Starting music download process...\n');
  
  try {
    for (const track of tracks) {
      const filePath = path.join(musicDir, track.filename);
      
      // Skip if file already exists
      if (fs.existsSync(filePath)) {
        console.log(`⚠ ${track.name} already exists, skipping...`);
        continue;
      }
      
      await downloadFile(track.url, filePath, track.name);
      
      // Add a small delay between downloads to be respectful
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n✅ All music downloads completed successfully!');
    console.log(`Files are located in: ${musicDir}`);
    
  } catch (error) {
    console.error('\n❌ Download failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  downloadAllTracks();
}

module.exports = { downloadAllTracks };