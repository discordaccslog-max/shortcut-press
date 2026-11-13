// Site copy: policies, FAQ, About and Consumer Rights. Plain language; every statement
// matches how the site works (browser-based guides unlocked by a license code).

export const UPDATED = { human: "November 13, 2026", iso: "2026-11-13" };
export const SELF_STUDY = "There are no video lessons, no live instruction, no tutoring, and no feedback on your work.";

const C = `<a href="contact.html">contact us through the Contact page</a>`;
const CC = `<a href="contact.html">Contact us through the Contact page</a>`;

/* ---------- Refund Policy ---------- */
export const refundHtml = `
<h2>In short</h2>
<div class="summary-box"><ul>
<li>A full refund on any purchase if you ask within 14 days. No reason is needed.</li>
<li>Ask through the Contact page with your order number.</li>
<li>Refunds go to your original payment method within 5 business days of your request.</li>
<li>When a purchase is refunded, its license ends.</li>
</ul></div>

<h2>Full refunds within 14 days</h2>
<p>You can get a full refund on any Shortcut Press purchase, including the Complete Software Skills Library, if you ask within 14 days of buying. You don't need to give a reason, and it doesn't matter how much of the guide you've used.</p>

<h2>How to ask for a refund</h2>
<p>${CC} and include your order number. Including the email address you used at checkout helps us find your order quickly.</p>

<h2>When you'll receive it</h2>
<p>Refunds are made to your original payment method and are issued within 5 business days of your request. Your payment provider's own processing time may add a few days before the money appears in your account.</p>

<h2>What happens to the license</h2>
<p>When a purchase is refunded, the license for it ends and you may no longer use the guide or guides it unlocked. You can remove the license from your devices in My Guides.</p>

<h2>If something doesn't work</h2>
<p>If a guide or a practice file doesn't work as described, ${C} and tell us what happens. We'll fix the problem or replace what's needed, and you can still choose a refund within the 14 days. Your legal rights as a consumer are not affected by this policy; see <a href="consumer-rights.html">Consumer Rights</a>.</p>

<h2>Questions</h2>
<p>If anything about this policy is unclear, ${C}.</p>
`;

/* ---------- Delivery Policy ---------- */
export const deliveryHtml = `
<h2>In short</h2>
<div class="summary-box"><ul>
<li>Every product is digital: an interactive guide that runs in your web browser, unlocked with a license code. There is no physical shipment.</li>
<li>Your license code is issued on the order confirmation page immediately after payment, and activated in that browser automatically.</li>
<li>To use your guide on another device, enter the same code in My Guides there.</li>
<li>Lost your license? ${CC} with your order number and we'll send it again.</li>
</ul></div>

<h2>What you receive</h2>
<p>Each guide is a series of interactive lessons in your browser, with step-by-step instructions, diagrams, quizzes, exercises with worked solutions, practice files to download, a keyboard shortcut trainer and progress tracking. The spreadsheet guides also include a formula sandbox. You receive one license code per purchase; a Complete Software Skills Library code unlocks all seven guides. No software, physical item or account is included.</p>

<h2>How delivery works, step by step</h2>
<ol>
<li><strong>Agree and pay.</strong> On the guide's page, tick the box to agree to the <a href="terms-of-service.html">Terms of Service</a> and <a href="refund-policy.html">Refund Policy</a>, then select the buy button. You pay on our payment provider's secure checkout, where applicable taxes are shown.</li>
<li><strong>Your confirmation page opens.</strong> Immediately after payment, you're shown your order confirmation page. It issues your license code and shows the product, the date and time, and your order reference when the payment provider supplies one.</li>
<li><strong>Your license is activated in that browser.</strong> The confirmation page activates the code automatically in the browser you bought with. You can copy the code, save the confirmation as a PDF, or print it.</li>
<li><strong>Open your guide.</strong> The Open my guide button takes you straight into the first lesson.</li>
<li><strong>Use it on other devices.</strong> On any other computer, tablet or phone, open My Guides (the button in the bottom-left corner of every page) and enter the same license code.</li>
</ol>

<h2>When delivery happens</h2>
<p>Immediately after your payment is confirmed. There is no waiting period, and nothing is prepared or sent by hand.</p>

<h2>Where your license and progress are stored</h2>
<p>Activated licenses and your learning progress are stored only in your own browser. Clearing your browser's site data removes them from that device. Use <strong>Export backup</strong> in My Guides to keep a copy, and <strong>Import backup</strong> to restore it on any device.</p>

<h2>Lost licenses</h2>
<p>If you lose your license code, ${C} with your order number and the email address you used at checkout, and we'll send your code again.</p>

<h2>How long you have access</h2>
<p>Online access to the guides continues for as long as Shortcut Press operates. Once a guide has been opened in a browser, it also works offline on that device. When a guide is revised because software has changed, the revised version appears the next time you open it.</p>

<h2>No physical shipment</h2>
<p>Nothing is shipped, and there are no shipping charges.</p>

<h2>Questions</h2>
<p>For anything else about delivery, ${C}.</p>
`;

