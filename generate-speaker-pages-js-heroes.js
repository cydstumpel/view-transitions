import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdirSync } from 'node:fs'
/**
 * JSHeroes 2026 — speakers, talks, and schedule scraped from https://jsheroes.io/
 * Speaker photos: local PNGs in js-heroes/assets/img/, named by first name (lowercase).
 */

const __dirname = dirname(fileURLToPath(import.meta.url))
const speakerImg = (firstName) => `./assets/img/${firstName}.png`
const speakerMask = (firstName) => `./assets/img/masks/temp/${firstName}-mask.png`

export const conference = {
  name: 'JSHeroes',
  year: 2026,
  tagline: 'Community organized JS conference',
  dates: { start: '2026-05-14', end: '2026-05-15' },
  city: 'Cluj-Napoca',
  country: 'Romania',
  venue: 'Grand Hotel Italia',
  timezone: 'Europe/Bucharest',
  ticketsUrl: 'https://ti.to/jsheroes/2026/',
  website: 'https://jsheroes.io/'
}

export const speakers = [
  {
    id: 'phil-hawksworth',
    name: 'Phil Hawksworth',
    title: 'Head of DevRel @ Deno',
    topic: 'JavaScript',
    bio: 'With a passion for browser technologies, and the empowering properties of the web, Phil loves seeking out ingenuity and simplicity, especially in places where over-engineering is common.\n\nAfter 25 years of building web applications for companies such as Google, Apple, Nike, R/GA, and The London Stock Exchange, Phil has worked to challenge traditional technical architectures in favour of simplicity and effectiveness.\n\nPhil is co-author of “Modern Web Development on the Jamstack” (O’Reilly, 2019)',
    media: speakerImg('phil'),
    mask: speakerMask('phil'),
    talk: {
      title: "The time traveller's guide to JavaScript",
      date: 'Thursday 14 May',
      startTime: '09:30',
      endTime: '10:00',
      isoStart: '2026-05-14T09:30:00+03:00',
      isoEnd: '2026-05-14T10:00:00+03:00',
      description: `
      <p>With JavaScript turned 30 last year, it feels like a good time to look back at where we came from, and look forward to where we might be heading.</p>
      <p>In this nostalgic talk, Phil will reflect on some of the moments of our past as JavaScript and web technologies evolved, share thoughts on some of our collective hits and misses, and present some hopes and insights on what the future could hold.</p>
      `
    }
  },
  {
    id: 'suz-hinton',
    name: 'Suz Hinton',
    title: 'Indie Developer',
    topic: 'Human Intelligence',
    bio: 'Suz Hinton is a senior software engineer, most recently at CrowdStrike where she developed advanced threat hunting technologies on their research team. Suz has been in the industry for over 15 years holding positions at Microsoft, Stripe, and Kickstarter. She’s also an advocate for accessibility, privacy, security, and prioritizing the user experience.',
    media: speakerImg('suz'),
    mask: speakerMask('suz'),
    talk: {
      title: 'Digital preservation and cyberpunk for front-end developers',
      date: 'Friday 15 May',
      startTime: '16:00',
      endTime: '16:30',
      isoStart: '2026-05-15T16:00:00+03:00',
      isoEnd: '2026-05-15T16:30:00+03:00',
      description: `
      `
    }
  },
  {
    id: 'daniel-roe',
    name: 'Daniel Roe',
    title: 'Team lead, Nuxt @ Vercel',
    topic: 'Devtools',
    bio: 'Daniel leads the Nuxt core team. Previously, he was CTO of a SaaS startup and founder of a creative agency focusing on clarity of vision and message.\n\nHe is part of the team at Vercel where he is employed to work full-time on Nuxt.\n\nHis open source work has a focus in the Vue.js and Nuxt ecosystems. He’s a keynote speaker at conferences around the world, particularly around frontend, web performance, serverless and software architecture.',
    media: speakerImg('daniel'),
    mask: speakerMask('daniel'),
    talk: {
      title: 'Working backwards',
      date: 'Thursday 14 May',
      startTime: '11:15',
      endTime: '11:45',
      isoStart: '2026-05-14T11:15:00+03:00',
      isoEnd: '2026-05-14T11:45:00+03:00',
      description: `
      <p>Whether you’re building devtools or building APIs for your own team to use, nailing developer experience is essential.</p>
      <p>In this in-depth talk, Daniel will talk about designing developer APIs, improving DX and writing code that’s both maintainable and increases developer productivity. He’ll illustrate his points using real world code.</p>
      `
    }
  },
  {
    id: 'dominik-dorfmeister',
    name: 'Dominik Dorfmeister',
    title: 'Frontend Engineer @ Sentry',
    topic: 'Maintainability',
    bio: 'Dominik is a frontend engineer and open-source maintainer from Vienna, Austria. He is a core maintainer of TanStack Query and blogs about all things React & Typescript at tkdodo.eu.',
    media: speakerImg('dominik'),
    mask: speakerMask('dominik'),
    talk: {
      title: "Dead Code Shouldn't Exist: How We Removed 28k Lines of Code, One Knip at a Time",
      date: 'Thursday 14 May',
      startTime: '11:45',
      endTime: '12:15',
      isoStart: '2026-05-14T11:45:00+03:00',
      isoEnd: '2026-05-14T12:15:00+03:00',
      description: `
      <p>Ever wonder how much of your codebase is just… hanging around, doing nothing? At Sentry, we did too - and the answer was more than we expected. In this talk, I’ll share how we used Knip, a powerful tool for detecting unused files, exports, and dependencies, to declutter our frontend codebase. You’ll learn about the practical steps we took to safely identify and remove dead code, how we integrated Knip into our workflows, about unexpected edge-cases and what we learned along the way. Whether you’re maintaining a massive monolith or just looking to tidy up, this session will give you practical strategies - and maybe a little inspiration - to start decluttering your own codebase, one Knip at a time.</p>
      `
    }
  },
  {
    id: 'cyd-stumpel',
    name: 'Cyd Stumpel',
    title: 'Creative Developer',
    topic: 'CSS',
    bio: 'Cyd creates accessible, creative, award winning websites for individuals and companies.\n\nSharing knowledge is big part of what she likes about being a developer. She does that by blogging, at meetups, conferences and by teaching the next generation of web developers at the Amsterdam University of Applied Sciences at the Associate Degree Frontend Design & Development and the Minor Web Design & Development.',
    media: speakerImg('cyd'),
    mask: speakerMask('cyd'),
    talk: {
      title: 'You might not need JS',
      date: 'Thursday 14 May',
      startTime: '15:30',
      endTime: '16:00',
      isoStart: '2026-05-14T15:30:00+03:00',
      isoEnd: '2026-05-14T16:00:00+03:00',
      description: `
        <p>Motion on the web has come full circle: from simple CSS animations and transitions, to JavaScript libraries, and now back to CSS again. With the View Transitions API and Scroll-Driven Animations we'll explore how modern CSS is reshaping creative development today and where you can replace JS with CSS solutions.</p>
      `
    }
  },
  {
    id: 'ryan-townsend',
    name: 'Ryan Townsend',
    title: 'Principal Product Manager @ Cloudflare',
    topic: 'Performance',
    bio: 'Ryan is a Principal Product Manager on Cloudflare’s Speed team, working on RUM & Web Analytics. He’s worked with the web for over 20 years, including 10 as a SaaS CTO in ecommerce, his mission being to make the web faster, more enjoyable and more accessible for everyone.\n\nHe also publishes videos and articles at LessonsofaCTO.com',
    media: speakerImg('ryan'),
    mask: speakerMask('ryan'),
    talk: {
      title: 'Faster navigations than React',
      date: 'Friday 15 May',
      startTime: '10:00',
      endTime: '10:30',
      isoStart: '2026-05-15T10:00:00+03:00',
      isoEnd: '2026-05-15T10:30:00+03:00',
      description: `
      <p>Page views smaller and faster than the famously-minimal HackerNews homepage?!</p>
      <p>What if I told you there are two Web Platform features that will give you genuinely instant page loads with minimal overhead? If you want this today, you may think you must reach for a big JavaScript framework like React, Vue or Svelte, but these are APIs becoming baked into the browsers.</p>
      <p>Both see use on ~10% of page views globally, but this is mostly down to a handful of large platforms and third-parties, so this is an opportunity to see what’s on the horizon for web performance, peek at what the likes of Google and Shopify are doing to get ahead and learn how you can leverage these features to your advantage today.</p>
      `
    }
  },
  {
    id: 'anjana-vakil',
    name: 'Anjana Vakil',
    title: 'Independent Developer & Educator',
    topic: 'Career Development',
    bio: 'A chronically curious teacher-turned-developer, Anjana is an independent software engineer & educator, an alumna of the Recurse Center & Outreachy, and an avid karaoke enthusiast.',
    media: speakerImg('anjana'),
    mask: speakerMask('anjana'),
    talk: {
      title: 'TBD',
      date: 'Friday 15 May',
      startTime: '13:45',
      endTime: '14:15',
      isoStart: '2026-05-15T13:45:00+03:00',
      isoEnd: '2026-05-15T14:15:00+03:00',
      description: ``
    }
  },
  {
    id: 'craig-abbott',
    name: 'Craig Abbott',
    title: 'Principal A11y Specialist @ TetraLogical',
    topic: 'Accessibility',
    bio: 'Craig is a Principal Accessibility Consultant at TetraLogical and the former Head of Accessibility at the Department for Work and Pensions (DWP) in the UK Government. He has over 15 years’ experience designing and building user-centred products, previously working as a UX Designer and Design Manager. He specialises in sustainable accessibility, developing policies and processes that help teams develop the capabilities needed to consistently deliver accessible products and services.',
    media: speakerImg('craig'),
    mask: speakerMask('craig'),
    talk: {
      title: 'AI and human-centred accessibility',
      date: 'Thursday 14 May',
      startTime: '13:45',
      endTime: '14:15',
      isoStart: '2026-05-14T13:45:00+03:00',
      isoEnd: '2026-05-14T14:15:00+03:00',
      description: `
      <p>In this talk, Craig will cover some of his research into using AI tools for accessibility. He will highlight some shortcomings and over promises, and discuss why accessibility and inclusion work is unlikely to be displaced by AI any time soon!
      </p>`
    }
  },
  {
    id: 'misha-korolev',
    name: 'Misha Korolev',
    title: 'Developer Experience Engineer',
    topic: 'JavaScript',
    bio: 'Software engineer of over 12 years, currently occupied with all the things about front-end infrastructure and developer happiness. Talk to me about the Web Platform, browser guts and specialty coffee!',
    media: speakerImg('misha'),
    mask: speakerMask('misha'),
    talk: {
      title: 'Reverse-engineering JavaScript to get rid of trust issues',
      date: 'Thursday 14 May',
      startTime: '10:00',
      endTime: '10:30',
      isoStart: '2026-05-14T10:00:00+03:00',
      isoEnd: '2026-05-14T10:30:00+03:00',
      description: `
      <p>Like it or not, those days lots of things around us run on JavaScript. Web, mobile and desktop apps, TVs, fridges and space rockets - you name it!</p>
      <p>We’ll talk about how to put this to good use by utilizing the forbidden craft of “disassembling”. We’ll dissect a website live on stage!</p>
      <p>You’ll learn how to debug, reverse-engineer and untangle JavaScript. Fear not, this actually comes in handy in real life!</p>
      <p>Understanding how to work with weird code comes with a whole set of skills transferable directly to your average working day: complex debugging, profiling and using developer tools to their fullest potential.</p>
      `
    }
  },
  {
    id: 'bogdan-zaharia',
    name: 'Bogdan Zaharia',
    title: 'TypeScript Developer @ Hootsuite',
    topic: 'Architecture',
    bio: 'Typescript developer. Interested in architecture, or “how to write code that doesn’t make you think too much”.',
    media: speakerImg('bogdan'),
    mask: speakerMask('bogdan'),
    talk: {
      title: 'The power of managed effects',
      date: 'Friday 15 May',
      startTime: '11:45',
      endTime: '12:15',
      isoStart: '2026-05-15T11:45:00+03:00',
      isoEnd: '2026-05-15T12:15:00+03:00',
      description: `
      <p>Side effects are often the root of complexity, making our code difficult to test and reason about. But what if we could treat those effects as data? Enter managed effects: a functional programming concept that is gaining serious traction in the JS ecosystem. This session will cover the fundamentals of managed effects, how to implement them in your projects, and the “superpowers” they grant you when it comes to debugging and testing.
      </p>`
    }
  },
  {
    id: 'faris-aziz',
    name: 'Faris Aziz',
    title: 'Staff Software Engineer @ Smallpdf',
    topic: 'Performance',
    bio: 'Faris Aziz is a Staff Frontend Engineer specializing in React, Next.js, monetization systems, and resilient web architecture. He’s led teams in early-stage startups and scaling companies, built career ladders from scratch, and shipped systems used by millions.\n\nHis work spans greenfield builds and legacy refactors across Fintech, SaaS, Fitness, and Connected TV, with companies like Smallpdf, Fiit, Discovery, GCN, and Navro. He focuses on building performant, user-centric applications with solid observability and maintainability.\n\nFaris co-organizes ZurichJS, contributes to tools like Raycast, and spends time contemplating life’s great questions, like why the build works on his machine but nowhere else.',
    media: speakerImg('faris'),
    mask: speakerMask('faris'),
    talk: {
      title: 'Caching payloads and other dark arts: optimizing UX in suboptimal conditions',
      date: 'Friday 15 May',
      startTime: '09:30',
      endTime: '10:00',
      isoStart: '2026-05-15T09:30:00+03:00',
      isoEnd: '2026-05-15T10:00:00+03:00',
      description: `
      <p>This talk breaks down real world data fetching challenges at scale and how to solve them with modern patterns like the BFF layer, granular payload shaping, prefetching, and critical versus optimal queries. We walk through progressively improving an architecture that starts with five parallel client side requests against a bloated API, then move the work to a proxy handler, and finally to a fully optimized TanStack Query setup with server prefetching and resilient fallbacks.
      </p>
      <p>All demos were recorded on a long haul flight using in flight WiFi, showing how these patterns behave under real latency, unstable bandwidth, and failure conditions. The goal is to prove that these techniques are not academic. They directly affect reliability, performance, and user experience in harsh environments where debugging, caching strategy, and payload discipline make or break your product.
      </p>`
    }
  },
  {
    id: 'cassondra-roberts',
    name: 'Cassondra Roberts',
    title: 'Consultant',
    topic: 'Web Components',
    bio: 'Cassondra Roberts is a design systems architect and W3C CSS Working Group invited expert specializing in web component architecture. She founded PatternFly Elements at Red Hat—the open source design system now used across organizations like Google, IBM, and Fidelity—and spent four years advancing Adobe’s Spectrum Design System, where she led CSS architecture and AI integration.\n\nWith over a decade building component libraries at enterprise scale, Cassondra focuses on the critical architectural decisions that make design systems scalable, maintainable, and accessible. She’s passionate about web standards, component design, and helping teams choose the right architecture for their specific needs. Through Allons-y Consulting, she helps organizations build design systems that actually work.',
    media: speakerImg('cassondra'),
    mask: speakerMask('cassondra'),
    talk: {
      title: 'Sisyphus Had It Easy: Navigating the Web Component Styling Landscape',
      date: 'Thursday 14 May',
      startTime: '14:15',
      endTime: '14:45',
      isoStart: '2026-05-14T14:15:00+03:00',
      isoEnd: '2026-05-14T14:45:00+03:00',
      description: `
      <p>Every time you think you’ve figured out web component styling, you hit a hidden limitation and have to start over. Shadow DOM encapsulation breaks your global styles. Constructable stylesheets have browser support gaps. CSS custom properties work until they don’t scale. You roll the boulder up the mountain, only to watch it tumble back down.
      </p>
      <p>This talk will show us how to break the cycle. We’ll map the complete styling landscape — from constructable stylesheets to CSS parts, from custom properties to global inheritance patterns. You’ll learn which approaches actually hold at the summit, understand the tradeoffs that matter, and walk away with a decision framework that keeps you out of a constant refactoring cycle. The mountain doesn’t get smaller, but the path to the top becomes clear.
      </p>`
    }
  },
  {
    id: 'andrei-pfeiffer',
    name: 'Andrei Pfeiffer',
    title: 'Platform Engineer @ SmileCloud',
    topic: 'Node.js',
    bio: 'Andrei is an eclectic code designer, developing websites and web apps since 2000. Currently working as a Platform Engineer, his everyday battles revolve around Clean Code Design, User & Developer Experience, Performance, and fighting software entropy through constant Refactoring, Automated Testing, and Code Reviews.',
    media: speakerImg('andrei'),
    mask: speakerMask('andrei'),
    talk: {
      title: 'Retired dependencies',
      date: 'Thursday 14 May',
      startTime: '16:00',
      endTime: '16:30',
      isoStart: '2026-05-14T16:00:00+03:00',
      isoEnd: '2026-05-14T16:30:00+03:00',
      description: `
      <p>
      For years, we’ve relied on countless third-party modules to build Node.js applications, as the standard library lacked many essential features. However, recent Node.js versions have introduced powerful tools that greatly extend its built-in capabilities. In this talk, we’ll explore these new features and identify dependencies we can safely remove from our package.json files.
      </p>`
    }
  },
  {
    id: 'siddharth-dayalwal',
    name: 'Siddharth Dayalwal',
    title: 'Dev Community Specialist @ Storyblok',
    topic: 'DX',
    bio: 'Siddharth Dayalwal is a developer community and ecosystem builder with an experience in designing and scaling global developer programs, hackathons, and ambassador initiatives. He   has worked closely with product, growth, and developer experience teams to drive adoption, gather feedback, and support builders at scale. Outside of his professional role, he runs Hack This Fall, one of India’s most active builder communities, and is deeply passionate about empowering developers through learning, collaboration, and community-led growth.',
    media: speakerImg('siddharth'),
    mask: speakerMask('siddharth'),
    talk: {
      title: 'The cognitive load crisis: how modern web systems burn out teams',
      date: 'Friday 15 May',
      startTime: '14:15',
      endTime: '14:45',
      isoStart: '2026-05-15T14:15:00+03:00',
      isoEnd: '2026-05-15T14:45:00+03:00',
      description: `
      <p>Modern web systems are more powerful than ever, yet development teams are increasingly overwhelmed. As architectures grow more complex, developers face fragmented tools, constant context switching, and an endless stream of decisions, all contributing to cognitive overload and burnout.
      </p>
      <p>
        This talk approaches the problem from a systems design perspective, not as a productivity or tooling issue. We’ll explore how modern architectures unintentionally increase mental overhead, why adding more tools often makes developer experience worse, and how automation and AI can amplify complexity when poorly designed.
      </p>
      <p>
        Finally, we’ll look at architectural patterns that reduce cognitive load by minimizing decisions, simplifying workflows, and designing systems that support calmer, more sustainable development. Attendees will leave with practical principles for building web systems that scale without burning out the humans who build them.
      </p>`
    }
  },
  {
    id: 'richard-gross',
    name: 'Richard Gross',
    title: 'Head of Software Archaeology @ MaibornWolff',
    topic: 'Code Quality',
    bio: 'Richard Gross is an IT archaeologist at MaibornWolff with more than ten years of modernization experience. His focus is on hexagonal architectures, hypermedia APIs, TestDSLs and the expressive and unambiguous modelling of the domain as code. He enjoys mastering TDD, BDD, DDD, decoupled design and even practices that don’t include two D’s. He also shaped the open source project CodeCharta, which lets even non-developers grasp the quality of their software.',
    media: speakerImg('richard'),
    mask: speakerMask('richard'),
    talk: {
      title: 'Making sense of frontend code with forensic techniques',
      date: 'Friday 15 May',
      startTime: '11:15',
      endTime: '11:45',
      isoStart: '2026-05-15T11:15:00+03:00',
      isoEnd: '2026-05-15T11:45:00+03:00',
      description: `
      <p>In projects with hundreds of thousands of lines, it is easy to lose track of code, architecture and quality. Are we still on the right track, are we blocking ourselves with internal dependencies, or are we already stuck? Software is immaterial, we cannot see how it is doing.
      </p>
      <p>
        In this talk, we will therefore look at the forensic techniques and tools we can use to make the quality of code and architecture tangible. The tools extract quantitative information from code, architecture, git history, and the techniques qualify these results. Put together we have accurate picture where we stand. This also supports us in having a dialog with non-technical stakeholders at eye level about the required quality.
      </p>`
    }
  },
  {
    id: 'zbyszek-tenerowicz',
    name: 'Zbyszek Tenerowicz',
    title: 'meet.js',
    topic: 'Creative Coding',
    bio: 'JavaScript and Web enthusiast, pushing web security to the limit building LavaMoat and Endo. Started using Node.js at v0.8 and never stopped. Enjoys innovating and teaching security, diagnostics and maintainability. One of the oldest members of meet.js Poland community - both as a speaker and organizer. Hacking JavaScript since his teenage years.',
    media: speakerImg('zbyszek'),
    mask: speakerMask('zbyszek'),
    talk: {
      title: '25 years of embracing the weird',
      date: 'Friday 15 May',
      startTime: '15:30',
      endTime: '16:00',
      isoStart: '2026-05-15T15:30:00+03:00',
      isoEnd: '2026-05-15T16:00:00+03:00',
      description: `
      <p>I strongly believe we’ll never run out of wonky things we can do with JavaScript. Here’s a few of mine. They’re an entertaining way to show some niche corners of JavaScript and reigniting the joy of exploring it.
      </p>
      <p>25 years ago I made Windows desktop crash with 5 lines of JS. I (almost) made a 3D game engine for gamers who can’t see. I made one function both synchronous and asynchronous at the same time. I made CommonJS work in the browser on top of ES import, against better judgement. I use with and eval for my full time job as a Security Engineer.
      </p>
      `
    }
  }
]

