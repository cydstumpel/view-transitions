import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdirSync } from 'node:fs'
/**
 * Fronteers 2026 — speakers, talks, and schedule scraped from https://fronteersconf.org/schedule/
 * Speaker photos: local PNGs in fronteers/assets/img/, named by first name (lowercase).
 */

const __dirname = dirname(fileURLToPath(import.meta.url))
const speakerImg = (firstName) => `./assets/img/speakers/${firstName}.jpg`

export const DarkSVG = `
<svg width="732" height="146" viewBox="0 0 732 146" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="e" d="M703.941 143.147L679.891 95.0463H657.644V143.147H631.99V2.85281H680.091C693.987 2.85281 705.812 7.72971 715.566 17.4835C725.319 27.2373 730.196 39.0621 730.196 52.9579C730.196 60.4403 727.925 67.7891 723.382 75.0042C718.839 82.2193 712.826 87.6975 705.344 91.4387L732 143.147H703.941ZM657.644 26.7029V70.9958H695.123C701.135 66.3193 704.142 59.839 704.142 51.555C704.142 44.3399 701.737 38.3941 696.926 33.7176C692.116 29.0411 686.505 26.7029 680.091 26.7029H657.644Z" fill="currentColor"/>
<path class="r" d="M537.872 119.097H604.011V143.147H511.817V2.85281H602.007V26.9033H537.872V60.1731H591.986V83.8227H537.872V119.097Z" fill="currentColor"/>
<path d="M463.762 143.147L429.891 87.6307C422.408 92.3072 415.861 96.0483 410.25 98.8542V143.147H384.596V2.85281H410.25V69.3924C426.15 59.7722 440.313 47.6134 452.739 32.9159V2.85281H478.793V42.9369C469.841 54.1605 460.221 64.0479 449.933 72.5992L493.825 143.147H463.762Z" fill="currentColor"/>
<path d="M332.457 143.147L308.406 95.0463H286.16V143.147H260.506V2.85281H308.607C322.503 2.85281 334.327 7.72971 344.081 17.4835C353.835 27.2373 358.712 39.0621 358.712 52.9579C358.712 60.4403 356.44 67.7891 351.898 75.0042C347.355 82.2193 341.342 87.6975 333.86 91.4387L360.516 143.147H332.457ZM286.16 26.7029V70.9958H323.638C329.651 66.3193 332.657 59.839 332.657 51.555C332.657 44.3399 330.252 38.3941 325.442 33.7176C320.632 29.0411 315.02 26.7029 308.607 26.7029H286.16Z" fill="currentColor"/>
<path d="M214.378 143.147L203.355 109.877H153.25L142.227 143.147H114.168L162.269 2.85281H194.336L242.437 143.147H214.378ZM161.267 86.2277H195.338L178.303 34.7197L161.267 86.2277Z" fill="currentColor"/>
<path d="M42.0883 2.85281C61.195 2.85281 77.2955 9.80073 90.3896 23.6966C103.617 37.5924 110.231 55.1626 110.231 76.4071C110.231 91.5055 106.69 105 99.609 116.892C92.5274 128.65 83.1077 137.402 71.3497 143.147H0V2.85281H42.0883ZM62.1303 119.297C68.1429 114.888 73.1535 108.675 77.1619 100.658C81.1703 92.6412 83.1745 84.5576 83.1745 76.4071C83.1745 63.8475 78.9657 52.4235 70.548 42.1352C62.1303 31.847 52.6438 26.7029 42.0883 26.7029H26.0547V119.297H62.1303Z" fill="currentColor"/>
</svg>

`

