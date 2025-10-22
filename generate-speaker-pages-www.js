import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const timeDiff = (startTime, endTime, step = 5) => {
  // create date strings from startTime and endTime
  const startTimeDate = new Date(`2025-01-01T${startTime}:00`)
  const endTimeDate = new Date(`2025-01-01T${endTime}:00`)
  const diff5Minutes = Math.floor((endTimeDate.getTime() - startTimeDate.getTime()) / (1000 * 60 * step))
  return diff5Minutes
}

const getDescription = (id, type) => {
  if (type == 'talk') {
    return talkInfo.find(item => item.id == id).description
  } else if (type == 'workshop') {
    return workshopInfo.find(item => item.id == id).description
  }
  return ''
}

const getSpeakerMedia = (speaker, viewTransition = false) => {
  let names = speaker.split(' & ')
  console.log(names)
  let medias = ''
  names.forEach(name => {
    medias += `<img src="${speakers.find(item => item.name == name).media}" alt="${name}" ${viewTransition ? `style="--vt: ${name.toLowerCase().replace(/\s+/g, '-')}"` : ''}/>`
  })
  return medias
}

const getSpeakerButtons = (speaker) => {
  let names = speaker.split(' & ')
  let buttons = ''
  names.forEach(name => {
    buttons += `
    <a href="speakers/${name.toLowerCase().replace(/\s+/g, '-')}">
      Read more about ${name}
    </a>`
  })
  return buttons
}

const createEventsList = (speaker) => {

  const talk = talkInfo.find(item => item.speaker == speaker.name)
  const workshop = workshopInfo.find(item => item.speaker == speaker.name)

  let events = ''
  if (talk) {
    events += `
      <li class="event event-talk">
        <div class="p">
          <p class="labels">
            <span class="caps label">talk</span>
            <span class="caps label">${talk.level}</span>
          </p>
          <h3 class="medium-heading">${talk.title}</h3>
          <hr>
          <p class="small-body">
            <span>${talk.room}</span>,
            <span>${talk.date}</span>
            <span>${talk.startTime} - ${talk.endTime}</span>
          </p>
          <hr>
          <p class="medium-body">${talk.description}</p>
        </div>
      </li>
    `
  }
  if (workshop) {
    events += `
      <li class="event event-workshop">
        <div class="p">
          <p class="labels">
            <span class="caps label">workshop</span>
            <span class="caps label">${workshop.level}</span>
          </p>
          <h3 class="medium-heading">${workshop.title}</h3>
          <hr>
          <p class="small-body">
            <span>${workshop.room}</span>,
            <span>${workshop.date}</span>
            <span>${workshop.startTime} - ${workshop.endTime}</span>
          </p>
          <hr>
          <p class="medium-body">${workshop.description}</p>
        </div>
      </li>
    `
  }
  return events
}

const createScheduleItem = (item, startCol, endCol) => {
  if (item.type == 'talk' || item.type == 'workshop') {
    const description = getDescription(item.id, item.type)
    const speakerMedia = getSpeakerMedia(item.speaker, false)
    const speakerButtons = getSpeakerButtons(item.speaker)
    let moreInfo = `
    <div class="more-info medium-body">
      <p>${description}</p>
      ${speakerButtons}
    </div>`
    return `
    <div class="schedule-item ${item.room == 'A11Y Room' ? 'is-a11y-room' : ''}" data-type="${item.type}" style="--start-row: ${startCol}; --end-row: ${endCol};">
      <details>
        <summary>
          <div class="main-info">
            <div class="schedule-item-image">
            ${speakerMedia}
            </div>
            <div class="schedule-item-content">
              <div class="labels">
                ${item.type ? `<p class="caps label">${item.type}</p>` : ''}
                ${item.room ? `<p class="caps label">${item.room}</p>` : ''}
                <p class="caps label date-time"><time datetime="${item.isoStart}">${item.startTime}</time> - <time datetime="${item.isoEnd}">${item.endTime}</time></p>
              </div>
              <div class="content">
                ${item.speaker ? `<p class="medium-body tabular">${item.speaker}</p>` : ''}
                <h3 class="large-body tabular">${item.shortTitle}</h3>
              </div>
            </div>
          </div>
        </summary>
          ${moreInfo}
      </details>
    </div>`
  }

  return `
    <div
      class="schedule-item ${item.room == 'A11Y Room' ? 'is-a11y-room' : ''}"
      data-type="${item.type}"
      style="--start-row: ${startCol}; --end-row: ${endCol};">
      <p class="caps label"><time datetime="${item.isoStart}">${item.startTime}</time> - <time datetime="${item.isoEnd}">${item.endTime}</time></p>
      <h3 class="large-heading">${item.shortTitle}</h3>
    </div>`
}