/* ---------- Privacy Policy ---------- */
export const privacyHtml = `
<h2>In short</h2>
<div class="summary-box"><ul>
<li>This website uses no cookies, no analytics and no advertising trackers.</li>
<li>Your licenses and learning progress are stored only in your own browser and are never sent anywhere.</li>
<li>Payments are handled by third-party payment providers. Shortcut Press never sees your full card details.</li>
<li>Your personal information is never sold or shared for advertising.</li>
</ul></div>

<h2 id="browsing">When you browse this website</h2>
<p>This website uses no cookies, no analytics and no advertising trackers, and Shortcut Press does not collect information about you while you browse it. Two outside services are involved in showing you the site:</p>
<ul>
<li><strong>Hosting.</strong> The site is hosted by Vercel and is also published through GitHub Pages. Like any web host, their servers receive technical information such as your IP address when your browser requests a page, and each handles that information under its own privacy statement. Shortcut Press does not receive these server logs.</li>
<li><strong>Fonts.</strong> The site's typefaces are loaded from Google Fonts. Your browser requests the font files from Google's servers, so Google receives your IP address as part of that request and handles it under its own privacy policy. Google Fonts does not set cookies on this site.</li>
</ul>

<h2 id="on-your-device">What's stored on your device</h2>
<p>When you activate a license, the site stores the license code, your learning progress (lessons completed, quiz answers, where you left off) and your display settings in your browser's local storage. This information stays on your device and is never sent to Shortcut Press or anyone else. Because we never receive it, we can't recover it if your browser's data is cleared, so please use <strong>Export backup</strong> in My Guides. The site also asks your browser to keep this data persistently so it isn't cleared automatically when space runs low.</p>

<h2 id="buying">When you buy a guide</h2>
<p>Payments are handled by third-party payment providers. At checkout, the payment provider collects your name, email address, billing details and payment information under its own privacy policy. Shortcut Press never sees your full payment card details.</p>
<p>From each order, the payment provider gives Shortcut Press order information: your name, your email address, the products you bought, and your country.</p>

<h2 id="use">How your information is used</h2>
<p>Order information is used only to:</p>
<ul>
<li>provide support, including sending a lost license code again;</li>
<li>process refunds; and</li>
<li>meet tax and accounting obligations.</li>
</ul>
<p>It is not used for anything else, and you won't be added to a marketing list.</p>

<h2 id="contacting">When you contact us</h2>
<p>When you get in touch, we receive your email address and whatever you include in your message. That information is used only to answer you and resolve your request.</p>

<h2 id="sharing">Sharing</h2>
<p>Your personal information is never sold and never shared for advertising. It is shared only with the service providers needed to run the store, such as the payment provider and our email provider, and only as far as they need it to provide that service. It may also be disclosed where the law requires it.</p>

<h2 id="retention">How long information is kept</h2>
<p>Order information is kept for as long as legal and accounting requirements make it necessary, such as tax record-keeping rules, and is then deleted. Support messages are kept for as long as needed to resolve your request and handle any follow-up, and are then deleted. Information stored in your browser stays there until you remove it, for example by removing a license in My Guides or clearing the site's data.</p>

<h2 id="rights">Your rights</h2>
<h3>Under the GDPR (European Economic Area and United Kingdom)</h3>
<p>You have the right to:</p>
<ul>
<li><strong>access</strong> the personal information held about you;</li>
<li><strong>correct</strong> information that is inaccurate or incomplete;</li>
<li><strong>delete</strong> your information, where it isn't needed to meet a legal obligation;</li>
<li><strong>object</strong> to how your information is used;</li>
<li>restrict how it's used and receive a copy in a portable format; and</li>
<li>complain to your local data protection authority.</li>
</ul>
<p>Order information is used to perform the contract you make when you buy a guide, to meet legal obligations such as tax record-keeping, and, for support, in our legitimate interest in answering your questions.</p>
<h3>Under the CCPA (California)</h3>
<p>California residents have the right to know what personal information is held about them and how it's used, to access it, to correct it, to request its deletion, and to limit its use. Shortcut Press does not sell personal information and does not share it for cross-context behavioral advertising. You won't be treated differently for exercising any of these rights.</p>

<h2 id="exercise">How to exercise your rights</h2>
<p>To make any request about your personal information, ${C}. To protect your information, we may ask you to confirm a detail of your order, such as the email address you used at checkout. Requests are answered within the time the law requires. Information stored only in your browser is under your control; you can view it in My Guides, export it, or delete it at any time.</p>

<h2 id="children">Children</h2>
<p>This website is not directed at children under 13, and Shortcut Press does not knowingly collect personal information from children under 13. If you believe a child has provided personal information, ${C} and it will be deleted.</p>

<h2 id="changes">Changes to this policy</h2>
<p>When this policy changes, the updated version is posted on this page with a new “Last updated” date. If a change materially affects how information from past orders is used, customers will be told by email before it takes effect.</p>

<h2>Questions</h2>
<p>For any question about this policy or your information, ${C}.</p>
`;