export const supportCrew = [
  {
    id: 'sara-vieira',
    name: 'Sara Vieira',
    role: 'MC',
    bio: '',
    media: speakerImg('sara')
  },
  {
    id: 'tejas-kumar',
    name: 'Tejas Kumar',
    role: 'MC',
    bio: 'Tejas Kumar is an international keynote speaker with an engineering background spanning 22 years, from design to frontend to backend to devops. Today, Tejas shares talks at large with developer communities worldwide, equipping them to do their best work.',
    media: speakerImg('tejas')
  },
  {
    id: 'oana-zaulet',
    name: 'Oana Zaulet',
    role: 'Sketch Artist',
    bio: 'Oana Zăuleț is a multidisciplinary creative with a background in illustration and animation, currently working in marketing. She began learning graphic recording in 2019, and since then, she has applied this skill at various events, including Creative Mornings.\n\nIn her free time, she volunteers with scouts, supporting media and communication both at local and national levels.',
    media: speakerImg('oana')
  }
]



/** Single object if you prefer one import */
export const jsHeroes2026 = {
  conference,
  speakers,
  supportCrew,
}

export default jsHeroes2026

const generateIndexPage = () => {
  const templatePath = join(__dirname, 'js-heroes', 'template.html')
  const template = readFileSync(templatePath, 'utf8')

  const speakersList = speakers.map(speaker => {
    return `
      <li class="speaker" style="--vt: ${speaker.id}; --vt-before: ${speaker.id}-before">
        <h3 class="small-heading caps">
          <a href="speakers/${speaker.id}" style="--vt: ${speaker.id}-speaker-name">
            ${speaker.name}
          </a>
        </h3>
        <div class="speaker-image">
          <div class="speaker-topic-container" style="--mask-image: url(${speaker.mask}); --vt: ${speaker.id}-topic">
            <p class="medium-heading caps">${speaker.topic}</p>
          </div>
          <img src="${speaker.media}" alt="${speaker.name}">
        </div>
      </li>
    `
  }).join('')
  const supportCrewList = supportCrew.map(crew => {
    return `
      <li class="support-crew speaker">
        <h3 class="small-heading caps">
          ${crew.name}
        </h3>
        <div class="speaker-image">
          <img src="${crew.media}" alt="${crew.name}">
        </div>
      </li>
    `
  }).join('')


  const content = template
    .replace(/{ speakers }/g, speakersList)
    .replace(/{ supportcrew }/g, supportCrewList)
  const outputPath = join(__dirname, 'js-heroes', 'index.html')
  writeFileSync(outputPath, content)
  console.log('Generated index.html')
}
generateIndexPage()

