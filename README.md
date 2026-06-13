# ReliableBoston.com - Aerospace Manufacturing Website

Professional website for Reliable Machine Boston - aerospace manufacturing and innovation.

## 🚀 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Contact Form** - Integrated with Formspree for reliable form submissions
- **Employment Fields** - Conditional DOB and SSN fields for employment inquiries
- **SEO Optimized** - Meta tags, sitemap, and search engine friendly
- **Security Headers** - Protected against common web vulnerabilities
- **Performance Optimized** - Fast loading with optimized images and caching

## 🛠 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with Bootstrap 5
- **JavaScript** - Vanilla JS with GSAP animations
- **Formspree** - Contact form backend
- **Cloudflare Pages** - Hosting and SSL

## 📁 Project Structure

```
├── index.html          # Main website page
├── css/
│   └── style.css       # Custom styles
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Optimized images and logo
├── _headers           # Cloudflare security headers
├── _redirects         # URL redirect rules
├── robots.txt         # SEO crawler instructions
├── sitemap.xml        # Search engine sitemap
└── test.html          # Domain verification page
```

## 🔧 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/reliableboston-website.git
   cd reliableboston-website
   ```

2. **Open in browser**
   ```bash
   # Simple HTTP server
   python -m http.server 8000
   # Or use Live Server in VS Code
   ```

3. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin main
   ```

## 🚀 Deployment

Website automatically deploys to https://reliableboston.com on every push to the `main` branch via Cloudflare Pages.

## 📧 Contact Form Configuration

The contact form uses Formspree endpoint: `https://formspree.io/f/mojzkppd`

### Form Features:
- Name, email, company fields
- Inquiry type dropdown with conditional employment fields
- File attachment support (PDF, DOC, DOCX, TXT)
- Real-time validation
- Privacy policy agreement checkbox

### Employment History Fields:
When "Employment History" is selected, additional fields appear:
- Employee Date of Birth (must be 16+ years old)
- Employee SSN (last 4 digits only)

## 🎨 Branding

- **Company**: Reliable Machine, LLC
- **Logo**: Professional green and metallic design
- **Colors**: 
  - Primary Blue: #3498db
  - Dark Blue: #0e2c49
  - Accent Green: #79A15E

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: 992px+
- **Large Desktop**: 1200px+

## 🔒 Security Features

- HTTPS enforced
- XSS protection headers
- Content type validation
- HSTS headers
- Frame options protection

## 📈 SEO Optimization

- Semantic HTML structure
- Meta tags and Open Graph
- XML sitemap
- Robots.txt
- Canonical URLs
- Image alt attributes

## 🌟 Performance

- Optimized images (WebP where supported)
- Minified CSS and JS
- CDN delivery via Cloudflare
- Browser caching configured
- GZIP compression enabled

## 📞 Support

For technical support or questions:
- Create an issue in this repository
- Contact: info@reliableboston.com
- Location: Boston, MA

---

**Built with ❤️ for aerospace manufacturing excellence**