import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory with proper caching
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  etag: true
}));

// Handle SPA routing - send all non-asset requests to index.html
app.get('*', (req, res) => {
  // Don't intercept asset requests
  if (req.path.startsWith('/assets/') || req.path.endsWith('.js') || req.path.endsWith('.css') || req.path.endsWith('.ico')) {
    return;
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
