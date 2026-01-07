Place the compressed MP4 background video here so Vercel serves it at /IMG_1277.mp4.

Recommended steps (local):

1. Convert MOV to MP4 with ffmpeg (install ffmpeg locally):

   ffmpeg -i IMG_1277.MOV -c:v libx264 -preset medium -crf 23 -c:a aac IMG_1277.mp4

2. Create `public/` if not present and move the MP4 into it:

   mkdir public
   mv IMG_1277.mp4 public/

3. Commit and push:

   git add public/IMG_1277.mp4
   git commit -m "Add compressed mp4 background video"
   git push

Vercel will serve the file at: https://<your-deployment>/IMG_1277.mp4

Note: Avoid committing very large files; consider compressing further if the repo grows too large.