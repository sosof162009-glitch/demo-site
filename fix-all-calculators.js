const fs = require('fs');
const path = require('path');

const BASE_DIR = '/root/.openclaw/workspace/demo-site';
const languages = ['en', 'ar', 'fr', 'es', 'de'];

// Lists of fake tools by category
const dateTimeTools = [
  'calendar-generator', 'date-difference-calculator', 'days-until-date',
  'time-zone-converter', 'unix-timestamp-converter', 'week-number-calculator', 
  'working-days-calculator'
];

const mathTools = [
  'age-calculator', 'average-calculator', 'compound-interest-calculator',
  'random-number-generator', 'scientific-calculator'
];

const converterTools = [
  'binary-to-decimal', 'decimal-to-binary', 'decimal-to-hex',
  'decimal-to-octal', 'hex-to-decimal', 'octal-to-decimal'
];

const timerTools = ['countdown-timer', 'pomodoro-timer'];

const allFakeTools = [...dateTimeTools, ...mathTools, ...converterTools, ...timerTools];

console.log(`🔧 إصلاح ${allFakeTools.length} أداة وهمية × 5 لغات = ${allFakeTools.length * 5} ملف`);
console.log('الأدوات:', allFakeTools.join(', '));
console.log('\n⚠️ هذا يتطلب وقت طويل. هل تبغي أبدأ الإصلاح؟');
console.log('للتأكيد، شغل: node fix-all-calculators-confirm.js --confirm');
