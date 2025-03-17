// Check the current theme in local storage or default to 'light'
let currentTheme = localStorage.getItem('theme') || 'light';
applyTheme(currentTheme);

// Select the theme switch button
const themeSwitcher = document.getElementById('theme-toggle');

// Listen for clicks on the theme switch button
themeSwitcher.addEventListener('click', () => {
    // Toggle between 'light' and 'dark'
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Save the selected theme to localStorage
    localStorage.setItem('theme', currentTheme);

    // Apply the new theme
    applyTheme(currentTheme);
});

// Function to apply the selected theme
function applyTheme(theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--background-color', '#1e1e2e');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--button-color', '#ff8c00');
        root.style.setProperty('--hover-button-color', '#e67300');
        root.style.setProperty('--link-color', '#ff8c00');
        root.style.setProperty('--border-color', '#333333');
    } else {
        root.style.setProperty('--background-color', '#ffffff');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--button-color', '#ff8c00');
        root.style.setProperty('--hover-button-color', '#e67300');
        root.style.setProperty('--link-color', '#ff8c00');
        root.style.setProperty('--border-color', '#dddddd');
    }

    // Apply the corresponding body background color
    document.body.style.backgroundColor = getComputedStyle(root).getPropertyValue('--background-color');
    document.body.style.color = getComputedStyle(root).getPropertyValue('--text-color');
}

// Helper function to get CSS variables
function getCSSVar(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable);
}