const ModeSVG = `
<svg width="530" height="146" viewBox="0 0 530 146" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M463.109 119H529.109V143H437.109V3H527.109V27H463.109V60.2H517.109V83.8H463.109V119Z" />
<path d="M351.18 3C370.246 3 386.313 9.93333 399.38 23.8C412.58 37.6667 419.18 55.2 419.18 76.4C419.18 91.4667 415.646 104.933 408.58 116.8C401.513 128.533 392.113 137.267 380.38 143H309.18V3H351.18ZM371.18 119.2C377.18 114.8 382.18 108.6 386.18 100.6C390.18 92.6 392.18 84.5333 392.18 76.4C392.18 63.8667 387.98 52.4667 379.58 42.2C371.18 31.9333 361.713 26.8 351.18 26.8H335.18V119.2H371.18Z" />
<path d="M268.039 124.8C255.372 138.933 240.039 146 222.039 146C204.039 146 188.706 138.933 176.039 124.8C163.372 110.533 157.039 93.2667 157.039 73C157.039 52.7333 163.372 35.5333 176.039 21.4C188.706 7.13334 204.039 0 222.039 0C240.039 0 255.372 7.06667 268.039 21.2C280.706 35.3333 287.039 52.6 287.039 73C287.039 93.2667 280.706 110.533 268.039 124.8ZM194.839 106.8C202.039 116.267 211.106 121 222.039 121C232.972 121 242.039 116.267 249.239 106.8C256.439 97.2 260.039 85.9333 260.039 73C260.039 60.0667 256.439 48.8667 249.239 39.4C242.039 29.8 232.972 25 222.039 25C211.106 25 202.039 29.8 194.839 39.4C187.639 48.8667 184.039 60.0667 184.039 73C184.039 85.9333 187.639 97.2 194.839 106.8Z" />
<path d="M133 3V143H108V63.2L80.2 143H52.8L25 63.2V143H0V3H27L66.2 111.2L104 3H133Z" />
</svg>
`

export const conference = {
  name: 'Fronteers Dark Mode',
  year: 2026,
  taglines: ['5 speakers', '1 night'],
  dates: { start: '2026-10-02', end: '2026-10-02' },
  city: 'Dordrecht',
  country: 'The Netherlands',
  venue: 'Cinema De Witt',
  timezone: 'Europe/Amsterdam',
  ticketsUrl: 'https://fronteersconf.org/tickets/',
  website: 'https://fronteersconf.org/',
  introText: 'Join us on Friday, October 2nd 2026, at Cinema De Witt in Dordrecht for an intimate evening of frontend talks and community vibes – from 3PM to after midnight.'
}

