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
<svg width="762" height="146" viewBox="0 0 762 146" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="r" d="M732.569 146L707.541 95.9429H684.389V146H657.692V0H707.749C722.21 0 734.516 5.07524 744.667 15.2257C754.817 25.3762 759.892 37.6819 759.892 52.1429C759.892 59.9295 757.528 67.5771 752.801 75.0857C748.073 82.5943 741.816 88.2952 734.029 92.1886L761.769 146H732.569ZM684.389 24.82V70.9143H723.392C729.649 66.0476 732.778 59.3038 732.778 50.6829C732.778 43.1743 730.275 36.9867 725.269 32.12C720.264 27.2533 714.424 24.82 707.749 24.82H684.389Z" fill="currentColor"/>
<path class="e" d="M559.746 120.971H628.575V146H532.632V0H626.489V25.0286H559.746V59.6514H616.06V84.2629H559.746V120.971Z" fill="currentColor"/>
<path d="M482.622 146L447.373 88.2257C439.587 93.0924 432.773 96.9857 426.933 99.9057V146H400.236V0H426.933V69.2457C443.48 59.2343 458.219 46.581 471.151 31.2857V0H498.265V41.7143C488.949 53.3943 478.937 63.6838 468.231 72.5829L513.908 146H482.622Z" fill="currentColor"/>
<path d="M345.978 146L320.949 95.9429H297.798V146H271.101V0H321.158C335.619 0 347.924 5.07524 358.075 15.2257C368.225 25.3762 373.301 37.6819 373.301 52.1429C373.301 59.9295 370.937 67.5771 366.209 75.0857C361.481 82.5943 355.224 88.2952 347.438 92.1886L375.178 146H345.978ZM297.798 24.82V70.9143H336.801C343.058 66.0476 346.186 59.3038 346.186 50.6829C346.186 43.1743 343.683 36.9867 338.678 32.12C333.672 27.2533 327.832 24.82 321.158 24.82H297.798Z" fill="currentColor"/>
<path d="M223.096 146L211.625 111.377H159.482L148.011 146H118.811L168.868 0H202.239L252.296 146H223.096ZM167.825 86.7657H203.282L185.553 33.1629L167.825 86.7657Z" fill="currentColor"/>
<path d="M43.8 0C63.6838 0 80.439 7.23048 94.0656 21.6914C107.831 36.1524 114.714 54.4372 114.714 76.5457C114.714 92.2581 111.029 106.302 103.66 118.677C96.2904 130.913 86.4875 140.021 74.2514 146H0V0H43.8ZM64.6571 121.18C70.9142 116.591 76.1285 110.126 80.2999 101.783C84.4714 93.44 86.5571 85.0276 86.5571 76.5457C86.5571 63.4752 82.1771 51.5867 73.4171 40.88C64.6571 30.1733 54.7847 24.82 43.8 24.82H27.1143V121.18H64.6571Z" fill="currentColor"/>
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
