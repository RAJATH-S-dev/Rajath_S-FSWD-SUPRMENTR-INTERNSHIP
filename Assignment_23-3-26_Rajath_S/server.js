import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Common headers for HTML responses
  res.setHeader('Content-Type', 'text/html');

  // Handle different routes
  switch (req.url) {
    case '/':
      res.statusCode = 200;
      res.end(`
        <html>
          <head><title>Hello Server</title></head>
          <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #C2652A;">Welcome to the Hello Server!</h1>
            <p style="color: #605850;">Try navigating to these routes:</p>
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
              <a href="/hello" style="padding: 10px 20px; background: #C2652A; color: white; text-decoration: none; border-radius: 8px;">/hello</a>
              <a href="/about" style="padding: 10px 20px; background: #78706A; color: white; text-decoration: none; border-radius: 8px;">/about</a>
              <a href="/api/data" style="padding: 10px 20px; background: #605850; color: white; text-decoration: none; border-radius: 8px;">/api/data</a>
            </div>
          </body>
        </html>
      `);
      break;

    case '/hello':
      res.statusCode = 200;
      res.end(`
        <html>
          <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #4CAF50;">Hello there! 👋</h1>
            <p>You have reached the <b>/hello</b> route.</p>
            <a href="/" style="color: #78706A;">Go Back</a>
          </body>
        </html>
      `);
      break;

    case '/about':
      res.statusCode = 200;
      res.end(`
        <html>
          <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #2196F3;">About This Server</h1>
            <p>This is a simple Node.js server created for the "Hello Server" assignment.</p>
            <p>It demonstrates how to handle basic routing without any frameworks like Express.</p>
            <a href="/" style="color: #78706A;">Go Back</a>
          </body>
        </html>
      `);
      break;

    case '/api/data':
      // JSON response for API routes
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      const data = {
        success: true,
        message: "This is a JSON response from a different route!",
        timestamp: new Date().toISOString()
      };
      res.end(JSON.stringify(data, null, 2));
      break;

    default:
      // 404 Route handling
      res.statusCode = 404;
      res.end(`
        <html>
          <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #8C3C3C;">404 - Not Found</h1>
            <p>Oops! The route <b>${req.url}</b> does not exist on this server.</p>
            <a href="/" style="color: #78706A;">Go Back Home</a>
          </body>
        </html>
      `);
      break;
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 Server is running successfully!`);
  console.log(`📡 Listening on: http://localhost:${PORT}`);
  console.log(`\nAvailable Routes:`);
  console.log(`  - http://localhost:${PORT}/`);
  console.log(`  - http://localhost:${PORT}/hello`);
  console.log(`  - http://localhost:${PORT}/about`);
  console.log(`  - http://localhost:${PORT}/api/data`);
  console.log(`\nPress Ctrl+C to stop the server.`);
});