export const speakers = [
  {
    id: 'anjana-vakil',
    name: 'Anjana Vakil',
    type: 'speaker',
    bio: `
    <p>
      Anjana suffers from a chronic case of curiosity, which led her from philosophy to English teaching to computational linguistics to software engineering.
    </p>
    <p>
      Her conference talks and courses on functional programming, JavaScript, and philosophical & linguistic perspectives on software development have reached millions of learners worldwide.
    </p>
    <p>
      These days she mostly codes & teaches from her dual home bases in the San Francisco Bay & Berlin, when not traveling to speak or MC at events around the world. Nerd out with her about functional programming, ask her about the Recurse Center & Outreachy, and definitely invite her to your karaoke party!
    </p>
    `,
    media: speakerImg('anjana'),
    talk: {
      title: 'Making Waves with the Web: Audio Synthesis and Data Sonification with the WebAudio API',
      description: `
        <p>
          What’s in a waveform? How can we derive "do re mi” from only digits? Can synthetic sounds sing us a story?
        </p>
        <p>
          In this talk, we’ll use the WebAudio API and the library Tone.js to explore the fundamentals of audio synthesis, building a drone synthesizer in the browser that creates a unique ambient soundscape based on a location’s current weather. Along the way we'll explore basic concepts in digital signal processing and audio engineering, as we create, shape, and add movement to waveforms to coax atmospheric sounds out of these atmospheric signals.
        </p>
        <p>
          We’ll only scratch the surface of what WebAudio can do, but you'll take away a toolkit of techniques and inspiration to start making your own weird, wonderful waves with the web.
        </p>
      `
    }
  },
  {
    id: 'barry-pollard',
    name: 'Barry Pollard',
    type: 'speaker',
    bio: `
    <p>
      For decades, HTML has been delivered in a strictly top-to-bottom order—even though modern web applications rarely work that way. We want fast page loads, progressively revealed content, and component-based architectures, yet we often rely on increasingly complex JavaScript frameworks to bridge the gap.
    </p>
    <p>
      In this session, Barry Pollard explores Declarative Partial Updates, an exciting new proposal for the web platform that rethinks how HTML is delivered and updated. Instead of waiting for an entire page to be ready or manually manipulating the DOM with JavaScript, developers can stream content into predefined locations as soon as it's available, using new declarative HTML primitives and streamlined browser APIs.
    </p>
    <p>
      We'll look at the motivations behind the proposal, how out-of-order HTML streaming works, the new APIs for safely inserting and streaming HTML, and why these ideas could make server-rendered applications feel as responsive as client-rendered ones—without sacrificing the web's core strengths. Along the way, Barry will discuss performance, accessibility, interoperability, and how these features fit into the broader evolution of the web platform.
    </p>
    <p>
      Whether you're building traditional multi-page applications, server-rendered sites, or modern SPAs, this talk offers a glimpse into a future where the browser does more of the heavy lifting—and JavaScript can focus on what it does best.
    </p>
    `,
    media: speakerImg('barry'),
    talk: {
      title: 'Declarative Partial Updates: Rethinking How the Web Streams HTML',
      description: `
        <p>Barry Pollard works in the Chrome Developer Relations team specialising in web performance. He spends his days working on Core Web Vitals and tooling such as Chrome DevTools, PageSpeed Insights, the Chrome User Experience Report (CrUX), and maintaining the web-vitals JavaScript library. He's also a member of the W3C Web Performance Working Group. He is one of the maintainers of the HTTP Archive and its annual Web Almanac publication. He's the author of HTTP/2 in Action from Manning Publications. He frequently finds people who are wrong on the internet and this keeps him up at night. He also can't handle unread notifications on his phone so don't message him or he will answer you...</p>
      `
    }
  },
  {
    id: 'cyd-stumpel',
    name: 'Cyd Stumpel',
    type: 'speaker',
    bio: `
    <p>
      Cyd creates accessible, creative, award winning websites for individuals and companies.
    </p>
    <p>
      Sharing knowledge is big part of what she likes about being a developer. She does that by blogging, at meetups, conferences and by teaching the next generation of web developers at the Amsterdam University of Applied Sciences at the Associate Degree Frontend Design & Development and the Minor Web Design & Development.
    </p>
    `,
    media: speakerImg('cyd'),
    talk: {
      title: 'You might not need JS',
      description: `
        <p>Motion on the web has come full circle: from simple CSS animations and transitions, to JavaScript libraries, and now back to CSS again. With the View Transitions API and Scroll-Driven Animations we'll explore how modern CSS is reshaping creative development today and where you can replace JS with CSS solutions.</p>
      `
    }
  },
  {
    id: 'harry-roberts',
    name: 'Harry Roberts',
    type: 'speaker',
    bio: `
    <p>
      Harry is an independent Consultant Web Performance Engineer from the UK. He helps some of the world’s largest and most respected organisations find and fix their site-speed issues.
    </p>
    <p>
      He is both a Google- and a Cloudinary Media-Developer Expert, and has consulted for clients from the United Nations to the BBC, General Electric to the Financial Times, and a whole host more. He is also co-chair of performance.now(), the web performance conference for professionals.
    </p>
    <p>
      When not doing client work, he writes, teaches, and speaks about the entire gamut of front-end performance. When not doing work at all, he’s probably out on his bike.
    </p>
    `,
    media: speakerImg('harry'),
    talk: {
      title: 'Build for the web, build on the web, build with the web',
      description: `
        <p>
          Every layer of abstraction made in the browser moves you further from the platform, ties you further into framework lock-in, and moves you further away from fast.
        </p>
        <p>
          By using progressive enhancement, you can opt into browser-native features that are usually faster, more accessible, more secure, and—perhaps most importantly to the business—maintained by someone else.
        </p>
        <p>
          The beauty of opting into web platform features as they become available is that your site becomes contextual. The same codebase adapts into its environment, playing to its strengths, rather than trying to build and ship your own environment from the ground up. Meet your users where they are.
        </p>
      `
    }
  },
  {
    id: 'heydon-pickering',
    name: 'Heydon Pickering',
    type: 'speaker',
    bio: `
    <p>
      Heydon has spent 20 or so years working with the web. They've authored and illustrated multiple books, designed some experimental variable fonts, and produced some ambitious, often contentious videos. They love to design with black and currentColor. Colors are confusing.
    </p>`,
    media: speakerImg('heydon'),
    talk: {
      title: 'The web is a canvas',
      description: `
        <p>
          The &lt;img&gt; element was available in 1995. We had to wait another 15 years &lt;audio&gt;. There’s still little we can do with sound in HTML, except play, or stop, something already recorded. Actually sampling, signal processing, and sequencing sound means either raw-dogging the Web Audio API or using a monolithic library like Tone.js.
        </p>
        <p>
          In any case, you find yourself writing a lot of JavaScript and not much music. Heydon wants to be able to design sound like they write prose: hypertextually. Pursuing this has become a multi-year obsession, and it’s revived their 20-year-long passion for the web. Along the way, they've discovered that a 2KB custom element can do as much as £200 of hardware. This way to the rabbit hole!
        </p>
      `
    }
  },
  {
    id: 'jake-archibald',
    name: 'Jake Archibald',
    type: 'MC',
    media: speakerImg('jake'),
    bio: `
    <p>
    Jake is a developer of sorts working at Mozilla on web standards and developer relations.
    </p>`,
    talk: {
      title: 'Master of Ceremonies',
      description: `
        <p>
          As our MC, Jake will guide us through the day with the same curiosity, technical insight, and infectious enthusiasm that have made him one of the web community's most recognizable voices.
        </p>
      `
    }
  }
]

