const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.STITCH_API_KEY || '';
const PROJECT_ID = 'projects/5634229459885586050';
const OUT_DIR = path.resolve(__dirname);

function mcpCall(name, args) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'stitch.googleapis.com',
      path: '/mcp',
      method: 'POST',
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: { name, arguments: args }
    }));
    req.end();
  });
}

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': API_KEY
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadUrl(res.headers.location, dest).then(resolve).catch(reject);
      }
      let chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(dest, buf);
        resolve(buf);
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('--- Fetching Project Details ---');
  const projRes = await mcpCall('get_project', { name: PROJECT_ID });
  fs.writeFileSync(path.join(OUT_DIR, 'project_details.json'), JSON.stringify(projRes, null, 2));

  console.log('--- Fetching Screens ---');
  const screensRes = await mcpCall('list_screens', { projectId: PROJECT_ID });
  fs.writeFileSync(path.join(OUT_DIR, 'screens_list.json'), JSON.stringify(screensRes, null, 2));

  const textContent = screensRes.result.content[0].text;
  const parsed = JSON.parse(textContent);
  const screens = parsed.screens || [];
  console.log(`Found ${screens.length} screens.`);

  const screensDir = path.join(OUT_DIR, 'screens');
  if (!fs.existsSync(screensDir)) fs.mkdirSync(screensDir, { recursive: true });

  for (let i = 0; i < screens.length; i++) {
    const s = screens[i];
    const safeTitle = (s.title || `screen_${i}`).replace(/[\\/:*?"<>|]/g, '_').slice(0, 80);
    const screenSubDir = path.join(screensDir, `${i + 1}_${safeTitle}`);
    if (!fs.existsSync(screenSubDir)) fs.mkdirSync(screenSubDir, { recursive: true });

    fs.writeFileSync(path.join(screenSubDir, 'meta.json'), JSON.stringify(s, null, 2));

    if (s.htmlCode && s.htmlCode.downloadUrl) {
      console.log(`Downloading HTML [${i + 1}/${screens.length}]: ${s.title}`);
      try {
        const raw = await downloadUrl(s.htmlCode.downloadUrl, path.join(screenSubDir, 'raw_response.json'));
        const jsonContent = JSON.parse(raw.toString('utf8'));
        if (jsonContent.dataString) {
          fs.writeFileSync(path.join(screenSubDir, 'index.html'), jsonContent.dataString);
        }
      } catch (err) {
        console.error(`Failed to download HTML for ${s.title}:`, err.message);
      }
    }

    if (s.screenshot && s.screenshot.downloadUrl) {
      console.log(`Downloading Screenshot [${i + 1}/${screens.length}]: ${s.title}`);
      try {
        await downloadUrl(s.screenshot.downloadUrl, path.join(screenSubDir, 'screenshot.png'));
      } catch (err) {
        console.error(`Failed to download screenshot for ${s.title}:`, err.message);
      }
    }
  }

  console.log('=== All screens and assets downloaded successfully! ===');
}

main().catch(console.error);
