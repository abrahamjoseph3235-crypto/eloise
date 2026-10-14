ELOISE WEBSITE (static prototype)

Open index.html in a browser to view the site. No installation needed.

Files
  index.html      Home page (hero, welcome video, client and provider paths, steps, plans)
  client.html     Client space (symptoms, assessments, results, provider, billing)
  provider.html   Public provider information, rules and application form
  provider-dashboard.html  Provider workspace preview (not linked from public navigation)
  admin.html      Server-protected operations console preview (demo records only)
  help.html       Public help, FAQs and demo contact form
  assets/css/styles.css   Shared public/client styling and brand colour variables
  assets/css/admin.css    Shared operations/provider workspace styling
  assets/js/main.js       Mobile menu, symptom chips, video pop-up, demo forms and client preferences
  assets/js/admin.js      Operations console filters, sample actions, CSV exports and audit preview
  assets/js/provider-dashboard.js  Provider schedule, profile, history and support preview
  assets/js/help.js       Demo help form interaction
  assets/img/             Logo (dark and light) and favicon, all SVG

Admin access setup (Cloudflare Pages)
  - functions/_middleware.js protects /admin.html with an HttpOnly, Secure, SameSite=Strict session cookie.
  - Set ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET as Cloudflare Pages environment variables
    for Production (and Preview only if needed). Never commit .env or .dev.vars.
  - Local development can use .dev.vars; .env stores the local credential copy and is gitignored.
  - Use a strong unique password, enable MFA on the Cloudflare/GitHub accounts, and consider a Cloudflare
    rate-limiting rule for /api/admin/login. The admin data/actions are still demo-only and not persistent.

Before going live
  1. Replace every [BRACKETED] placeholder (prices, crisis lines, emails, dates, names).
  2. Add your welcome video at assets/video/welcome.mp4 and uncomment the source line in index.html.
  3. This is a front-end prototype. Login, payments, booking, assessment scoring and the
     application form need a backend or services (for example Stripe for payments, a
     secure video platform, and a database). Client health data needs compliant hosting
     and privacy handling for each country you serve.
  4. Have a lawyer review terms, privacy policy and licensing rules per country.
