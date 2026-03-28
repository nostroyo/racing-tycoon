// UI Screens Manager for Boardurance - Placeholder for GitHub Pages

export function init() {
    console.log('UI Screens initialized');
}

export function showScreen(screenName) {
    console.log(`Showing screen: ${screenName}`);
    const container = document.getElementById('screen-container');
    if (container) {
        container.innerHTML = `