// Speaker data from the website
const speakers = [
  {
    id: 'advait-sarkar',
    name: 'Advait Sarkar',
    title: 'Affiliated Lecturer at University of Cambridge',
    bio: 'Advait is an affiliated lecturer at the University of Cambridge, honorary lecturer at University College London, and researcher at Microsoft. He studies how to design human interfaces for artificial intelligence, and how to help people program and interact with data.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/AdvaitSarkar.webp',
    workshop: null,
    talk: 'why-would-anyone-visit-a-website-reflections-on-the-generative-shift-in-human-computer-experience',
  },
  {
    id: 'shelley-vohr',
    name: 'Shelley Vohr',
    title: 'Principal Engineer at Microsoft',
    bio: 'Shelley Vohr (she/her) is a software engineer based in Berlin, Germany. She\'s Principal Engineer at Microsoft, where she has worked as an Electron maintainer for over 6 years, as well as on Node.js as a TSC member and collaborator. Outside of work, Shelley loves to uncover hidden treasures at the flea market, eat the saltiest licorice humans can handle, and never misses the daily NYT crossword.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/Shelley_Vohr.webp',
    workshop: null,
    talk: 'trash-talk-understanding-memory-management',
  },
  {
    id: 'cyd-stumpel',
    name: 'Cyd Stumpel',
    title: 'Freelance Creative Developer',
    bio: 'Cyd is a freelance creative developer and part time teacher at the Amsterdam University of Applied Sciences. She creates accessible, award winning websites for everyone; from large organisations like WeTransfer and Amnesty International to creative agencies and freelancers. She\'s got an eye for details and loves to turn flat designs into rich experiences. Cyd has mostly focused on JavaScript animation over the last couple of years but has rediscovered her passion for CSS this year, rebuilding her portfolio with View Transitions and Scroll Driven Animation.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/Cyd.webp',
    workshop: 'adding-cohesive-animations-to-websites',
    talk: 'you-might-not-need-js',
  },
  {
    id: 'candi-williams',
    name: 'Candi Williams',
    title: 'UX Content Design Director',
    bio: 'By day, Candi\'s a UX content director who loves helping her team thrive, solving complex user experience challenges, and championing inclusive design. With over a decade in experience design - spanning products from banking to dating - she knows a thing or two about IA, AI, and everything in between. By night, she\'s a published author of four books, a tarot reader, and trained sommelier (who tends not to combine them all at once). A self-confessed "word nerd" with a first-class degree in Linguistics, she\'s super passionate about the power of language and the impact it has on what people think, feel, and do (on and offline).',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/CandiWilliams.webp',
    workshop: null,
    talk: 'the-secret-sauce-of-great-ux',
  },
  {
    id: 'piccia-neri',
    name: 'Piccia Neri',
    title: 'Accessible Design Trainer & Consultant',
    bio: 'Piccia Neri is on a mission to prove that inclusive design doesn\'t kill creativity: it fuels it. As a UX and accessible design consultant, she leads global projects for companies of all sizes and trains designers, marketers and developers to put accessibility at the heart of their work. Piccia speaks at conferences worldwide, and her current main focus is on balancing creativity and accessibility, without sacrificing either.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/PicciaNeri.webp',
    workshop: 'colour-and-contrast-for-accessibility',
    talk: 'the-best-creative-brief',
  },
  {
    id: 'alessandra-canella',
    name: 'Alessandra Canella',
    title: 'Design Leader & Mentor',
    bio: 'Alessandra is a design leader with 10+ years shaping product and service design across startups, scale-ups, and the public sector. Formerly Head of Design at Cazoo, MyTutor, and TPXImpact, she\'s known for translating business goals into clear direction for Tech and Design teams to drive growth, retention, and efficiency. Founder of Mega Mentor and Service Design-in\', she brings a collaborative, pragmatic, and user-centred approach to every challenge.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/AlessandraCanella.webp',
    workshop: null,
    talk: 'in-house-service-design-what-why-how',
  },
  {
    id: 'steve-upton',
    name: 'Steve Upton',
    title: 'Principal Consultant at Thoughtworks',
    bio: 'Steve is a Principal Quality Analyst at Thoughtworks who works to build empowered teams, capable of delivering and taking ownership of quality. He has worked on a wide variety of products, from mainframes to microservices and has a particular interest in complex socio-technical systems and how we work with them. He is passionate about complexity theory, building quality into culture and testing as part of continuous delivery in modern, distributed architectures. Outside of work, Steve enjoys travel and mountains.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/SteveUpton.webp',
    workshop: null,
    talk: 'faces-in-data',
  },
  {
    id: 'luke-hay',
    name: 'Luke Hay',
    title: 'Senior User Researcher at Clearleft',
    bio: 'Luke is the senior user researcher at Clearleft. He has 20+ years of experience working with clients to run user research. From kids to pensioners, dress-makers to body-builders, Luke has run research with participants from very different backgrounds. Over the past ten years, Luke has trained hundreds of people in getting reliable insight from their user research.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/LukeHay.webp',
    workshop: 'how-to-harness-ux-research-methods-to-help-you-build-great-experiences',
    talk: null
  },
  {
    id: 'soumaya-erradi',
    name: 'Soumaya Erradi',
    title: 'Senior Software Developer @ Atlantis',
    bio: '',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/SoumayaErradi.webp',
    workshop: 'learning-advanced-typescript-safer-code-step-by-step',
    talk: 'exploring-angulars-resource-api',
  },
  {
    id: 'orcdev',
    name: 'Orcdev',
    title: 'Software Engineer',
    bio: '15 years in the code mines. I build, I break, I conquer - all in orcish style. 🛠️🔥',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/OrcDev.webp',
    workshop: null,
    talk: 'building-8bitcn-retro-design-meets-modern-web-components',
  },
  {
    id: 'raff-di-meo',
    name: 'Raff Di Meo',
    title: 'Senior Principal UX Designer at Blue Yonder',
    bio: '',
    media: 'https://pub-8541e0f02cf24b9e8fb55faea3ace142.r2.dev/Speakers_www24/RaffFondoGris.webp',
    workshop: 'adopting-a-product-mindset',
    talk: null
  },
  {
    id: 'guillaume-vaslin',
    name: 'Guillaume Vaslin',
    title: 'Founder & Head of Design at ENNOstudio',
    bio: 'Guillaume is a French designer based in Berlin. Early in his career, he founded Eelusion, a game studio behind some of Europe\'s first augmented reality games. He later served as Managing Director at The European Magazine, where he led the creative direction until its acquisition by Weimar Media Group. He also participated in STARTUP Chile, launching two social ventures while working with prêt-à-porter brands across Latin America. Today, as the founder of ENNOstudio, Guillaume sees design as the bridge between technology and human needs. He focuses on making digital products more inclusive and accessible, collaborating with startups, enterprises, and universities across Europe.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/GuillaumeVaslin.webp',
    workshop: null,
    talk: 'from-tokyo-to-berlin-building-interfaces-that-make-sense-globally',
  },
  {
    id: 'ignacio-chicharro',
    name: 'Ignacio Chicharro',
    title: 'Development Technical Lead at Medida',
    bio: 'Ignacio is a Development Technical Lead with over 8 years of industry experience. He is dedicated to creating full-stack software systems with a special focus on performance and optimization. Outside work he is a passionate Sim Racing and gaming enthusiast.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/IgnacioChicharro.webp',
    workshop: null,
    talk: 'ai-engineering-supercharging-development-and-redefining-the-software-stack',
  },
  {
    id: 'xenia-melikhova',
    name: 'Xenia Melikhova',
    title: 'Frontend developer at TradingView',
    bio: 'Xenia is a frontend developer at TradingView, focused on complex user interfaces: editors, charts, and UI architecture. Interested in performance, scalability, and making complex things feel simple.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/%D0%9A%D1%81%D0%B5%D0%BD%D0%B8%D1%8F%D0%9C%D0%B5%D0%BB%D0%B8%D1%85%D0%BE%D0%B2%D0%B0.webp',
    workshop: null,
    talk: 'from-code-to-chart-rendering-user-logic-on-real-time-visuals',
  },
  {
    id: 'jenil-gogari',
    name: 'Jenil Gogari',
    title: 'Senior Product Designer at Datadog',
    bio: 'Jenil Gogari is a Senior Product Designer at Datadog where he leads design tooling and works on the design system DRUIDS by Datadog. Previously, Jenil worked as a UX designer at BookMyShow, India\'s largest entertainment ticketing platform. In the past, he made free website themes, a CSS framework, an icon delivery service and a Chrome extension. Jenil spends his time building tools and products that empower designers and developers to enhance the user experience.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/JenilGogari.webp',
    workshop: null,
    talk: 'our-design-system-is-too-popular-helping-our-product-teams-understand-its-only-the-foundation-in-a-multi-layered-platform',
  },
  {
    id: 'dima-malyshenko',
    name: 'Dima Malyshenko',
    title: 'Tech Entrepreneur, CTO, and Software Engineer',
    bio: 'Ukrainian entrepreneur, product strategist, and software engineer with 20+ years of experience. Now based in Berlin after stints in Kyiv and Moscow. Co-founder and former CTO of countX, a B2B fintech that went from first commit to exit in under four years; led product and engineering and built a high-velocity, autonomous team. Influenced by Marty Cagan and Teresa Torres, they champion outcome-driven, cross-functional teams and continuous deployment to deliver measurable impact. Currently pursuing an Executive MBA at London Business School focused on fintech and venture strategy.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/DimaMalyshenko.webp',
    workshop: null,
    talk: 'from-speed-to-value-continuous-discovery-and-deployment-in-practice',
  },
  {
    id: 'tamas-kokeny',
    name: 'Tamas Kokeny',
    title: 'Educator at Productkind',
    bio: 'Tamas is an enthusiastic software engineer with a background in product development, technical leadership, and education. He is an Educator at productkind, where he\'s currently building LittleParrot.app, a science-based microlearning platform for busy product people. He also teaches and creates educational content. As a serial entrepreneur, Tamas co-founded multiple ventures, including Bobcats Coding, a digital product studio. His career journey includes technical roles at companies such as Datadog, Cazoo, and Cloudera, where he spearheaded initiatives in software architecture design and led development teams. Beyond his technical contributions, Tamas is deeply committed to fostering talent and sharing knowledge. He served as the Head of Education and Co-Founder at Green Fox Academy, a programming bootcamp in Central Europe, where he managed international mentor teams, created educational content, and designed curricula.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/TamasKokeny.webp',
    workshop: 'build-your-ai-product-coach-a-hands-on-workshop-for-writing-impactful-user-stories',
    talk: 'the-infrastructure-gap-where-ai-falls-short-in-product-development',
  },
  {
    id: 'kinga-magyar',
    name: 'Kinga Magyar',
    title: 'Product Builder & Coach at Productkind',
    bio: 'Kinga is a curious product leader and founder of the education company productkind. She is currently building LittleParrot.app, a science-based microlearning platform for busy product people. Through her newsletter, she shares practical, hands-on advice to help product people grow their skills and mindset.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/KingaMagyar.webp',
    workshop: 'build-your-ai-product-coach-a-hands-on-workshop-for-writing-impactful-user-stories',
    talk: null
  },
  {
    id: 'salma-alam-naylor',
    name: 'Salma Alam-Naylor',
    title: 'Head of Developer Education at Nordcraft',
    bio: 'Salma writes code for your entertainment. She helps developers build cool stuff by writing blog posts, making videos, coding live on the internet, and publishing open source projects. After a career as a music teacher and comedian, Salma transitioned to technology in 2014, working as a front end developer and tech lead for startups, agencies and global e-commerce, moving to Developer Experience and Developer Education in 2021. She currently works for Nordcraft as Head of Developer Education. Active in the developer community, Salma is a GitHub Star, a former Microsoft MVP for Developer Technologies (2021-2025), winner of the Jamstack Conf Community Creator Award 2021, and a partnered Twitch streamer. She also makes videos on YouTube about tech and the history of The Internet.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/SalmaAlam-Naylor.png',
    workshop: null,
    talk: 'lost-in-translation-why-the-handoff-has-no-place-in-modern-software-design',
  },
  {
    id: 'andreas-moller',
    name: 'Andreas Møller',
    title: 'CEO and Co-Founder of Nordcraft',
    bio: 'Andreas spent 20 years building websites and apps before he finally started Nordcraft and built the design tool he always wanted.',
    media: 'https://pub-feb1369114e049dd80d0cf4ffe55d40e.r2.dev/speakers/AndreasMoller.webp',
    workshop: null,
    talk: 'lost-in-translation-why-the-handoff-has-no-place-in-modern-software-design',
  }
]

