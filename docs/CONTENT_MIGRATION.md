# Sri Aurobindo School, Bhopal — Content Migration & Route Mapping

## Legacy URL Map & Redirect Strategy

The previous static site (`sas.edu.in`) utilized fragmented flat HTML pages with unverified template elements. All legacy URLs are permanently redirected via 301 rules configured in `next.config.mjs` to preserve search authority and prevent broken bookmarks.

| Legacy URL | Target App Route | Redirect Status | Notes |
|---|---|---|---|
| `/index.html` | `/` | 301 Permanent | Preserves home search signals |
| `/society.html` | `/about` | 301 Permanent | Migrated to SAEC heritage & timeline |
| `/vm.html` | `/about#vision-mission` | 301 Permanent | Anchors to Vision & Mission section |
| `/cm.html` | `/about#chairmans-message`| 301 Permanent | Anchors to Chairman Umesh Trivedi’s address |
| `/admissions.html`| `/admissions` | 301 Permanent | Full interactive admission concierge |
| `/academic.html` | `/academics` | 301 Permanent | Three-term cycle & pedagogy |
| `/contact.html` | `/contact` | 301 Permanent | Interactive map & enquiry form |
| `/gallery.html` | `/gallery` | 301 Permanent | Lightbox gallery with category filters |

---

## Content Improvements & Upgrades
- Added dedicated `/school-life` route detailing the Four Houses and athletics.
- Added `/notices`, `/news`, and `/events` dynamic portals with individual item slugs.
- Added `/admin` portal for school management to view admission leads and update circulars.