const generateSpeakerPages = () => {
  const templatePath = join(__dirname, 'js-heroes', 'speakers', 'template.html')
  const speakers = jsHeroes2026.speakers
  const template = readFileSync(templatePath, 'utf8')
  speakers.forEach(speaker => {
    const content = template
      .replace(/{ speaker name }/g, speaker.name)
      .replace(/{ speaker title }/g, speaker.title)
      .replace(/{ speaker bio }/g, speaker.bio)
      .replace(/{ speaker media }/g, `../../${speaker.media}`)
      .replace(/{ speaker name replace spaces with dash }/g, speaker.id)
      .replace(/{ speaker talk title }/g, speaker.talk.title)
      .replace(/{ speaker talk date }/g, new Date(speaker.talk.isoStart).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }))
      .replace(/{ speaker talk time }/g, speaker.talk.startTime)
      .replace(/{ speaker talk description }/g, speaker.talk.description)
      .replace(/{ speaker mask }/g, `../../${speaker.mask}`)

    const outputPath = join(__dirname, 'js-heroes', 'speakers', speaker.id, 'index.html')
    mkdirSync(join(__dirname, 'js-heroes', 'speakers', speaker.id), { recursive: true })
    writeFileSync(outputPath, content)
    console.log(`Generated ${speaker.id}.html`)
  })
}
generateSpeakerPages()
