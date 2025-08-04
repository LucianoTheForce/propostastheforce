export function generateProposalThumbnail(clientName: string, projectName: string): string {
  // Generate a simple SVG thumbnail with the client and project names
  const svg = `<svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#3730a3;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="400" height="225" fill="url(#bg)"/>
    <text x="200" y="100" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="white">${escapeXml(clientName)}</text>
    <text x="200" y="140" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#93bbff">${escapeXml(projectName)}</text>
  </svg>`;
  
  // Convert to base64 data URL
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

export async function generateScreenshotThumbnail(url: string): Promise<string | null> {
  try {
    // Use Puppeteer MCP server to capture screenshot of the Three.js page
    const puppeteer = await import('puppeteer');
    
    // For local development, capture localhost
    const targetUrl = url.startsWith('http') ? url : `http://localhost:3000${url}`;
    
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 675 }); // 16:9 aspect ratio
    
    // Navigate to the page and wait for Three.js to load
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for Three.js content to be ready - look for the specific container with data attribute
    try {
      await page.waitForSelector('[data-three-canvas]', { timeout: 15000 });
      console.log('Found Three.js container');
      
      // Wait for canvas inside the container
      await page.waitForSelector('[data-three-canvas] canvas', { timeout: 10000 });
      console.log('Found Three.js canvas');
      
      // Additional wait for Three.js scene to load and animations to settle
      await new Promise(resolve => setTimeout(resolve, 5000));
      console.log('Three.js scene should be ready');
    } catch (error) {
      console.log('Three.js canvas not found, taking screenshot anyway:', error);
      // Continue even if Three.js elements aren't found - might still capture something useful
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      encoding: 'base64',
      clip: { x: 0, y: 0, width: 1200, height: 675 }
    });
    
    await browser.close();
    
    return `data:image/png;base64,${screenshot}`;
    
  } catch (error) {
    console.error('Error generating screenshot thumbnail:', error);
    return null;
  }
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}