const talkInfo = [
  {
    speaker: 'Advait Sarkar',
    title: 'Why Would Anyone Visit a Website? Reflections on the Generative Shift in Human-Computer Experience',
    date: 'Tuesday 18 November',
    startTime: '17:15',
    endTime: '18:15',
    isoStart: '2025-11-18T17:15:00+01:00',
    isoEnd: '2025-11-18T18:15:00+01:00',
    description: 'The web is entering a transformative era shaped by artificial intelligence, redefining both how we build and how we experience it. AI is altering the cognitive landscape of knowledge work, affecting users\' critical thinking, memory, creativity, and metacognition. In programming, we now have “vibe coding,” where the boundaries between prototyping and production blur, as do traditional roles such as designer, engineer, and product manager. This fluidity may enable teams to collaborate across expertise like never before. At the same time, we are designing not only for humans but for AI agents: autonomous intermediaries that can bypass many traditional UX constraints. This raises a serious question: If agents can dynamically adapt interfaces and solve interaction problems on the fly, why would anyone visit a website or use an app directly? The answer lies in vision. Future web services must deliver experiences that cannot be intermediated; core experiential primitives that take inspiration from games, music, or film. In this keynote, I argue that the defining skill for the next generation of web creators is not technical execution but artistic foresight: the ability to imagine what users cannot yet conceive.',
    id: 'why-would-anyone-visit-a-website-reflections-on-the-generative-shift-in-human-computer-experience',
    room: 'Main Hall',
    level: 'Everyone',
  },
  {
    speaker: 'Shelley Vohr',
    title: 'Trash Talk - Understanding Memory Management',
    date: 'Tuesday 18 November',
    startTime: '10:50',
    endTime: '11:30',
    isoStart: '2025-11-18T10:50:00+01:00',
    isoEnd: '2025-11-18T11:30:00+01:00',
    description: 'When we think about JavaScript and Node.js, it\'s not often most of us are required to consider memory management and allocation. In this talk, we\'ll jump right into the landfill and get a little dirty as we try to understand how Node.js manages memory with Google\'s V8 runtime engine. What types of garbage collection are there, and how and when are they used? We\'ll also explore some of the issues that mismanaged memory can cause, and how they were eventually solved using examples from Node.js and its consumers and embedders like Electron. Memory management is closer to the surface than you might think, so we\'ll also discuss how to see and create memory issues right from JavaScript. You\'ll leave with a deeper understanding of the mechanics underlying the web\'s most ubiquitous language, as well as tips to avoid pitfalls you might not even realize exist!',
    id: 'trash-talk-understanding-memory-management',
    room: 'Main Hall',
    level: 'Intermediate',
  },
  {
    speaker: 'Cyd Stumpel',
    title: 'You Might not Need JS',
    date: 'Tuesday 18 November',
    startTime: '15:45',
    endTime: '16:20',
    isoStart: '2025-11-18T15:45:00+01:00',
    isoEnd: '2025-11-18T16:20:00+01:00',
    description: 'Motion on the web has come full circle: from simple CSS animations and transitions, to JavaScript libraries, and now back to CSS again. With the View Transitions API and Scroll-Driven Animations we\'ll explore how modern CSS is reshaping creative development today and where you can replace JS with CSS solutions.',
    id: 'you-might-not-need-js',
    room: 'Main Hall',
    level: 'Intermediate',
  },
  {
    speaker: 'Candi Williams',
    title: 'The Secret Sauce of Great UX',
    date: 'Tuesday 18 November',
    startTime: '16:30',
    endTime: '17:05',
    isoStart: '2025-11-18T16:30:00+01:00',
    isoEnd: '2025-11-18T17:05:00+01:00',
    description: 'Good, helpful, useful, readable content is at the heart of good design. So, why is it so often seen as an afterthought? This talk hones in on how we can change that, delving into linguistics and examples to highlight why real content is crucial and how UX design and content people can work together to create the most meaningful designs—even when your content designers are stretched thin (or are non-existent at your org!).',
    id: 'the-secret-sauce-of-great-ux',
    room: 'Main Hall',
    level: 'Everyone',
  },
  {
    speaker: 'Piccia Neri',
    title: 'The Best Creative Brief',
    date: 'Monday 17 November',
    startTime: '18:45',
    endTime: '19:30',
    isoStart: '2025-11-17T18:45:00+01:00',
    isoEnd: '2025-11-17T19:30:00+01:00',
    description: 'Accessibility is the best creative brief you\'ll ever get: constraints fuel innovation. This talk shows why accessibility isn’t restrictive—it’s a catalyst for more innovative, inclusive, and impactful design.',
    id: 'the-best-creative-brief',
    room: 'Main Hall',
    level: 'Everyone',
  },
  {
    speaker: 'Alessandra Canella',
    title: 'In-house Service Design - What, Why, How',
    date: 'Monday 17 November',
    startTime: '18:00',
    endTime: '18:35',
    isoStart: '2025-11-17T18:00:00+01:00',
    isoEnd: '2025-11-17T18:35:00+01:00',
    description: 'Successfully embedding service design thinking in-house goes beyond hiring service designers. We will explore how different companies are doing it, and what are the risks, failures and successes to learn from.',
    id: 'in-house-service-design-what-why-how',
    room: 'Main Hall',
    level: 'Everyone',
  },
  {
    speaker: 'Steve Upton',
    title: 'Faces in Data',
    date: 'Tuesday 18 November',
    startTime: '09:00',
    endTime: '09:40',
    isoStart: '2025-11-18T09:00:00+01:00',
    isoEnd: '2025-11-18T09:40:00+01:00',
    description: 'What can we learn from User Interfaces in Sci-Fi? What happens when we try to build some of them? This talk will look at examples of User Interfaces from science fiction and what we learn when we actually try to build them. We\'ll also take a deep dive into a novel method for visualising data using faces and how learning from it can help us design useful, insightful interfaces of our own.',
    id: 'faces-in-data',
    room: 'Main Hall',
    level: 'Everyone',
  },
  {
    speaker: 'Soumaya Erradi',
    title: 'Exploring Angular\'s Resource API',
    date: 'Tuesday 18 November',
    startTime: '10:00',
    endTime: '10:40',
    isoStart: '2025-11-18T10:00:00+01:00',
    isoEnd: '2025-11-18T10:40:00+01:00',
    description: 'Angular’s Resource API is a powerful tool for building RESTful APIs in Angular. In this talk, we\'ll explore how to use the Resource API to build a RESTful API in Angular. We\'ll look at how to use the Resource API to create, read, update, and delete resources. We\'ll also look at how to use the Resource API to handle errors and pagination.',
    id: 'exploring-angulars-resource-api',
    room: 'Main Hall',
    level: 'Intermediate',
  },
  {
    speaker: 'Orcdev',
    title: 'Building 8bitcn: Retro Design Meets Modern Web Components',
    date: 'Tuesday 18 November',
    startTime: '11:40',
    endTime: '12:20',
    isoStart: '2025-11-18T11:40:00+01:00',
    isoEnd: '2025-11-18T12:20:00+01:00',
    description: 'What happens when nostalgia for 8-bit aesthetics meets modern component libraries? In this talk, I\'ll share the story of how I created 8bitcn, an open-source library inspired by retro design but built with today\'s best practices. From the first idea to becoming part of the Vercel Open Source Program, you\'ll see how design, code, and community came together in one project.',
    id: 'building-8bitcn-retro-design-meets-modern-web-components',
    room: 'Main Hall',
    level: 'Everyone',
  },
  {
    speaker: 'Guillaume Vaslin',
    title: 'From Tokyo to Berlin: Building Interfaces That Make Sense Globally',
    date: 'Tuesday 18 November',
    startTime: '12:30',
    endTime: '13:05',
    isoStart: '2025-11-18T12:30:00+01:00',
    isoEnd: '2025-11-18T13:05:00+01:00',
    description: 'Findings from cross-cultural research across Japan and Western Europe that challenge “universal” UI assumptions, and practices for building interfaces that work across cultures and generations.',
    id: 'from-tokyo-to-berlin-building-interfaces-that-make-sense-globally',
    room: 'Main Hall',
    level: 'Everyone',
  },
  {
    speaker: 'Ignacio Chicharro',
    title: 'AI Engineering: Supercharging Development and Redefining the Software Stack',
    date: 'Tuesday 18 November',
    startTime: '14:30',
    endTime: '14:50',
    isoStart: '2025-11-18T14:30:00+01:00',
    isoEnd: '2025-11-18T14:50:00+01:00',
    description: 'A developer-focused introduction to AI Engineering: prompt techniques for requirements and robust code, handling LLM hallucinations, and structuring SDDs for LLMs; plus when and how to integrate AI as a core layer alongside frontend and backend.',
    id: 'ai-engineering-supercharging-development-and-redefining-the-software-stack',
    room: 'Main Hall',
    level: 'Intermediate',
  },
  {
    speaker: 'Xenia Melikhova',
    title: 'From Code to Chart: Rendering User Logic on Real-Time Visuals',
    date: 'Tuesday 18 November',
    startTime: '15:00',
    endTime: '15:35',
    isoStart: '2025-11-18T15:00:00+01:00',
    isoEnd: '2025-11-18T15:35:00+01:00',
    description: 'Designing a browser-based system that renders tens of thousands of live elements responsively, and safely turning user-written code into part of the UI.',
    id: 'from-code-to-chart-rendering-user-logic-on-real-time-visuals',
    room: 'Main Hall',
    level: 'Intermediate',
  },
  {
    speaker: 'Jenil Gogari',
    title: 'Our Design System is too Popular: Helping our Product Teams Understand it\'s only the Foundation in a Multi-Layered Platform',
    date: 'Monday 17 November',
    startTime: '15:45',
    endTime: '16:20',
    isoStart: '2025-11-17T15:45:00+01:00',
    isoEnd: '2025-11-17T16:20:00+01:00',
    description: 'Our design system, DRUIDS, serves as the foundational layer for Datadog\'s 20+ products. While highly adopted, this popularity leads to the misconception that every shared UI component belongs to DRUIDS. The reality is a multi-layered approach: product teams build higher-level "kits" that enrich DRUIDS components in product-specific ways. This talk will explore how this technical setup operates in both design tools and codebase, its benefits, and the challenges of guiding designers and engineers in this nuanced ecosystem. We will demonstrate how a multi-layered design system enables organic platform scaling while maintaining a consistent user experience.',
    id: 'our-design-system-is-too-popular-helping-our-product-teams-understand-its-only-the-foundation-in-a-multi-layered-platform',
    room: 'Main Hall',
    level: 'Intermediate',
  },
  {
    speaker: 'Dima Malyshenko',
    title: 'From Speed to Value, Continuous Discovery and Deployment in Practice',
    date: 'Monday 17 November',
    startTime: '16:30',
    endTime: '17:05',
    isoStart: '2025-11-17T16:30:00+01:00',
    isoEnd: '2025-11-17T17:05:00+01:00',
    description: 'A real case study of a B2B fintech that went from first commit to a successful exit in under four years by pairing continuous deployment with continuous discovery and an operating rhythm that enabled shipping multiple times per day.',
    id: 'from-speed-to-value-continuous-discovery-and-deployment-in-practice',
    room: 'Main Hall',
    level: 'Everyone',
  },
  {
    speaker: 'Tamas Kokeny',
    title: 'The Infrastructure Gap: Where AI Falls Short in Product Development',
    date: 'Monday 17 November',
    startTime: '17:15',
    endTime: '17:50',
    isoStart: '2025-11-17T17:15:00+01:00',
    isoEnd: '2025-11-17T17:50:00+01:00',
    description: 'While AI tools revolutionize rapid prototyping in product development, they haven\'t yet solved the fundamental infrastructure challenges of production systems. This talk examines two critical areas where traditional engineering investment remains essential: sophisticated user behavior analytics and complex feature management systems. We\'ll explore why measuring user behavior beyond basic metrics requires custom infrastructure to answer nuanced business questions, and how feature flipper systems must handle intricate combinations of internal and external factors. Through practical examples, we\'ll demonstrate how to build these essential infrastructures cost-effectively at both early-stage and scale, enabling teams to maintain agility while growing their analytical capabilities. Product teams will learn why these infrastructure investments remain necessary despite AI advances, and how to balance AI-driven innovation with lean, scalable system architecture.',
    id: 'the-infrastructure-gap-where-ai-falls-short-in-product-development',
    room: 'Main Hall',
    level: 'Intermediate',
  },
  {
    speaker: 'Salma Alam-Naylor',
    title: 'Lost in Translation: Why the Handoff Has No Place in Modern Software Design',
    date: 'Monday 17 November',
    startTime: '14:30',
    endTime: '15:30',
    isoStart: '2025-11-17T14:30:00+01:00',
    isoEnd: '2025-11-17T15:30:00+01:00',
    description: 'For too long, product teams have accepted the handoff between design and development as a necessary step. But every handoff introduces translation, and with it comes compromise, delay, and diluted intent. What if designers could fully own the path from idea to implementation? This talk explores what a future without design-to-development handoffs could look like. By empowering designers to directly implement their own work, teams can aspire to faster iteration cycles, stronger creative ownership, and products that more faithfully reflect their original vision. This is not just a workflow improvement, it\'s a call to rethink how great digital products get made.',
    id: 'lost-in-translation-why-the-handoff-has-no-place-in-modern-software-design',
    room: 'Main Hall',
    level: 'Everyone',
  },
  {
    speaker: 'Andreas Møller',
    title: 'Lost in Translation: Why the Handoff Has No Place in Modern Software Design',
    date: 'Monday 17 November',
    startTime: '14:30',
    endTime: '15:30',
    isoStart: '2025-11-17T14:30:00+01:00',
    isoEnd: '2025-11-17T15:30:00+01:00',
    description: 'For too long, product teams have accepted the handoff between design and development as a necessary step. But every handoff introduces translation, and with it comes compromise, delay, and diluted intent. What if designers could fully own the path from idea to implementation? This talk explores what a future without design-to-development handoffs could look like. By empowering designers to directly implement their own work, teams can aspire to faster iteration cycles, stronger creative ownership, and products that more faithfully reflect their original vision. This is not just a workflow improvement, it\'s a call to rethink how great digital products get made.',
    id: 'lost-in-translation-why-the-handoff-has-no-place-in-modern-software-design',
    room: 'Main Hall',
    level: 'Everyone',
  },
]

