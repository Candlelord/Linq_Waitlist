import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { existsSync } from 'fs';
import { join } from 'path';

const input = join(process.cwd(), 'IMG_1277.MOV');
const outputDir = join(process.cwd(), 'public');
const output720 = join(outputDir, 'IMG_1277.mp4');
const output360 = join(outputDir, 'IMG_1277_360.mp4');

if (!existsSync(input)) {
  console.error('Input file not found:', input);
  process.exit(1);
}

try {
  if (!existsSync(outputDir)) {
    // create public directory
    import('fs').then(fs => fs.mkdirSync(outputDir, { recursive: true }));
  }
} catch (e) {
  // ignore
}

const commonArgs = ['-i', input, '-c:v', 'libx264', '-preset', 'medium', '-c:a', 'aac', '-movflags', '+faststart'];

const run = (args) => new Promise((resolve, reject) => {
  console.log('Running ffmpeg:', ffmpegPath, args.join(' '));
  const p = spawn(ffmpegPath, args, { stdio: 'inherit' });
  p.on('close', (code) => {
    if (code === 0) resolve(); else reject(code);
  });
});

(async () => {
  try {
    // 720p (default) - keep quality similar to original
    await run(commonArgs.concat(['-crf', '23', output720]));

    // 360p mobile-friendly version (lower bitrate and scale)
    await run(commonArgs.concat(['-vf', 'scale=640:360', '-crf', '28', '-b:a', '96k', output360]));

    console.log('All conversions complete:', output720, output360);
  } catch (code) {
    console.error('ffmpeg exited with code', code);
    process.exit(code);
  }
})();
