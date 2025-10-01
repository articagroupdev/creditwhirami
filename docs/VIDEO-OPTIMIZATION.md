# Video Optimization Guide

## Video Setup

### 1. Video File Requirements
- **File name**: `rami-video.mp4`
- **Location**: `/public/rami-video.mp4`
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Bitrate**: 2-5 Mbps for optimal quality/size balance
- **Duration**: Keep under 5 minutes for better engagement

### 2. Poster Image (Optional)
- **File name**: `video-poster.jpg`
- **Location**: `/public/video-poster.jpg`
- **Format**: JPG or WebP
- **Resolution**: Same aspect ratio as video (16:9)
- **Size**: Under 200KB

### 3. Video Optimization Commands

#### Using FFmpeg (Recommended)
```bash
# Basic optimization
ffmpeg -i input-video.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart rami-video.mp4

# High quality optimization
ffmpeg -i input-video.mp4 -c:v libx264 -crf 20 -preset slow -c:a aac -b:a 192k -movflags +faststart -vf "scale=1920:1080" rami-video.mp4

# Mobile optimized (smaller file)
ffmpeg -i input-video.mp4 -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 96k -movflags +faststart -vf "scale=1280:720" rami-video-mobile.mp4
```

#### Using HandBrake (GUI)
1. Open HandBrake
2. Select your source video
3. Preset: "Web - Gmail Large 3 Minutes 720p30"
4. Video: H.264, RF 20-23
5. Audio: AAC, 128kbps
6. Check "Web Optimized"

### 4. Performance Features

#### Implemented Optimizations
- ✅ **Lazy Loading**: Video loads only when needed
- ✅ **Preload Metadata**: Only loads video metadata initially
- ✅ **Caching**: Aggressive caching for video files
- ✅ **Error Handling**: Graceful fallback if video fails
- ✅ **Loading States**: User feedback during video load
- ✅ **Responsive**: Adapts to different screen sizes
- ✅ **Picture-in-Picture**: Modern browser PiP support

#### Additional Optimizations
- **CDN**: Consider using a CDN for video delivery
- **Multiple Formats**: Serve WebM for supported browsers
- **Adaptive Streaming**: For longer videos, consider HLS/DASH
- **Compression**: Use WebP for poster images

### 5. Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### 6. File Size Guidelines
- **Target size**: 10-50MB for 2-5 minute video
- **Maximum size**: 100MB (consider streaming for larger files)
- **Mobile optimization**: Create separate smaller version if needed

### 7. Testing Checklist
- [ ] Video loads quickly on desktop
- [ ] Video loads quickly on mobile
- [ ] Controls work properly
- [ ] Poster image displays before play
- [ ] Error handling works if video fails
- [ ] Picture-in-Picture works (if supported)
- [ ] Video is responsive on all screen sizes

### 8. Analytics Integration
The video player includes hooks for analytics:
- `onPlay`: Track when video starts
- `onPause`: Track when video is paused
- `onEnded`: Track when video completes

Example integration:
```javascript
onPlay={() => {
  // Google Analytics
  gtag('event', 'video_play', {
    video_title: 'Rami Business Funding Video',
    video_duration: '3:45'
  });
}}
```
