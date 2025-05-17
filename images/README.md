# Portfolio Images

This directory should contain images for your portfolio. The website is set up to use the following image files:

1. `christmas-land.jpg`
2. `spaghetti-pencil.jpg`
3. `hoopoe.jpg`
4. `city-red-bricks.jpg`
5. `sentinel.jpg`
6. `personal-logo.jpg`

## Image Requirements

For best results:
- Use consistent aspect ratios (recommended: 4:3 or 3:2)
- Optimize images for web (recommended file size under 200KB per image)
- Use high-quality images (at least 800px wide)
- Save in JPG or WebP format for photos, PNG for graphics with transparency

## Adding More Portfolio Items

To add more portfolio items:
1. Add the image file to this directory
2. Update the HTML in `index.html` to include the new portfolio item
3. Follow the existing pattern for portfolio items

Example:
```html
<div class="portfolio-item">
    <a href="#your-project-name">
        <img src="images/your-image-file.jpg" alt="Your Project Name">
        <h3>Your Project Name</h3>
    </a>
</div>
``` 