/** Single object if you prefer one import */
export const fronteers2026 = {
  conference,
  speakers,
}

export default fronteers2026

const generateIndexPage = () => {
  const templatePath = join(__dirname, 'fronteers', 'template.html')
  const template = readFileSync(templatePath, 'utf8')

  const speakersList = speakers.map(speaker => {
    return `
      <li class="speaker speaker-${speaker.id}" style="--vt: ${speaker.id};">
        <a class="speaker-name medium-heading pixel" href="speakers/${speaker.id}" style="--vt: ${speaker.id}-name;">
          ${speaker.name}
        </a>
        <div class="speaker-image">
          <img src="${speaker.media}" alt="${speaker.name}">
        </div>
      </li>
    `
  }).join('')



  const content = template
    .replace(/{speakers}/g, speakersList)
    .replace(/{conferenceWebsite}/g, conference.website)
    .replace(/{conferenceName}/g, conference.name)
    .replace(/{DarkSVG}/g, '<span class="svg">'+DarkSVG+'</span>')
    .replace(/{ModeSVG}/g, '<span class="svg">'+ModeSVG+'</span>')
    .replace(/{conferenceDate}/g, new Date(conference.dates.start).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' }))
    .replace(/{conferenceVenue}/g, conference.venue)
    .replace(/{conferenceLocation}/g, conference.city)
    .replace(/{conferenceCountry}/g, conference.country)
    .replace(/{tagline1}/g, conference.taglines[0])
    .replace(/{tagline2}/g, conference.taglines[1])
    .replace(/{conferenceIntroText}/g, conference.introText)
  const outputPath = join(__dirname, 'fronteers', 'index.html')
  writeFileSync(outputPath, content)
  console.log('Generated index.html')
}
generateIndexPage()

const generateSpeakerPages = () => {
  const templatePath = join(__dirname, 'fronteers', 'speakers', 'template.html')
  const speakers = fronteers2026.speakers
  const template = readFileSync(templatePath, 'utf8')
  speakers.forEach((speaker, index) => {
    const prevSpeaker = index != 0 ? speakers[index - 1] : speakers[speakers.length - 1]
    const nextSpeaker = index != speakers.length - 1 ? speakers[index + 1] : speakers[0]
    const content = template
      .replace(/{conferenceName}/g, conference.name)
      .replace(/{speakerId}/g, speaker.id)
      .replace(/{prevSpeakerId}/g, prevSpeaker.id)
      .replace(/{prevSpeakerMedia}/g, prevSpeaker.media.replace(/^\.\//, '../../'))
      .replace(/{prevSpeakerName}/g, prevSpeaker.name)
      .replace(/{nextSpeakerId}/g, nextSpeaker.id)
      .replace(/{nextSpeakerMedia}/g, nextSpeaker.media.replace(/^\.\//, '../../'))
      .replace(/{nextSpeakerName}/g, nextSpeaker.name)
      .replace(/{speakerName}/g, speaker.name)
      .replace(/{speakerBio}/g, speaker.bio)
      .replace(/{speakerMedia}/g, speaker.media.replace(/^\.\//, '../../'))
      .replace(/{speakerTalkTitle}/g, speaker.talk.title)
      .replace(/{speakerTalkDescription}/g, speaker.talk.description)

    const outputPath = join(__dirname, 'fronteers', 'speakers', speaker.id, 'index.html')
    mkdirSync(join(__dirname, 'fronteers', 'speakers', speaker.id), { recursive: true })
    writeFileSync(outputPath, content)
    console.log(`Generated ${speaker.id}.html`)
  })
}
generateSpeakerPages()
