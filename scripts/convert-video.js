import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { existsSync } from 'fs';
import { join } from 'path';

const input = join(process.cwd(), 'IMG_1277.MOV');
const outputDir = join(process.cwd(), 'public');
const output = join(outputDir, 'IMG_1277.mp4');

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

const args = [
  '-i', input,
  '-c:v', 'libx264',
  '-preset', 'medium',
  '-crf', '23',
  '-c:a', 'aac',
  '-movflags', '+faststart',
  output
];

console.log('Running ffmpeg:', ffmpegPath, args.join(' '));

const proc = spawn(ffmpegPath, args, { stdio: 'inherit' });

proc.on('close', (code) => {
  if (code === 0) {
    console.log('Conversion complete:', output);
  } else {
    console.error('ffmpeg exited with code', code);
    process.exit(code);
  }
});
