const fs = require('fs');
const path = require('path');

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

} catch (error) {
  console.log('NOK');
}
