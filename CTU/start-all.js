const { spawn } = require('child_process');
const path = require('path');

console.log('====================================================');
console.log('🚀 Khởi động hệ thống FANFUN Fullstack (FE + BE)...');
console.log('====================================================\n');

// 1. Start Server
const serverProcess = spawn('node', ['src/server.js'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// 2. Start Client
const clientProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: true
});

function cleanup() {
  console.log('\n🛑 Đang dừng hệ thống...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
