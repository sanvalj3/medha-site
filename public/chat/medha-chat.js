/*!
 * Medha Assistant - static chat widget.
 * Runs entirely in the browser (works on GitHub Pages). Answers come from the
 * Q&A that was configured in WPBot; anything that needs a person is handed
 * off to WhatsApp / phone with the visitor's question pre-filled.
 */
(function () {
  'use strict';

  var CFG = window.MEDHA_CHAT || {};
  var HOME = (CFG.home || '/').replace(/\/?$/, '/');
  var LOGO = CFG.logo || '';
  var WA_NUMBER = CFG.whatsapp || '917349475807';
  var PHONE = CFG.phone || '+917349475807';
  var PHONE_LABEL = CFG.phoneLabel || '+91 73494 75807';

  /* ---------------- knowledge base (from WPBot responses) ---------------- */
  var COURSES = {
    sap: { label: 'SAP', slug: 'sap-all-modules-training/', text: 'We offer training on <b>SAP All Modules</b> (FICO, MM, SD, ABAP and more) with expert mentors, real-time scenarios and placement support.' },
    java: { label: 'Java Full Stack', slug: 'java-full-stack/', text: 'Our <b>Java Full Stack</b> course covers Core & Advanced Java, Spring Boot, REST APIs, front-end and real-time projects.' },
    python: { label: 'Python Full Stack', slug: 'python-full-stack-training/', text: 'Our <b>Python Full Stack</b> course covers Python, Django/Flask, front-end, databases and real-time projects.' },
    ai: { label: 'Advanced AI', slug: 'artificial-intelligence-training/', text: 'The <b>Advanced AI</b> program covers Machine Learning, Deep Learning and Generative AI with hands-on projects.' },
    ds: { label: 'Data Science', slug: 'data-science-training/', text: 'Our <b>Data Science</b> course offers practical training with real-time datasets, Python, ML and analytics.' },
    da: { label: 'Data Analytics', slug: 'data-analytics-training-2/', text: 'Our <b>Data Analytics</b> course covers Excel, SQL, Python and visualization with real business datasets.' },
    pbi: { label: 'Power BI', slug: 'power-bi-training/', text: 'Our <b>Power BI</b> course teaches data modeling, DAX and interactive dashboards with real-time datasets.' },
    aws: { label: 'AWS & DevOps', slug: 'aws-devops-training/', text: 'Yes, <b>AWS & DevOps</b> cloud training is available, covering CI/CD pipelines, Docker and Kubernetes.' },
    testing: { label: 'Software Testing', slug: 'software-testing-training/', text: '<b>Software Testing</b> (Manual + Automation/Selenium) is a great option, even from a non-IT background, with 100% placement assistance.' },
    dm: { label: 'Digital Marketing', slug: 'digital-marketing-training/', text: '<b>Digital Marketing</b> (SEO, SMM, Google Ads) is a great option for non-IT backgrounds, with 100% placement assistance.' },
    sf: { label: 'Salesforce', slug: 'salesforce-training-in-hyderabad/', text: 'Our <b>Salesforce</b> course covers Admin & Developer modules with real-time projects.' },
    angular: { label: 'Angular', slug: 'angular-development-training/', text: 'We offer <b>Angular Development</b> training. No coding background needed, we teach everything from the basics.' },
    react: { label: 'React JS', slug: 'courses/', text: 'We offer <b>React JS</b> front-end training. No coding background needed, we teach everything from the basics.' },
    fsweb: { label: 'Full Stack Web', slug: 'full-stack-web-development-2/', text: 'Our <b>Full Stack Web Development</b> course takes you from HTML/CSS/JS to back-end and deployment.' }
  };

  // keyword -> intent (order matters: more specific first)
  var INTENTS = [
    { id: 'thanks', kw: ['thank', 'thanks', 'bye', 'great day'] },
    { id: 'no', kw: ['not now', 'not right now', 'not at the moment', 'no thanks', 'nope'] , exact: ['no'] },
    { id: 'yes', kw: ['yes', 'yeah', 'sure', 'interested', 'please share'], exact: ['ok', 'okay', 'y'] },
    { id: 'fees', kw: ['fee', 'fees', 'cost', 'price', 'discount', 'charges', 'amount'] },
    { id: 'demo', kw: ['demo', 'free class', 'trial', 'book'] },
    { id: 'placement', kw: ['placement', 'job', 'interview', 'career', 'salary', 'package'] },
    { id: 'timings', kw: ['timing', 'batch', 'duration', 'time', 'when', 'start', 'weekend', 'schedule'] },
    { id: 'location', kw: ['location', 'address', 'where', 'office', 'branch', 'online', 'offline', 'directions'] },
    { id: 'contact', kw: ['contact', 'phone', 'whatsapp', 'support', 'call', 'number', 'counsel'] },
    { id: 'course:sap', kw: ['sap', 'fico', 'abap', 's4', 'hana', ' mm', ' sd'] },
    { id: 'course:java', kw: ['java', 'spring'] },
    { id: 'course:python', kw: ['python', 'django', 'flask'] },
    { id: 'course:ai', kw: ['advanced ai', 'artificial', 'machine learning', 'deep learning', 'genai', 'generative', ' ai'] },
    { id: 'course:ds', kw: ['data science', 'datascience'] },
    { id: 'course:da', kw: ['data analytics', 'analytics', 'analyst', 'excel', 'sql'] },
    { id: 'course:pbi', kw: ['power bi', 'powerbi', 'dashboard'] },
    { id: 'course:aws', kw: ['aws', 'devops', 'cloud', 'azure', 'docker', 'kubernetes', 'amazon'] },
    { id: 'course:testing', kw: ['testing', 'tester', 'qa', 'selenium', 'automation'] },
    { id: 'course:dm', kw: ['digital marketing', 'marketing', 'seo', 'smm', 'google ads'] },
    { id: 'course:sf', kw: ['salesforce'] },
    { id: 'course:angular', kw: ['angular'] },
    { id: 'course:react', kw: ['react'] },
    { id: 'course:fsweb', kw: ['full stack', 'fullstack', 'web development', 'frontend', 'front end', 'ui', 'coding', 'programming', 'developer'] },
    { id: 'courses', kw: ['course', 'courses', 'training', 'program', 'syllabus', 'learn'] },
    { id: 'hello', kw: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening', 'start'] }
  ];

  /* ---------------- helpers ---------------- */
  var ICON = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.09c-.24.68-1.42 1.3-1.95 1.35-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.25-.27.55-.34.73-.34h.52c.17 0 .4-.06.62.48.24.57.8 1.95.87 2.09.07.14.12.3.02.48-.09.18-.14.3-.27.45-.14.16-.29.36-.41.48-.14.14-.28.28-.12.55.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.33Z"/></svg>',
    call: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3h-7ZM5 5h6V3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-6h-2v6H5V5Z"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"/></svg>',
    restart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7Z"/></svg>'
  };

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function waLink(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }
  function storage(key, val) {
    try {
      if (val === undefined) return sessionStorage.getItem(key);
      sessionStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  /* ---------------- build DOM ---------------- */
  var root = el('div', 'mchat');
  root.innerHTML =
    '<div class="mchat-teaser" role="status">' +
      '<button type="button" class="mchat-teaser-close" aria-label="Dismiss">&times;</button>' +
      '<strong>Hi there! 👋</strong>Need help choosing a course or booking a free demo?' +
    '</div>' +
    '<section class="mchat-panel" role="dialog" aria-modal="false" aria-label="Chat with Medha IT Technologies">' +
      '<header class="mchat-head">' +
        '<div class="mchat-avatar"><img src="' + esc(LOGO) + '" alt=""></div>' +
        '<div class="mchat-head-text"><div class="mchat-title">Medha IT Technologies</div><div class="mchat-status">Online · replies instantly</div></div>' +
        '<button type="button" class="mchat-head-btn mchat-restart" aria-label="Start over" title="Start over">' + ICON.restart + '</button>' +
        '<button type="button" class="mchat-head-btn mchat-close" aria-label="Close chat" title="Close">' + ICON.close + '</button>' +
      '</header>' +
      '<div class="mchat-body" aria-live="polite"></div>' +
      '<footer class="mchat-foot">' +
        '<form class="mchat-form" autocomplete="off">' +
          '<input class="mchat-input" type="text" maxlength="300" placeholder="Type your question…" aria-label="Type your question">' +
          '<button class="mchat-send" type="submit" aria-label="Send">' + ICON.send + '</button>' +
        '</form>' +
        '<div class="mchat-foot-links">' +
          '<a href="' + waLink('Hi Medha IT Technologies, I would like to know more about your courses.') + '" target="_blank" rel="noopener">' + ICON.wa + 'WhatsApp</a>' +
          '<a href="tel:' + esc(PHONE) + '">' + ICON.call + esc(PHONE_LABEL) + '</a>' +
        '</div>' +
      '</footer>' +
    '</section>' +
    '<button type="button" class="mchat-launcher" aria-label="Open chat" aria-expanded="false">' +
      '<img src="' + esc(LOGO) + '" alt=""><span class="mchat-dot"></span>' +
    '</button>';

  var body = root.querySelector('.mchat-body');
  var input = root.querySelector('.mchat-input');
  var launcher = root.querySelector('.mchat-launcher');
  var teaser = root.querySelector('.mchat-teaser');
  var started = false;
  var lastTopic = '';

  function scrollDown() { body.scrollTop = body.scrollHeight; }

  function addUser(text) {
    var m = el('div', 'mchat-msg mchat-msg-user');
    m.appendChild(el('div', 'mchat-bubble', esc(text)));
    body.appendChild(m);
    scrollDown();
  }

  function addBot(html, chips, delay) {
    var typing = el('div', 'mchat-msg mchat-msg-bot mchat-typing',
      '<div class="mchat-mini"><img src="' + esc(LOGO) + '" alt=""></div><div class="mchat-bubble"><i></i><i></i><i></i></div>');
    body.appendChild(typing);
    scrollDown();
    setTimeout(function () {
      typing.remove();
      var m = el('div', 'mchat-msg mchat-msg-bot',
        '<div class="mchat-mini"><img src="' + esc(LOGO) + '" alt=""></div><div class="mchat-bubble">' + html + '</div>');
      body.appendChild(m);
      if (chips && chips.length) body.appendChild(renderChips(chips));
      scrollDown();
    }, delay == null ? 650 : delay);
  }

  function renderChips(chips) {
    var wrap = el('div', 'mchat-chips');
    chips.forEach(function (c) {
      var b;
      if (c.href) {
        b = el('a', 'mchat-chip' + (c.cls ? ' ' + c.cls : ''));
        b.href = c.href;
        if (/^https?:/.test(c.href) && c.href.indexOf(HOME) !== 0) { b.target = '_blank'; b.rel = 'noopener'; }
      } else {
        b = el('button', 'mchat-chip' + (c.cls ? ' ' + c.cls : ''));
        b.type = 'button';
        b.addEventListener('click', function () {
          wrap.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
          addUser(c.label.replace(/^[^\w]+/, ''));
          handle(c.go);
        });
      }
      b.innerHTML = (c.icon ? ICON[c.icon] : '') + esc(c.label);
      wrap.appendChild(b);
    });
    return wrap;
  }

  /* ---------------- standard chip sets ---------------- */
  function waChip(text, label) {
    return { label: label || 'Chat on WhatsApp', href: waLink(text), cls: 'is-wa', icon: 'wa' };
  }
  function callChip() {
    return { label: 'Call ' + PHONE_LABEL, href: 'tel:' + PHONE, cls: 'is-call', icon: 'call' };
  }
  var MAIN = [
    { label: '📚 Courses', go: 'courses' },
    { label: '🎓 Free Demo', go: 'demo' },
    { label: '💰 Fees', go: 'fees' },
    { label: '💼 Placements', go: 'placement' },
    { label: '⏰ Batch Timings', go: 'timings' },
    { label: '📍 Location', go: 'location' }
  ];
  function courseChips() {
    return Object.keys(COURSES).map(function (k) { return { label: COURSES[k].label, go: 'course:' + k }; });
  }

  /* ---------------- intents ---------------- */
  function handle(intent) {
    var topic = lastTopic ? ' (' + lastTopic + ')' : '';
    if (intent.indexOf('course:') === 0) {
      var c = COURSES[intent.slice(7)];
      lastTopic = c.label;
      addBot(c.text + '<br><br>Would you like a free live demo class?', [
        { label: 'View ' + c.label + ' course', href: HOME + c.slug, cls: 'is-link', icon: 'link' },
        { label: '🎓 Book free demo', go: 'demo' },
        { label: '💰 Fees', go: 'fees' },
        waChip('Hi, I am interested in the ' + c.label + ' course. Please share details.')
      ]);
      return;
    }
    switch (intent) {
      case 'hello':
        addBot('Hello! 👋 Welcome to <b>Medha IT Technologies</b>. How can I help you today?', MAIN);
        break;
      case 'courses':
        addBot('We offer training in SAP, Java, Python, Data Science, AI, AWS & DevOps, Testing, Salesforce, Power BI, Digital Marketing and more. Which course would you like to know about?', courseChips());
        break;
      case 'demo':
        var chips = [waChip('Hi, I would like to book a FREE demo class' + topic + '.', 'Book on WhatsApp')];
        if (window.openDemoPopup || document.querySelector('.medha-demo-btn')) chips.unshift({ label: '📝 Open demo form', go: 'demoform' });
        chips.push(callChip());
        addBot('Great choice! 🎓 Our <b>free live demo class</b> is the best way to get started. Book it in seconds:', chips);
        break;
      case 'demoform':
        var btn = document.querySelector('.medha-demo-btn');
        addBot('Opening the demo booking form for you…', [], 300);
        setTimeout(function () { close(); if (window.openDemoPopup) window.openDemoPopup(); else if (btn) btn.click(); }, 900);
        break;
      case 'fees':
        addBot('Fees vary by course and we often have <b>special discounts</b> running. Our counselor will share the exact fee and current offers. Message or call us:', [
          waChip('Hi, please share the fee details and current discounts' + topic + '.', 'Get fee details'),
          callChip(),
          { label: '📚 Courses', go: 'courses' }
        ]);
        break;
      case 'placement':
        addBot('We provide <b>dedicated placement assistance</b> 🚀: 100% interview support, mock interviews, resume building and live projects upon course completion.', [
          { label: 'See placed students', href: HOME + 'placements/', cls: 'is-link', icon: 'link' },
          { label: '🎓 Free Demo', go: 'demo' },
          { label: '📚 Courses', go: 'courses' }
        ]);
        break;
      case 'timings':
        addBot('We have <b>morning and evening batches</b>, plus <b>weekend classes</b> for working professionals. Ask us for the next batch dates:', [
          waChip('Hi, please share the upcoming batch timings' + topic + '.', 'Get batch timings'),
          callChip()
        ]);
        break;
      case 'location':
        addBot('We offer both <b>online and offline</b> classes. Our office is in Marathahalli, Bangalore. Want us to send the exact location on WhatsApp?', [
          waChip('Hi, please share your office location and address.', 'Send me the location'),
          { label: 'Contact page', href: HOME + 'contact-us/', cls: 'is-link', icon: 'link' }
        ]);
        break;
      case 'contact':
        addBot('You can reach us directly on WhatsApp or phone at <b>' + esc(PHONE_LABEL) + '</b>. We are ready to help you!', [
          waChip('Hi Medha IT Technologies, I need some help.'),
          callChip()
        ]);
        break;
      case 'yes':
        addBot('Great! 🙌 Share your name and the course you are interested in on WhatsApp and our representative will call you within 10 minutes.', [
          waChip('Hi, I am interested' + topic + '. My name is: '),
          callChip()
        ]);
        break;
      case 'no':
        addBot('No problem! If you ever need career guidance or the best software training, we are just a message away. Have a nice day! 😊', [
          { label: '↩ Main menu', go: 'menu' }
        ]);
        break;
      case 'thanks':
        addBot('Thank you! We wish you a successful career. Have a great day! 🌟', [{ label: '↩ Main menu', go: 'menu' }]);
        break;
      case 'menu':
        addBot('What would you like to know?', MAIN);
        break;
      default:
        addBot('Sorry, I didn\'t completely understand that. Would you like to know about our courses, fees or placements? Or talk directly with our expert counselor:', [
          { label: '📚 Courses', go: 'courses' },
          { label: '💰 Fees', go: 'fees' },
          { label: '💼 Placements', go: 'placement' },
          waChip('Hi, I have a question: ' + (lastQuestion || ''), 'Ask on WhatsApp')
        ]);
    }
  }

  var lastQuestion = '';
  function detect(text) {
    var t = ' ' + text.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
    var bare = t.trim();
    // a phone number typed in -> hand off to WhatsApp with it
    if (/\d{10}/.test(text.replace(/\D/g, ''))) return 'phone';
    for (var i = 0; i < INTENTS.length; i++) {
      var it = INTENTS[i];
      if (it.exact && it.exact.indexOf(bare) !== -1) return it.id;
      for (var j = 0; j < it.kw.length; j++) {
        var k = it.kw[j];
        if (k.charAt(0) === ' ' ? t.indexOf(k + ' ') !== -1 : new RegExp('\\b' + k.replace(/ /g, '\\s') + '\\b').test(t)) return it.id;
      }
    }
    return 'fallback';
  }

  function onSubmit(e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    lastQuestion = text;
    addUser(text);
    var intent = detect(text);
    if (intent === 'phone') {
      addBot('Thanks! 📞 Please send your number to us on WhatsApp so our counselor can call you back right away:', [
        waChip('Hi, please call me back' + (lastTopic ? ' about ' + lastTopic : '') + '. My number: ' + text, 'Send on WhatsApp'),
        callChip()
      ]);
      return;
    }
    handle(intent);
  }

  /* ---------------- open / close ---------------- */
  function open() {
    root.classList.add('is-open');
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', 'Close chat');
    hideTeaser(true);
    if (!started) {
      started = true;
      addBot('Hi there! 👋 Welcome to <b>Medha IT Technologies</b>.', null, 400);
      setTimeout(function () { addBot('I can help you with courses, free demo classes, fees, placements and batch timings. What would you like to know?', MAIN, 700); }, 450);
    }
    if (window.matchMedia('(min-width: 768px)').matches) setTimeout(function () { input.focus(); }, 250);
  }
  function close() {
    root.classList.remove('is-open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', 'Open chat');
  }
  function hideTeaser(remember) {
    teaser.classList.remove('is-shown');
    if (remember) storage('mchat_teaser_done', '1');
  }

  launcher.addEventListener('click', function () { root.classList.contains('is-open') ? close() : open(); });
  root.querySelector('.mchat-close').addEventListener('click', close);
  root.querySelector('.mchat-restart').addEventListener('click', function () {
    body.innerHTML = '';
    lastTopic = '';
    started = false;
    open();
  });
  root.querySelector('.mchat-form').addEventListener('submit', onSubmit);
  teaser.addEventListener('click', function (e) {
    if (e.target.closest('.mchat-teaser-close')) { hideTeaser(true); return; }
    open();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('is-open')) { close(); launcher.focus(); }
  });

  function mount() {
    document.body.appendChild(root);
    // friendly nudge once per visit (never auto-opens the full chat)
    if (!storage('mchat_teaser_done')) {
      setTimeout(function () {
        if (!root.classList.contains('is-open')) teaser.classList.add('is-shown');
      }, CFG.teaserDelay || 8000);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