/* ---------- Terms of Service ---------- */
export const termsHtml = `
<h2 id="acceptance">Acceptance of these terms</h2>
<p>These terms apply to this website and to every purchase from Shortcut Press. By using the site or buying a product, you agree to them. If you don't agree, please don't buy or use the products.</p>

<h2 id="agreement">Agreeing before checkout</h2>
<p>Before you can go to checkout, you must agree to these Terms of Service and the <a href="refund-policy.html">Refund Policy</a>. On each product page, the buy button stays disabled until you tick the box that reads “I agree to the Terms of Service and Refund Policy”. Completing a purchase confirms that you agreed to both.</p>

<h2 id="products">What Shortcut Press sells</h2>
<p>Shortcut Press sells self-paced, interactive software skills guides that run in your web browser and are unlocked with a license code. Each guide includes lessons with step-by-step instructions, diagrams, quizzes, exercises with worked solutions, downloadable practice files, a keyboard shortcut trainer and progress tracking. The guides are self-study materials: they include no video lessons, no live instruction, no tutoring and no feedback on your work.</p>

<h2 id="license">Your personal-use license</h2>
<p>When you buy a guide, you receive a personal, non-transferable license to use that guide (or, for the Complete Software Skills Library, all seven guides) and its practice files for your own learning, on any devices you use. Anything you create while working through the exercises is yours.</p>

<h2 id="license-codes">License codes</h2>
<p>Your license code is for you alone. You may not share, publish, sell or transfer it, or post it where others can use it. You may also not resell, redistribute or upload the guides or practice files, share them with a class or with coworkers, or claim them as your own work.</p>

<h2 id="groups">Teachers, schools and companies</h2>
<p>Teachers, schools and companies who want to use the guides with a group can ask about a group license through the <a href="contact.html">Contact page</a>. A personal purchase does not cover group use.</p>

<h2 id="software">Software is not included</h2>
<p>The guides do not include any software. You are responsible for obtaining the software each guide covers, separately from its maker. Your use of that software is governed by its maker's own terms, not by these terms. All software names are trademarks of their respective owners, and Shortcut Press is not affiliated with or endorsed by any software maker.</p>

<h2 id="your-data">Your data and backups</h2>
<p>Your licenses and learning progress are stored only in your own browser. You are responsible for backing up that data using the Export backup feature in My Guides. Shortcut Press can't recover data that was stored only in your browser.</p>

<h2 id="payment">Prices, taxes and payment</h2>
<p>Prices are shown in US dollars on each product page. Payment is handled by a third-party payment provider at checkout, under its own terms, and applicable taxes are shown at checkout. Prices may change from time to time, but a change never affects a purchase you've already made.</p>

<h2 id="delivery">Delivery and refunds</h2>
<p>Products are delivered as described in the <a href="delivery-policy.html">Delivery Policy</a>. Refunds are handled as described in the <a href="refund-policy.html">Refund Policy</a>. Both policies form part of these terms.</p>

<h2 id="ownership">Ownership</h2>
<p>All content in the guides and on this website, including the text, diagrams, quizzes and practice files, is owned by Shortcut Press. Buying a guide gives you the license described above; it doesn't transfer ownership of any content.</p>

<h2 id="warranties">Warranties</h2>
<p>To the extent permitted by law, the guides are provided as they are, and Shortcut Press disclaims all warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose and non-infringement. No specific result from using a guide is promised; see the <a href="disclaimer.html">Disclaimer</a>. Nothing in these terms limits any right you have under consumer protection law that can't be limited by agreement; see <a href="consumer-rights.html">Consumer Rights</a>.</p>

<h2 id="liability">Limitation of liability</h2>
<p>To the extent permitted by law, Shortcut Press's total liability for any claim relating to a product or this website is limited to the amount you paid for the product concerned. Shortcut Press is not liable for indirect or consequential losses, including the loss of your own files, which is why the Disclaimer asks you to keep backups before practicing techniques on them.</p>

<h2 id="changes">Changes to these terms</h2>
<p>These terms may be updated from time to time. The current version is always posted on this page with its “Last updated” date. The terms in effect when you made a purchase apply to that purchase.</p>

<h2 id="contact">Contact</h2>
<p>For any question about these terms, ${C}.</p>
`;

