# Deploy Instructions for Netlify

## Manual Deploy to Netlify

### Option 1: Drag and Drop Deploy
1. Run `npm run build` to create the production build
2. The build output will be in the `out` folder
3. Go to [netlify.com](https://netlify.com) and log in
4. Drag and drop the `out` folder to the deploy area

### Option 2: GitHub Integration
1. Push this repository to GitHub
2. Connect your GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `out`
5. Deploy automatically on every push

### Build Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Node Version**: 18

### Environment Variables (if needed)
- No environment variables required for this project

### Custom Domain
- After deployment, you can add a custom domain in Netlify dashboard
- The site will be available at a random netlify.app URL initially

## Project Structure
- Next.js 14 with App Router
- Tailwind CSS for styling
- TypeScript for type safety
- All CTA buttons point to `/application` page
- Business funding focused content