const workshopInfo = [
  {
    speaker: 'Cyd Stumpel',
    title: 'Adding Cohesive Animations to Websites',
    date: 'Monday 17 November',
    startTime: '09:00',
    endTime: '13:00',
    isoStart: '2025-11-17T09:00:00+01:00',
    isoEnd: '2025-11-17T13:00:00+01:00',
    description: 'Animation can delight your users, give attention to important information and help users to better understand tasks. Finding the balance between too little and too much animation and making your animations suitable to your project is a difficult task. Creating a motion language can help with this. In this workshop I\'ll teach you techniques to create, and implement a cohesive motion language for your projects with code. We\'ll look at shapes, direction, durations and ease. Focussing on loading-, interaction-, scroll- and page animations.',
    id: 'adding-cohesive-animations-to-websites',
    room: 'Pixel Room',
    level: 'Everyone',
  },
  {
    speaker: 'Piccia Neri',
    title: 'Colour and Contrast for Accessibility',
    date: 'Monday 17 November',
    startTime: '09:00',
    endTime: '13:00',
    isoStart: '2025-11-17T09:00:00+01:00',
    isoEnd: '2025-11-17T13:00:00+01:00',
    description: 'Fix the number one accessibility issue on the web, and make your UI look better doing it. Low contrast and sloppy color choices quietly tank readability, conversions, and trust. This workshop cuts the jargon and shows you how to design and ship accessible color and contrast with confidence. You\'ll learn to build beautiful, compliant palettes that scale across components and states; use typography and layout to boost contrast beyond color alone; and turn standards into practical checks your team can actually follow—plus the tools and workflow to test, iterate, and ship fast.',
    id: 'colour-and-contrast-for-accessibility',
    room: 'A11Y Room',
    level: 'Everyone',
  },
  {
    speaker: 'Luke Hay',
    title: 'How to Harness UX Research Methods to Help you Build Great Experiences',
    date: 'Tuesday 18 November',
    startTime: '09:00',
    endTime: '11:30',
    isoStart: '2025-11-18T09:00:00+01:00',
    isoEnd: '2025-11-18T11:30:00+01:00',
    description: 'Learn how to select and apply the most effective user research methods for your design challenges. In this interactive two-hour workshop, you\'ll learn how to choose user research methods that inform design decisions and improve usability. Whether you\'re looking to run research yourself or want to be more informed so that you can input into research planning, this workshop will help you understand the available options and how they can help you overcome design and development challenges. Through live demonstrations and collaborative exercises, we\'ll demystify how research insights can guide interface design, prevent costly rework, and enhance the user experience.',
    id: 'how-to-harness-ux-research-methods-to-help-you-build-great-experiences',
    room: 'A11Y Room',
    level: 'Everyone',
  },
  {
    speaker: 'Soumaya Erradi',
    title: 'Learning Advanced TypeScript: Safer Code Step by Step',
    date: 'Monday 17 November',
    startTime: '15:45',
    endTime: '18:35',
    isoStart: '2025-11-17T15:45:00+01:00',
    isoEnd: '2025-11-17T18:35:00+01:00',
    description: 'Modern TypeScript turns runtime surprises into compile-time feedback using strict mode, discriminated unions, template literal types, satisfies, and more. Encode domain rules directly in types to make APIs harder to misuse and refactors safer, with a practical toolkit you can apply immediately.',
    id: 'learning-advanced-typescript-safer-code-step-by-step',
    room: 'A11Y Room',
    level: 'Advanced',
  },
  {
    speaker: 'Raff Di Meo',
    title: 'Adopting a Product Mindset',
    date: 'Tuesday 18 November',
    startTime: '11:40',
    endTime: '13:05',
    isoStart: '2025-11-18T11:40:00+01:00',
    isoEnd: '2025-11-18T13:05:00+01:00',
    description: 'As AI takes over manual tasks, our value will shift towards insight, creativity, and strategy. This session helps you cultivate a product mindset and contribute earlier in product development via hands-on activities: analyse a brief, create personas, map journeys, and generate solutions.',
    id: 'adopting-a-product-mindset',
    room: 'A11Y Room',
    level: 'Everyone',
  },
  {
    speaker: 'Tamas Kokeny',
    title: 'Build Your AI Product Coach: A Hands-on Workshop for Writing Impactful User Stories',
    date: 'Tuesday 18 November',
    startTime: '14:30',
    endTime: '16:20',
    isoStart: '2025-11-18T14:30:00+01:00',
    isoEnd: '2025-11-18T16:20:00+01:00',
    description: 'Hands-on workshop to build an AI product coach that challenges assumptions, surfaces edge cases, and helps you slice user stories; a framework you can reuse beyond stories.',
    id: 'build-your-ai-product-coach-a-hands-on-workshop-for-writing-impactful-user-stories',
    room: 'Main Hall',
    level: 'Everyone',
  },
  {
    speaker: 'Kinga Magyar',
    title: 'Build Your AI Product Coach: A Hands-on Workshop for Writing Impactful User Stories',
    date: 'Tuesday 18 November',
    startTime: '14:30',
    endTime: '16:20',
    isoStart: '2025-11-18T14:30:00+01:00',
    isoEnd: '2025-11-18T16:20:00+01:00',
    description: 'Co-facilitated with Tamas Kokeny; build a customised AI product coach and learn techniques to apply AI collaboration to broader product workflows.',
    id: 'build-your-ai-product-coach-a-hands-on-workshop-for-writing-impactful-user-stories',
    room: 'Main Hall',
    level: 'Everyone',
  }
]