/* ---------- Disclaimer ---------- */
export const disclaimerHtml = `
<h2>Self-study materials</h2>
<p>Shortcut Press guides are self-study materials. They are not tutoring, and they include no feedback on anyone's work. There are no video lessons and no live instruction.</p>

<h2>Results vary</h2>
<p>What you get out of a guide depends on your starting experience, the time you put in, and other individual factors. No specific result is promised from using any guide.</p>

<h2>Software changes over time</h2>
<p>Software makers change their programs over time, so steps in a guide may differ slightly in newer versions of a program until the guide is revised. Revised guides appear automatically the next time you open them.</p>

<h2>Keep backups of your own files</h2>
<p>Always back up your own files before practicing techniques on them. The practice files included with each guide are there so you can practice without touching your own work.</p>

<h2>Trademarks</h2>
<p>All software names mentioned on this website and in the guides are trademarks of their respective owners. They are used only to identify the programs the guides cover.</p>

<h2>Independence</h2>
<p>Shortcut Press is independent. It is not affiliated with, sponsored by or endorsed by any software maker, and the guides are not official materials of any software maker.</p>

<h2>Questions</h2>
<p>If you have a question about this disclaimer, ${C}.</p>
`;

/* ---------- Consumer Rights (EU, UK and US) ---------- */
export const consumerHtml = `
<h2>In short</h2>
<div class="summary-box"><ul>
<li>You can cancel any purchase and get a full refund within 14 days, without giving a reason.</li>
<li>Your statutory rights for digital content that is faulty or not as described are not affected by any of our policies.</li>
<li>Each purchase is a one-time payment. There are no subscriptions and nothing renews automatically.</li>
</ul></div>

<h2 id="trader">Who you're buying from</h2>
<p>You're buying from Shortcut Press. You can reach us through the <a href="contact.html">Contact page</a>, and we reply within two business days.</p>
<div data-legal-block hidden><p data-legal-lines></p></div>

<h2 id="what">What you're buying</h2>
<p>Each product is digital content: an interactive guide that runs in your web browser and is unlocked with a license code. The main characteristics, contents, level and software covered are described on each product's page before you buy.</p>
<ul>
<li><strong>What it works on:</strong> current versions of common web browsers (such as Chrome, Edge, Firefox and Safari) on a computer, tablet or phone, with JavaScript and site storage allowed.</li>
<li><strong>What it doesn't include:</strong> the software each guide teaches, which you obtain separately from its maker.</li>
<li><strong>How it's supplied:</strong> immediately after payment, on your order confirmation page, as described in the <a href="delivery-policy.html">Delivery Policy</a>.</li>
<li><strong>How long it lasts:</strong> online access continues for as long as Shortcut Press operates, and guides you've opened also work offline on that device.</li>
</ul>

<h2 id="price">Price</h2>
<p>Prices are shown in US dollars on each product page. The total you pay, including any applicable taxes, is shown at checkout before you confirm your payment.</p>

<h2 id="cancel">Your right to cancel</h2>
<p>If you live in the European Union or the United Kingdom, consumer law normally gives you 14 days to cancel a purchase made online. For digital content supplied straight away, that right can end once supply begins, if you agree to it. Shortcut Press doesn't ask you to give up that right: you can cancel any purchase within 14 days of buying and receive a full refund, whether or not you've started using the guide, and without giving a reason. This applies to every customer, wherever you live.</p>
<p>To cancel, ${C} and tell us that you're cancelling, which product, your order number and date, and the name and email address you used at checkout. Your refund is issued to your original payment method within 5 business days. The details are in the <a href="refund-policy.html">Refund Policy</a>.</p>

<h2 id="faulty">If something is faulty or not as described</h2>
<p>If a guide or practice file is faulty, doesn't work as described, or doesn't match its description, ${C}. We'll fix it or replace what's needed, and where that isn't possible, refund you. In the United Kingdom, the Consumer Rights Act 2015 gives you rights for digital content; in the European Union, the rules on digital content give you similar rights. Nothing in our policies limits those statutory rights.</p>

<h2 id="updates">Updates</h2>
<p>Software makers change their programs over time. When an update changes the steps in a guide, the guide is revised, and you see the revised version the next time you open it at no extra cost.</p>

<h2 id="complaints">Questions and complaints</h2>
<p>If you have a question or complaint about a purchase, ${C} with your order number. We reply within two business days.</p>
`;

