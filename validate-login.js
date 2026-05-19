#!/usr/bin/env node

/**
 * Validation script for parrucchiere-login.html
 * Checks if the login system has all required functions and data
 */

const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'parrucchiere-login.html');
const content = fs.readFileSync(htmlFile, 'utf8');

console.log('🔍 VALIDAZIONE LOGIN SYSTEM\n');
console.log('='*50);

// Test 1: Check for required functions
const requiredFunctions = [
    'handleLoginInFile',
    'loadDashboardData',
    'generateCalendar',
    'initializeSidebar',
    'firebaseLoad',
    'firebaseSave'
];

console.log('\n✅ FUNZIONI RICHIESTE:');
requiredFunctions.forEach(fn => {
    const regex = new RegExp(`function ${fn}|const ${fn}\\s*=|async function ${fn}`);
    const found = regex.test(content);
    console.log(`  ${found ? '✅' : '❌'} ${fn}`);
});

// Test 2: Check for credentials
console.log('\n✅ CREDENZIALI:');
const credentials = [
    { email: 'admin@admin.it', password: 'admin123' },
    { email: 'anna@admin.it', password: 'anna123' }
];

credentials.forEach(cred => {
    const found = content.includes(cred.email) && content.includes(cred.password);
    console.log(`  ${found ? '✅' : '❌'} ${cred.email} / ${cred.password}`);
});

// Test 3: Check for async/await usage
console.log('\n✅ ASYNC HANDLING:');
const hasAwaitLoadDashboard = /await\s+loadDashboardData/.test(content);
const hasAwaitGenerateCalendar = /await\s+generateCalendar/.test(content);
console.log(`  ${hasAwaitLoadDashboard ? '✅' : '❌'} await loadDashboardData()`);
console.log(`  ${hasAwaitGenerateCalendar ? '✅' : '❌'} await generateCalendar()`);

// Test 4: Check for error handling
console.log('\n✅ ERROR HANDLING:');
const hasTryCatch = /try\s*{[\s\S]*?}\s*catch/.test(content);
const hasConsoleError = /console\.error/.test(content);
console.log(`  ${hasTryCatch ? '✅' : '❌'} Try-catch blocks`);
console.log(`  ${hasConsoleError ? '✅' : '❌'} Console error logging`);

// Test 5: Check for null checks
console.log('\n✅ NULL CHECKS:');
const hasEmailCheck = /!p\s*\|\|\s*!p\.email/.test(content);
const hasPasswordCheck = /!p\.password/.test(content);
console.log(`  ${hasEmailCheck ? '✅' : '❌'} Email null check`);
console.log(`  ${hasPasswordCheck ? '✅' : '❌'} Password null check`);

// Test 6: Check Firebase constants
console.log('\n✅ FIREBASE SETUP:');
const hasFirebaseURL = /FIREBASE_URL\s*=/.test(content);
const hasBusinessID = /BUSINESS_ID\s*=/.test(content);
console.log(`  ${hasFirebaseURL ? '✅' : '❌'} FIREBASE_URL defined`);
console.log(`  ${hasBusinessID ? '✅' : '❌'} BUSINESS_ID defined`);

// Test 7: Check DOM elements
console.log('\n✅ DOM ELEMENTS:');
const domElements = [
    'loginScreen',
    'dashboardContainer',
    'email',
    'password',
    'errorMsg',
    'calendarGrid'
];
domElements.forEach(el => {
    const found = new RegExp(`id=['"]${el}['"]|getElementById\\(['"]${el}['"]`).test(content);
    console.log(`  ${found ? '✅' : '❌'} #${el}`);
});

console.log('\n' + '='*50);
console.log('✅ VALIDAZIONE COMPLETATA\n');