const schedule = {
  day1: [
    {
      startTime: '08:30',
      endTime: '09:00',
      isoStart: '2025-11-17T08:30:00+01:00',
      isoEnd: '2025-11-17T09:00:00+01:00',
      shortTitle: 'Registration',
      longTitle: 'Registration',
      description: 'Registration at La Termica',
      room: 'Pixel Room',
      type: 'registration',
      level: null,
      id: 'registration'
    },
    {
      startTime: '09:00',
      endTime: '13:00',
      isoStart: '2025-11-17T09:00:00+01:00',
      isoEnd: '2025-11-17T13:00:00+01:00',
      shortTitle: 'Adding Cohesive Animations to Websites',
      longTitle: 'Adding Cohesive Animations to Websites',
      speaker: 'Cyd Stumpel',
      room: 'Pixel Room',
      type: 'workshop',
      level: 'Everyone',
      id: 'adding-cohesive-animations-to-websites'
    },
    {
      startTime: '09:00',
      endTime: '13:00',
      isoStart: '2025-11-17T09:00:00+01:00',
      isoEnd: '2025-11-17T13:00:00+01:00',
      shortTitle: 'Colour and Contrast for Accessibility',
      longTitle: 'Colour and Contrast for Accessibility',
      speaker: 'Piccia Neri',
      room: 'A11Y Room',
      type: 'workshop',
      level: 'Everyone',
      id: 'colour-and-contrast-for-accessibility'
    },
    {
      startTime: '13:00',
      endTime: '14:30',
      isoStart: '2025-11-17T13:00:00+01:00',
      isoEnd: '2025-11-17T14:30:00+01:00',
      shortTitle: 'Registration & Lunch',
      longTitle: 'Registration & Lunch', room: 'Main Hall',
      type: 'lunch',
      level: null,
      id: 'lunch'
    },
    {
      startTime: '14:30',
      endTime: '15:30',
      isoStart: '2025-11-17T14:30:00+01:00',
      isoEnd: '2025-11-17T15:30:00+01:00',
      shortTitle: 'Lost in Translation',
      longTitle: 'Lost in Translation: Why the Handoff Has No Place in Modern Software Design',
      speaker: 'Salma Alam-Naylor & Andreas Møller',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'lost-in-translation-why-the-handoff-has-no-place-in-modern-software-design'
    },
    {
      startTime: '15:45',
      endTime: '16:20',
      isoStart: '2025-11-17T15:45:00+01:00',
      isoEnd: '2025-11-17T16:20:00+01:00',
      shortTitle: 'Our Design System is too Popular',
      longTitle: 'Our Design System is too Popular: Helping our Product Teams Understand it\'s only the Foundation in a Multi-Layered Platform',
      speaker: 'Jenil Gogari',
      room: 'Main Hall',
      type: 'talk',
      level: 'Intermediate',
      id: 'our-design-system-is-too-popular-helping-our-product-teams-understand-its-only-the-foundation-in-a-multi-layered-platform'
    },
    {
      startTime: '15:45',
      endTime: '18:30',
      isoStart: '2025-11-17T15:45:00+01:00',
      isoEnd: '2025-11-17T18:30:00+01:00',
      shortTitle: 'Learning Advanced TypeScript',
      longTitle: 'Learning Advanced TypeScript: Safer Code Step by Step',
      speaker: 'Soumaya Erradi',
      room: 'A11Y Room',
      type: 'workshop',
      level: 'Advanced',
      id: 'learning-advanced-typescript-safer-code-step-by-step'
    },
    {
      startTime: '16:30',
      endTime: '17:05',
      isoStart: '2025-11-17T16:30:00+01:00',
      isoEnd: '2025-11-17T17:05:00+01:00',
      shortTitle: 'From Speed to Value',
      longTitle: 'From Speed to Value, Continuous Discovery and Deployment in Practice',
      speaker: 'Dima Malyshenko',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'from-speed-to-value-continuous-discovery-and-deployment-in-practice'
    },
    {
      startTime: '17:15',
      endTime: '17:50',
      isoStart: '2025-11-17T17:15:00+01:00',
      isoEnd: '2025-11-17T17:50:00+01:00',
      shortTitle: 'The Infrastructure Gap',
      longTitle: 'The Infrastructure Gap: Where AI Falls Short in Product Development',
      speaker: 'Tamas Kokeny',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'the-infrastructure-gap-where-ai-falls-short-in-product-development'
    },
    {
      startTime: '18:00',
      endTime: '18:35',
      isoStart: '2025-11-17T18:00:00+01:00',
      isoEnd: '2025-11-17T18:35:00+01:00',
      shortTitle: 'In-house Service Design',
      longTitle: 'In-house Service Design - What, Why, How',
      speaker: 'Alessandra Canella',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'in-house-service-design-what-why-how'
    },
    {
      startTime: '18:45',
      endTime: '19:30',
      isoStart: '2025-11-17T18:45:00+01:00',
      isoEnd: '2025-11-17T19:30:00+01:00',
      shortTitle: 'The Best Creative Brief',
      longTitle: 'The Best Creative Brief',
      speaker: 'Piccia Neri',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'the-best-creative-brief'
    },
    {
      startTime: '21:30',
      endTime: '24:00',
      isoStart: '2025-11-17T21:30:00+01:00',
      isoEnd: '2025-11-18T00:00:00+01:00',
      shortTitle: 'Karaoke time',
      longTitle: 'Karaoke time',
      room: 'Main Hall',
      type: 'karaoke',
    }
  ],
  day2: [
    {
      startTime: '08:00',
      endTime: '09:00',
      isoStart: '2025-11-18T08:00:00+01:00',
      isoEnd: '2025-11-18T09:00:00+01:00', shortTitle: 'Morning Coffee',
      longTitle: 'Morning Coffee',
      room: 'Main Hall',
      type: 'coffee',
      level: null,
      id: 'morning-coffee'
    },
    {
      startTime: '09:00',
      endTime: '09:40',
      isoStart: '2025-11-18T09:00:00+01:00',
      isoEnd: '2025-11-18T09:40:00+01:00',
      shortTitle: 'Faces in Data',
      longTitle: 'Faces in Data',
      speaker: 'Steve Upton',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'faces-in-data'
    },
    {
      startTime: '09:00',
      endTime: '11:30',
      isoStart: '2025-11-18T09:00:00+01:00',
      isoEnd: '2025-11-18T11:30:00+01:00',
      shortTitle: 'How to Harness UX Research Methods',
      longTitle: 'How to Harness UX Research Methods to Help you Build Great Experiences',
      speaker: 'Luke Hay',
      room: 'A11Y Room',
      type: 'workshop',
      level: 'Everyone',
      id: 'how-to-harness-ux-research-methods-to-help-you-build-great-experiences'
    },
    {
      startTime: '10:00',
      endTime: '10:40',
      isoStart: '2025-11-18T10:00:00+01:00',
      isoEnd: '2025-11-18T10:40:00+01:00',
      shortTitle: 'Exploring Angular\'s Resource API',
      longTitle: 'Exploring Angular\'s Resource API',
      speaker: 'Soumaya Erradi',
      room: 'Main Hall',
      type: 'talk',
      level: 'Intermediate',
      id: 'exploring-angulars-resource-api'
    },
    {
      startTime: '10:50',
      endTime: '11:30',
      isoStart: '2025-11-18T10:50:00+01:00',
      isoEnd: '2025-11-18T11:30:00+01:00',
      shortTitle: 'Trash Talk',
      longTitle: 'Trash Talk - Understanding Memory Management',
      speaker: 'Shelley Vohr',
      room: 'Main Hall',
      type: 'talk',
      level: 'Intermediate',
      id: 'trash-talk-understanding-memory-management'
    },
    {
      startTime: '11:40',
      endTime: '12:20',
      isoStart: '2025-11-18T11:40:00+01:00',
      isoEnd: '2025-11-18T12:20:00+01:00',
      shortTitle: 'Building 8bitcn',
      longTitle: 'Building 8bitcn: Retro Design Meets Modern Web Components',
      speaker: 'Orcdev',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'building-8bitcn-retro-design-meets-modern-web-components'
    },
    {
      startTime: '11:40',
      endTime: '13:05',
      isoStart: '2025-11-18T11:40:00+01:00',
      isoEnd: '2025-11-18T13:05:00+01:00',
      shortTitle: 'Adopting a Product Mindset',
      longTitle: 'Adopting a Product Mindset',
      speaker: 'Raff Di Meo',
      room: 'A11Y Room',
      type: 'workshop',
      level: 'Everyone',
      id: 'adopting-a-product-mindset'
    },
    {
      startTime: '12:30',
      endTime: '13:05',
      isoStart: '2025-11-18T12:30:00+01:00',
      isoEnd: '2025-11-18T13:05:00+01:00',
      shortTitle: 'From Tokyo to Berlin',
      longTitle: 'From Tokyo to Berlin: Building Interfaces That Make Sense Globally',
      speaker: 'Guillaume Vaslin',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'from-tokyo-to-berlin-building-interfaces-that-make-sense-globally'
    },
    {
      startTime: '13:05',
      endTime: '14:30',
      isoStart: '2025-11-18T13:05:00+01:00',
      isoEnd: '2025-11-18T14:30:00+01:00',
      shortTitle: 'Lunch Break',
      longTitle: 'Lunch Break', room: 'Main Hall',
      type: 'lunch',
      level: null,
      id: 'lunch-break'
    },
    {
      startTime: '14:30',
      endTime: '14:50',
      isoStart: '2025-11-18T14:30:00+01:00',
      isoEnd: '2025-11-18T14:50:00+01:00',
      shortTitle: 'AI Engineering',
      longTitle: 'AI Engineering: Supercharging Development and Redefining the Software Stack',
      speaker: 'Ignacio Chicharro',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'ai-engineering-supercharging-development-and-redefining-the-software-stack'
    },
    {
      startTime: '14:30',
      endTime: '16:20',
      isoStart: '2025-11-18T14:30:00+01:00',
      isoEnd: '2025-11-18T15:35:00+01:00',
      shortTitle: 'Build Your AI Product Coach',
      longTitle: 'Build Your AI Product Coach: A Hands-on Workshop for Writing Impactful User Stories',
      speaker: 'Tamas Kokeny & Kinga Magyar',
      room: 'A11Y Room',
      type: 'workshop',
      level: 'Everyone',
      id: 'build-your-ai-product-coach-a-hands-on-workshop-for-writing-impactful-user-stories'
    },
    {
      startTime: '15:00',
      endTime: '15:35',
      isoStart: '2025-11-18T15:00:00+01:00',
      isoEnd: '2025-11-18T15:35:00+01:00',
      shortTitle: 'From Code to Chart',
      longTitle: 'From Code to Chart: Rendering User Logic on Real-Time Visuals',
      speaker: 'Xenia Melikhova',
      room: 'Main Hall',
      type: 'talk',
      level: 'Intermediate',
      id: 'from-code-to-chart-rendering-user-logic-on-real-time-visuals'
    },
    {
      startTime: '15:45',
      endTime: '16:20',
      isoStart: '2025-11-18T15:45:00+01:00',
      isoEnd: '2025-11-18T16:20:00+01:00',
      shortTitle: 'You Might not Need JS',
      longTitle: 'You Might not Need JS',
      speaker: 'Cyd Stumpel',
      room: 'Main Hall',
      type: 'talk',
      level: 'Intermediate',
      id: 'you-might-not-need-js'
    },
    {
      startTime: '16:30',
      endTime: '17:05',
      isoStart: '2025-11-18T16:30:00+01:00',
      isoEnd: '2025-11-18T17:05:00+01:00',
      shortTitle: 'The Secret Sauce of Great UX',
      longTitle: 'The Secret Sauce of Great UX',
      speaker: 'Candi Williams',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'the-secret-sauce-of-great-ux'
    },
    {
      startTime: '17:15',
      endTime: '18:15',
      isoStart: '2025-11-18T17:15:00+01:00',
      isoEnd: '2025-11-18T18:15:00+01:00',
      shortTitle: 'Why Would Anyone Visit a Website?',
      longTitle: 'Why Would Anyone Visit a Website? Reflections on the Generative Shift in Human-Computer Experience',
      speaker: 'Advait Sarkar',
      room: 'Main Hall',
      type: 'talk',
      level: 'Everyone',
      id: 'why-would-anyone-visit-a-website-reflections-on-the-generative-shift-in-human-computer-experience'
    },
    {
      startTime: '18:15',
      endTime: '18:30',
      isoStart: '2025-11-18T18:15:00+01:00',
      isoEnd: '2025-11-18T18:30:00+01:00',
      shortTitle: 'Farewell',
      longTitle: 'Farewell', room: 'Main Hall',
      type: 'farewell',
      level: null,
      id: 'farewell'
    },
  ]
}

