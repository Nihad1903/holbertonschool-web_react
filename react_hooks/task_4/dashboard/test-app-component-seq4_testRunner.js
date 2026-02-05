import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const appFilePath = path.join(__dirname, 'src', 'App', 'App.jsx');
  const appContent = fs.readFileSync(appFilePath, 'utf8');

  const handleDisplayDrawerMatch = appContent.match(/const handleDisplayDrawer = useCallback/);
  const handleHideDrawerMatch = appContent.match(/const handleHideDrawer = useCallback/);

  if (handleDisplayDrawerMatch && handleHideDrawerMatch) {
    console.log('OK');
  } else {
    console.log('NOK');
  }

} catch {
  console.log('NOK');
}
