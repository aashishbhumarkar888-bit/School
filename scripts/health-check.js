const https = require('https');

const endpoints = [
  'https://school-sas-tawny.vercel.app/',
  'https://school-sas-tawny.vercel.app/about',
  'https://school-sas-tawny.vercel.app/academics',
  'https://school-sas-tawny.vercel.app/admissions',
  'https://school-sas-tawny.vercel.app/houses',
  'https://school-sas-tawny.vercel.app/campus',
  'https://school-sas-tawny.vercel.app/faculty',
  'https://school-sas-tawny.vercel.app/contact',
  'https://school-sas-tawny.vercel.app/student/login',
  'https://school-sas-tawny.vercel.app/student/dashboard',
  'https://school-sas-tawny.vercel.app/calendar',
  'https://school-sas-tawny.vercel.app/notices',
  'https://school-sas-tawny.vercel.app/news',
  'https://school-sas-tawny.vercel.app/gallery',
  'https://school-sas-tawny.vercel.app/alumni',
  'https://school-sas-tawny.vercel.app/careers',
  'https://school-sas-tawny.vercel.app/api/enquiries',
  'https://school-sas-tawny.vercel.app/api/contact',
  'https://school-sas-tawny.vercel.app/images/official/seal-crest.png',
  'https://school-sas-tawny.vercel.app/images/official/school-wordmark-blue.png',
  'https://school-sas-tawny.vercel.app/images/official/official-user-logo-transparent.png'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    https.get(url, { headers: { 'User-Agent': 'HealthCheckBot/1.0' } }, (res) => {
      const elapsed = Date.now() - start;
      const { statusCode, headers } = res;
      let bodyLength = 0;
      res.on('data', (chunk) => { bodyLength += chunk.length; });
      res.on('end', () => {
        resolve({
          url,
          status: statusCode,
          timeMs: elapsed,
          contentType: headers['content-type'],
          bytes: bodyLength,
          cache: headers['x-vercel-cache'] || headers['cache-control'] || 'none'
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        error: err.message,
        timeMs: Date.now() - start
      });
    });
  });
}

async function run() {
  console.log('--- STARTING HEALTH CHECK AUDIT ---');
  const results = [];
  for (const ep of endpoints) {
    const res = await checkUrl(ep);
    results.push(res);
    console.log(`${res.status === 200 ? '✅' : res.status === 405 ? 'ℹ️' : '⚠️'} [${res.status}] ${res.url} (${res.timeMs}ms, ${res.bytes || 0} bytes)`);
  }
  console.log('\n--- SUMMARY ---');
  const all200 = results.filter(r => r.status === 200).length;
  console.log(`Total: ${results.length}, Passed (200): ${all200}, Other/API: ${results.length - all200}`);
}

run();
