// Test runner for App component - testing function reference stability
// This test verifies that handleDisplayDrawer and handleHideDrawer maintain the same function reference

const fs = require('fs');
const path = require('path');

console.log('Testing function reference stability...');

try {
  // Read the App.jsx file
  const appFilePath = path.join(__dirname, 'src', 'App', 'App.jsx');
  const appContent = fs.readFileSync(appFilePath, 'utf8');

  // Test 1: Check if handleDisplayDrawer is wrapped in useCallback
  const handleDisplayDrawerMatch = appContent.match(/const handleDisplayDrawer = useCallback/);
  if (handleDisplayDrawerMatch) {
    console.log('OK - handleDisplayDrawer is memoized with useCallback');
  } else {
    console.log('NOK - handleDisplayDrawer is not memoized with useCallback');
  }

  // Test 2: Check if handleHideDrawer is wrapped in useCallback
  const handleHideDrawerMatch = appContent.match(/const handleHideDrawer = useCallback/);
  if (handleHideDrawerMatch) {
    console.log('OK - handleHideDrawer is memoized with useCallback');
  } else {
    console.log('NOK - handleHideDrawer is not memoized with useCallback');
  }

  // If both tests pass, print OK
  if (handleDisplayDrawerMatch && handleHideDrawerMatch) {
    console.log('OK');
  } else {
    console.log('NOK');
  }

} catch (error) {
  console.log('NOK - Error during testing:', error.message);
}