// Function to generate speaker pages
function generateSpeakerPages() {
  const templatePath = join(__dirname, 'wey-wey-web', 'speakers', 'template.html')
  const template = readFileSync(templatePath, 'utf8')

  speakers.forEach(speaker => {
    const speakerSlug = speaker.id
    const firstName = speaker.name.split(' ')[0].toLowerCase()
    const events = createEventsList(speaker)

    let content = template
      .replace(/{ speaker name }/g, speaker.name)
      .replace(/{ speaker bio }/g, speaker.bio)
      .replace(/{ speaker media }/g, speaker.media)
      .replace(/{ speaker title }/g, speaker.title)
      .replace(/{ speaker name replace spaces with dash }/g, speakerSlug)
      .replace(/{ first name }/g, firstName)
      .replace(/{ events }/g, events)

    const outputPath = join(__dirname, 'wey-wey-web', 'speakers', `${speakerSlug}`, `index.html`)
    mkdirSync(join(__dirname, 'wey-wey-web', 'speakers', `${speakerSlug}`), { recursive: true })
    writeFileSync(outputPath, content)
    console.log(`Generated ${speakerSlug}.html`)
  })
}

// Run the generator
generateSpeakerPages()

// Function to generate speaker pages
function generateIndexPage() {
  const templatePath = join(__dirname, 'wey-wey-web', 'template.html')
  const template = readFileSync(templatePath, 'utf8')

  const speakersList = speakers.map(speaker => {
    return `
      <div class="speaker-card" style="--vt: ${speaker.id}">
        ${getSpeakerMedia(speaker.name, true)}
        <a href="speakers/${speaker.id}">
        <h3 class="small-heading">${speaker.name}</h3>
        <p class="xsmall-body tabular">${speaker.title}</p>
        </a>
      </div>`
  }).join('')

  const startTimeDay1 = '08:30'
  const endTimeDay1 = '24:00'


  const diff5MinutesDay1 = timeDiff(startTimeDay1, endTimeDay1, 5)
  const rowsDay1 = diff5MinutesDay1

  const schedule1 = schedule.day1.map(item => {
    const startCol = timeDiff(startTimeDay1, item.startTime, 5) + 1
    const endCol = startCol + timeDiff(item.startTime, item.endTime, 5)
    return createScheduleItem(item, startCol, endCol)
  }).join('')
  const diff30MinutesDay1 = timeDiff(startTimeDay1, endTimeDay1, 30)
  const timeLabelsDay1 = Array.from({ length: diff30MinutesDay1 + 1 }, (_, i) => {
    const time = new Date(`2025-01-01T${startTimeDay1}:00`)
    time.setMinutes(time.getMinutes() + (i) * 30)
    const timeString = time.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })

    return `
      <div class="time-label" style="--start-row: ${i * 6 + 1}; --end-row: ${i * 6 + 6};">
        <p>${timeString}</p>
      </div>`
  }).join('')

  const schedule1Container = `
    <div class="schedule-track" style="--grid-rows: ${rowsDay1 + 1}">
      ${timeLabelsDay1}
      <hr>
      ${schedule1}
    </div>
    `

  const startTimeDay2 = '08:00'
  const endTimeDay2 = '18:30'
  const diff5MinutesDay2 = timeDiff(startTimeDay2, endTimeDay2, 5)
  const rowsDay2 = diff5MinutesDay2

  const schedule2 = schedule.day2.map(item => {
    const startCol = timeDiff(startTimeDay2, item.startTime, 5) + 1
    const endCol = startCol + timeDiff(item.startTime, item.endTime, 5)
    return createScheduleItem(item, startCol, endCol)
  }).join('')

  const diff30MinutesDay2 = timeDiff(startTimeDay2, endTimeDay2, 30)
  const timeLabelsDay2 = Array.from({ length: diff30MinutesDay2 + 1 }, (_, i) => {
    const time = new Date(`2025-01-01T${startTimeDay2}:00`)
    time.setMinutes(time.getMinutes() + (i) * 30)
    const timeString = time.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })

    return `
      <div class="time-label" style="--start-row: ${i * 6 + 1}; --end-row: ${i * 6 + 6};">
        <p>${timeString}</p>
      </div>`
  }).join('')

  const schedule2Container = `
    <div class="schedule-track" style="--grid-rows: ${rowsDay2 + 1}">
      ${timeLabelsDay2}
      <hr>
      ${schedule2}
    </div>
    `

  let content = template
    .replace(/{ speakers }/g, speakersList)
    .replace(/{ schedule-1 }/g, schedule1Container)
    .replace(/{ schedule-2 }/g, schedule2Container)


  const outputPath = join(__dirname, 'wey-wey-web', 'index.html')
  writeFileSync(outputPath, content)
  console.log(`Generated index.html`)

}

// Run the generator
generateIndexPage()