/* ---------- About ---------- */
export const aboutHtml = `
<h2>What we make</h2>
<p>Shortcut Press makes interactive software skills guides that run in your web browser. Each guide takes one program and works through it lesson by lesson: every lesson explains a skill, breaks it into numbered steps with an original diagram, checks your understanding with a short quiz, and ends with a practice exercise and a worked solution. Practice files, a keyboard shortcut trainer and progress tracking come with every guide, and the spreadsheet guides add a formula sandbox you can type into.</p>
<p>There are seven guides, each covering one program, and a library that unlocks all seven with a single license. You can see the full list on the <a href="index.html#guides">home page</a>.</p>

<h2>Why written, interactive guides</h2>
<p>A written step stays put while you carry it out. You can read it, try it in the program, read it again, and move on when you're ready, without scrubbing back through a recording. Quizzes and exercises turn reading into doing, and the worked solutions show every step, not just the final answer.</p>
<p>Working on real files matters too. That's why every exercise comes with its own practice file, so you never start from an empty screen and never practice on your own work.</p>

<h2>How a lesson is put together</h2>
<ul>
<li><strong>Overview.</strong> What the skill is, with a diagram that shows the idea.</li>
<li><strong>Steps.</strong> Numbered instructions naming the menus and commands, with keyboard shortcuts shown the way you press them, like <kbd>Ctrl</kbd> <kbd>Z</kbd>.</li>
<li><strong>Check your understanding.</strong> A short quiz with an explanation for every answer.</li>
<li><strong>Practice.</strong> An exercise using a practice file, followed by a worked solution.</li>
</ul>

<h2>Your data stays with you</h2>
<p>Your licenses and progress are stored only in your own browser. Nothing you do in a guide is sent to us or anyone else. You can export a backup at any time from My Guides.</p>

<h2>What we don't do</h2>
<p>The guides are self-study material. ${SELF_STUDY} The guides don't include any software, and they don't come with certificates.</p>

<h2>Keeping guides current</h2>
<p>Software makers update their programs, and sometimes an update moves a menu or renames a button. When an update changes the steps in a guide, the guide is revised, and you see the revised version the next time you open it.</p>

<h2>Independent</h2>
<p>Shortcut Press is independent. It is not affiliated with, sponsored by or endorsed by any software maker. Software names appear on this site only to identify the programs the guides cover.</p>

<h2>Get in touch</h2>
<p>Questions about a guide, an order or a group license are welcome. <a href="contact.html">Contact us through the Contact page</a>.</p>
`;

