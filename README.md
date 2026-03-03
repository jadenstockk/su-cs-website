# SU Computer Science Department Website Redesign

A project for a hackathon hosted by the Stellenbosch University Developer's Society. The task was to redesign the outdated website of the Computer Science Department.

---

## Design and Build Process

I first planned out a basic idea of the UI in Figma and pieced together a video to play in the background of the hero section. For this I gathered some reference images from the Stellenbosch website and used Google Veo to create some videos which I chopped up and took the good parts to make a nice loop. I always tend to find starting with this design process makes the rest a whole lot easier.

<img width="1584" height="866" alt="40654" src="https://github.com/user-attachments/assets/93dd7e71-4f1c-4bbe-8a48-156357667bd9" />

I then built everything in Next.js and Tailwind, using ShadCN UI for my component library (just because it's always so easy to customise). I also implemented internationalisation with next-intl. The translation content is currently hardcoded in JSON files, but the Drupal integration is ready to go I just didn't have enough time to add all of the content to Drupal and get the translations working correctly (Durpal is a pain when it comes to performance).

Anyway, once I had the hero design done, it was easier to get the rest of the pages done with the help of my sidekick Claude Opus 4.6 (what a beast). I also addde lots of cool extra details like the terminal easter egg (click the terminal button in the navbar), SEO optimisation for all pages, clean animations, and my favourite design trend at the moment - glassmorphism UI. Everything is also fully optimised for mobile devices.

<img width="1393" height="758" alt="hero" src="https://github.com/user-attachments/assets/54fe45d7-dcf3-490a-a1df-9faa157ebe31" />


---

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind

---

### Pages

| Route                         | Description                                 |
| ----------------------------- | ------------------------------------------- |
| `/`                           | Home — full landing experience              |
| `/about`                      | Department overview                         |
| `/research`                   | Research groups and focus areas             |
| `/programmes`                 | Programme listing hub                       |
| `/programmes/undergraduate/*` | Modules, prospective students, study guide  |
| `/programmes/postgraduate/*`  | Honours, Masters, PhD, modules, prospective |
| `/about/staff`                | Academic staff profiles                     |
| `/about/department`           | Department history and mission etc.         |
| `/about/students`             | Past students information                   |
| `/about/alumni`               | All alumni information                      |
| `/contact`                    | Contact details and campus location map     |

---

## Cool Details

### Glassmorphism UI

Consistent glass-card and glass-panel components are used throughout for a modern, cohesive aesthetic — frosted-glass surfaces with backdrop blur and semi-transparent backgrounds.

### Smooth Animations

Every page renders with a transition wrapper and individual sections fade in smoothly, giving the site a polished, fluid feel without heavy JS overhead.

### Internationalisation (i18n) - English, Afrikaans and isiXhosa

The entire website is fully translated into three languages:

- **English** (`en`) — default
- **Afrikaans** (`af`)
- **isiXhosa** (`xh`)

Language switching is available at all times via the navbar. All routes are locale-prefixed (e.g. `/af/programmes`) and `next-intl` handles routing, message loading, and locale detection automatically.

### SEO

SEO is fully sorted:

- **`sitemap.xml`** — auto-generated at build time, covering all routes × all three locales, with correct `hreflang` alternate links for each locale variant
- **`robots.txt`** — properly configured to allow crawling of all public routes
- **Metadata** — per-page metadata (title, description, Open Graph) managed through the Next.js Metadata API

### Mobile Responsiveness

Every page and component is fully responsive. Layouts shift gracefully across mobile, tablet, and desktop breakpoints using Tailwind's responsive utilities.

### Fake Terminal

Hidden behind the inconspicous terminal button on the navbar is a fully interactive fake terminal (courtesy of Claude) to make it feel a bit more personal to CS students. It faithfully simulates a Unix shell experience with:

- A simulated file system (`~/Documents`, `~/Projects`, `~/Downloads`, etc.) with realistic CS student content
- Commands: `ls`, `cd`, `pwd`, `cat`, `echo`, `clear`, `whoami`, `date`, `uname -a`, `man`, `neofetch`, `history`
- Department-specific commands: `modules`, `staff`, `research`, `links`, `contact`
- Tab autocomplete and ↑ / ↓ command history navigation
- A styled `neofetch`-style system info display

<img width="696" height="469" alt="24801" src="https://github.com/user-attachments/assets/4e5dadfe-342b-4f37-b8cf-64e19d37fcda" />

---

## Headless CMS — Drupal (JSON:API)

Drupal is set up and ready to serve as a headless CMS backend via its **JSON:API**. The API integration layer has been written and tested — the `getModules()` server action fetches and maps content from the Drupal endpoint:

```ts
// src/lib/actions.ts
export const getModules = async (): Promise<Module[]> => {
  const res = await fetch("http://<drupal-instance>/jsonapi/node/module");
  // maps JSON:API response to typed Module objects
};
```

The content types for the modules part of the website are all defined on the Drupal side. Unfortunetly Drupal's admin interface is not the most performant, and entering information for all modules, staff, and research groups manually was slow going. Translations in Drupal were a particular pain point, as the workflow for managing multilingual content (especially getting Afrikaans and isiXhosa translations correctly associated with their English source nodes) is non-obvious.

**The integration is ready to switch on** — it just needs the content to be populated in Drupal. Once the data is in, the site will pull it dynamically rather than from the JSON files. I can adjust this at a later stage if necessary.

---

## Running Locally

```bash
pnpm install
pnpm dev
```