/* ---------- FAQ ---------- */
export const FAQ = [
  {
    group: "Buying and delivery",
    items: [
      ["What exactly do I receive after purchase, and how?", `<p>You receive a license code for an interactive guide that runs in your web browser. Immediately after payment, you're shown your order confirmation page, which issues the code, activates it in that browser, and has an <strong>Open my guide</strong> button that takes you straight into the first lesson. You can also copy the code, save the confirmation as a PDF, or print it. Nothing is shipped. The <a href="delivery-policy.html">Delivery Policy</a> goes through each step.</p>`],
      ["What's inside a guide?", `<p>A series of lessons, each with step-by-step instructions, an original diagram, a short quiz and a practice exercise with a worked solution. Every guide also has downloadable practice files, a keyboard shortcut trainer for its program, and progress tracking with a Resume button. The two spreadsheet guides add a formula sandbox you can type formulas into. The Complete Software Skills Library unlocks all seven guides with one code.</p>`],
      ["Is there video or tutoring?", `<p>No. The guides are self-study material. ${SELF_STUDY} You read each step, carry it out in the software, then check your understanding and compare your work with the worked solutions.</p>`],
    ],
  },
  {
    group: "Licenses and devices",
    items: [
      ["How do licenses work?", `<p>Each purchase gives you a license code that starts with SCUT. The code is checked in your browser and unlocks the guide you bought; a Complete Software Skills Library code unlocks all seven guides. Activated licenses are saved in your browser on that device. Capitals, spaces and dashes don't matter when you type a code.</p>`],
      ["How do I use my guide on another device?", `<p>Open any page of this site on the other device, select <strong>My Guides</strong> in the bottom-left corner, and enter the same license code under <em>Add a license</em>. The same code works on all your devices. Progress is saved separately on each device; to move your progress, export a backup on one device and import it on the other.</p>`],
      ["I've lost my license code. What should I do?", `<p>If you still have a device where the guide is activated, open My Guides there: the code is listed under <em>License details</em>. Otherwise, ${C} with your order number and the email address you used at checkout, and we'll send your code again.</p>`],
      ["How do backups work?", `<p>Your licenses and progress are stored only in your own browser, so clearing your browser's data removes them. In My Guides, <strong>Export backup</strong> saves a small file with all your licenses and progress; <strong>Import backup</strong> restores it on any device. If you haven't made a backup in 30 days, My Guides reminds you.</p>`],
      ["Can I use the guides offline?", `<p>Yes. After a guide has been opened once in a browser, it keeps working on that device without an internet connection. Practice files you've already downloaded are available too. Updates to the site and the guides are picked up automatically the next time you're online.</p>`],
      ["Which devices are supported?", `<p>Any computer, tablet or phone with a current version of a common web browser, such as Chrome, Edge, Firefox or Safari, with JavaScript and site storage allowed. You can also install the site as an app from your browser's menu. To follow the steps you'll need the software the guide teaches, which most people use on a computer.</p>`],
    ],
  },
  {
    group: "Software and updates",
    items: [
      ["Is the software included?", `<p>No. The guides don't include any software. Each product page has a “Software required” section naming the program the guide uses. You obtain it separately from its maker, and your use of it is governed by the maker's own terms.</p>`],
      ["Which software versions are the guides written for?", `<p>The current versions of each program, using features that have stayed stable across recent versions. Software makers update their programs over time, so a menu may move or a button may be renamed between versions. Where steps differ between programs, such as Excel and Google Sheets, the guides show both.</p>`],
      ["What happens when the software updates?", `<p>When an update changes the steps in a guide, the guide is revised. You see the revised version automatically the next time you open the guide, at no extra cost.</p>`],
    ],
  },
  {
    group: "Choosing a guide",
    items: [
      ["Which guide should I start with?", `<p>Start with the program you already use or plan to use; each guide is complete on its own. If you're new to spreadsheet formulas, start with <a href="spreadsheet-formulas-functions.html">Spreadsheet Formulas &amp; Functions</a> before <a href="data-analysis-pivot-tables-charts.html">Data Analysis with Pivot Tables &amp; Charts</a>, which assumes you're comfortable with basic formulas and cell references.</p>`],
      ["What do the levels mean?", `<p><strong>Beginner</strong> guides assume no experience with the program. <strong>Beginner to intermediate</strong> guides start from the basics and go on to techniques for people who already know their way around. <strong>Intermediate</strong> guides assume you're comfortable with the program's basics.</p>`],
    ],
  },
  {
    group: "Licensing and refunds",
    items: [
      ["Can teachers, schools or companies use the guides with a group?", `<p>A standard purchase is a personal license for one person. It doesn't cover use with a class, students, coworkers or a team. If you'd like to use the guides with a group, ${C} about a group license, and include your organization's name and roughly how many people would use them.</p>`],
      ["Can I share my license code?", `<p>No. License codes may not be shared, published, sold or transferred. Each person who uses a guide needs their own purchase or a group license.</p>`],
      ["What is the refund policy?", `<p>You can get a full refund on any purchase if you ask within 14 days, with no reason needed. ${CC} with your order number. Refunds go to your original payment method within 5 business days of your request; your payment provider's processing time may add a few days. The license ends when a purchase is refunded. See the <a href="refund-policy.html">Refund Policy</a>.</p>`],
    ],
  },
];
