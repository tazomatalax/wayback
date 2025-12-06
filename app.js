// Wayback Nostalgia - Main Application Logic

// Curated list of popular websites from different eras
const websitesByEra = {
    '1996-1999': [
        'yahoo.com', 'geocities.com', 'altavista.com', 'excite.com', 'lycos.com',
        'hotmail.com', 'aol.com', 'netscape.com', 'webcrawler.com', 'infoseek.com',
        'angelfire.com', 'tripod.com', 'fortunecity.com', 'xoom.com', 'theglobe.com',
        'cnn.com', 'bbc.co.uk', 'nytimes.com', 'washingtonpost.com', 'usatoday.com',
        'amazon.com', 'ebay.com', 'craigslist.org', 'slashdot.org', 'wired.com',
        'cnet.com', 'zdnet.com', 'download.com', 'tucows.com', 'winfiles.com',
        'espn.com', 'weather.com', 'mapquest.com', 'classmates.com', 'sixdegrees.com',
        'deja.com', 'salon.com', 'pathfinder.com', 'whitehouse.gov', 'nasa.gov',
        'imdb.com', 'ign.com', 'gamespot.com', 'bluemountain.com', 'thepalace.com',
        'icq.com', 'mirabilis.com', 'real.com', 'shockwave.com', 'macromedia.com'
    ],
    '2000-2005': [
        'google.com', 'napster.com', 'kazaa.com', 'limewire.com', 'blogger.com',
        'livejournal.com', 'friendster.com', 'myspace.com', 'orkut.com', 'hi5.com',
        'wikipedia.org', 'mozilla.org', 'firefox.com', 'opera.com', 'netscape.com',
        'newgrounds.com', 'albinoblacksheep.com', 'homestarrunner.com', 'ebaums.com', 'fark.com',
        'somethingawful.com', 'luelinks.net', 'gaia.com', 'neopets.com', 'runescape.com',
        'stumbleupon.com', 'del.icio.us', 'digg.com', 'slashdot.org', 'reddit.com',
        'flickr.com', 'photobucket.com', 'imageshack.us', 'tinypic.com', 'deviantart.com',
        'miniclip.com', 'addictinggames.com', 'kongregate.com', 'armor.com', 'flash.com',
        'aim.com', 'msn.com', 'yahoo.com', 'skype.com', 'paypal.com',
        'torrentspy.com', 'mininova.org', 'thepiratebay.org', 'isohunt.com', 'demonoid.com'
    ],
    '2006-2010': [
        'facebook.com', 'twitter.com', 'youtube.com', 'myspace.com', 'linkedin.com',
        'tumblr.com', 'wordpress.com', 'blogger.com', 'typepad.com', 'techcrunch.com',
        'digg.com', 'reddit.com', 'stumbleupon.com', 'delicious.com', 'fark.com',
        'flickr.com', 'photobucket.com', 'picasa.google.com', 'smugmug.com', 'shutterfly.com',
        'yelp.com', 'urbanspoon.com', 'tripadvisor.com', 'groupon.com', 'livingsocial.com',
        'hulu.com', 'netflix.com', 'pandora.com', 'last.fm', 'grooveshark.com',
        'farmville.com', 'mafiawars.com', 'zynga.com', 'playfirst.com', 'popcap.com',
        'techcrunch.com', 'engadget.com', 'gizmodo.com', 'lifehacker.com', 'mashable.com',
        'huffingtonpost.com', 'buzzfeed.com', 'cracked.com', 'collegehumor.com', 'funnyordie.com',
        'ning.com', 'friendfeed.com', 'plurk.com', 'jaiku.com', 'pownce.com'
    ],
    '2011-2015': [
        'instagram.com', 'pinterest.com', 'snapchat.com', 'vine.co', 'periscope.tv',
        'whatsapp.com', 'telegram.org', 'viber.com', 'line.me', 'kik.com',
        'twitch.tv', 'justin.tv', 'ustream.tv', 'livestream.com', 'bambuser.com',
        'spotify.com', 'soundcloud.com', 'bandcamp.com', 'mixcloud.com', 'rdio.com',
        'medium.com', 'quora.com', 'stackexchange.com', 'stackoverflow.com', 'github.com',
        'kickstarter.com', 'indiegogo.com', 'patreon.com', 'gofundme.com', 'crowdtilt.com',
        'airbnb.com', 'uber.com', 'lyft.com', 'seamless.com', 'grubhub.com',
        'candy.com', 'zynga.com', 'supercell.com', 'rovio.com', 'king.com',
        'imgur.com', 'giphy.com', 'gfycat.com', 'deviantart.com', 'behance.net',
        'producthunt.com', 'designernews.com', 'dribbble.com', 'awwwards.com', 'sidebar.io'
    ]
};

// Application state
let currentEra = null;
let recentUrls = [];
const maxRecentUrls = 10;

// DOM elements
const eraButtons = document.querySelectorAll('.era-btn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const retryBtn = document.getElementById('retryBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.querySelector('.error-message');
const metadata = document.getElementById('metadata');
const iframeContainer = document.getElementById('iframeContainer');
const waybackFrame = document.getElementById('waybackFrame');
const welcome = document.getElementById('welcome');
const originalUrl = document.getElementById('originalUrl');
const archiveDate = document.getElementById('archiveDate');
const selectedEra = document.getElementById('selectedEra');

// Initialize app
function init() {
    loadRecentUrls();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    eraButtons.forEach(btn => {
        btn.addEventListener('click', () => selectEra(btn.dataset.era));
    });

    nextBtn.addEventListener('click', () => loadRandomSite());
    shuffleBtn.addEventListener('click', () => shuffleAnyEra());
    retryBtn.addEventListener('click', () => loadRandomSite());
}

// Select an era
function selectEra(era) {
    currentEra = era;
    
    // Update button states
    eraButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.era === era);
    });

    // Enable next button
    nextBtn.disabled = false;

    // Load a random site from the selected era
    loadRandomSite();
}

// Shuffle and select any random era
function shuffleAnyEra() {
    const eras = Object.keys(websitesByEra);
    const randomEra = eras[Math.floor(Math.random() * eras.length)];
    selectEra(randomEra);
}

// Load a random site from the current era
async function loadRandomSite() {
    if (!currentEra) {
        return;
    }

    showLoading();
    hideError();
    hideMetadata();
    hideIframe();
    hideWelcome();

    try {
        const site = await findAvailableArchive(currentEra);
        if (site) {
            displayArchive(site);
        } else {
            showError('Unable to find an available archive. Please try again.');
        }
    } catch (err) {
        console.error('Error loading site:', err);
        showError('An error occurred while searching for archives. Please try again.');
    }
}

// Find an available archive for the selected era
async function findAvailableArchive(era, maxAttempts = 5) {
    const websites = websitesByEra[era];
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // Select random website
        const domain = getRandomDomain(websites);
        
        // Generate random timestamp within era
        const timestamp = getRandomTimestamp(era);
        
        // Check if this URL was recently shown
        const urlKey = `${domain}-${timestamp}`;
        if (recentUrls.includes(urlKey)) {
            continue; // Skip this one and try another
        }

        // Query Wayback Machine API
        const archiveUrl = await checkWaybackAvailability(domain, timestamp);
        
        if (archiveUrl) {
            // Add to recent URLs
            addToRecentUrls(urlKey);
            
            return {
                domain,
                timestamp,
                archiveUrl,
                era
            };
        }
    }

    return null;
}

// Get random domain from list, avoiding recent ones
function getRandomDomain(domains) {
    const availableDomains = domains.filter(d => {
        // Check if this domain was used recently
        return !recentUrls.some(url => url.startsWith(d));
    });

    // If all domains were recent, use the full list
    const domainsToUse = availableDomains.length > 0 ? availableDomains : domains;
    return domainsToUse[Math.floor(Math.random() * domainsToUse.length)];
}

// Generate random timestamp within era range
function getRandomTimestamp(era) {
    const [startYear, endYear] = era.split('-').map(Number);
    
    // Random year
    const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
    
    // Random month (1-12)
    const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    
    // Random day (1-28 to avoid month issues)
    const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    
    return `${year}${month}${day}`;
}

// Check Wayback Machine availability API
async function checkWaybackAvailability(domain, timestamp) {
    try {
        const url = `https://archive.org/wayback/available?url=${domain}&timestamp=${timestamp}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        
        if (data.archived_snapshots && data.archived_snapshots.closest) {
            return data.archived_snapshots.closest.url;
        }

        return null;
    } catch (err) {
        console.error('Error checking availability:', err);
        return null;
    }
}

// Display the archived site
function displayArchive(site) {
    hideLoading();
    showMetadata();
    showIframe();

    // Update metadata
    originalUrl.textContent = site.domain;
    originalUrl.href = `http://${site.domain}`;
    
    // Format archive date
    const year = site.timestamp.substring(0, 4);
    const month = site.timestamp.substring(4, 6);
    const day = site.timestamp.substring(6, 8);
    archiveDate.textContent = `${year}-${month}-${day}`;
    
    selectedEra.textContent = site.era;

    // Load iframe
    waybackFrame.src = site.archiveUrl;
}

// UI state management functions
function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function showMetadata() {
    metadata.classList.remove('hidden');
}

function hideMetadata() {
    metadata.classList.add('hidden');
}

function showIframe() {
    iframeContainer.classList.remove('hidden');
}

function hideIframe() {
    iframeContainer.classList.add('hidden');
}

function hideWelcome() {
    welcome.classList.add('hidden');
}

// localStorage management
function loadRecentUrls() {
    try {
        const stored = localStorage.getItem('wayback-recent-urls');
        if (stored) {
            recentUrls = JSON.parse(stored);
        }
    } catch (err) {
        console.error('Error loading recent URLs:', err);
        recentUrls = [];
    }
}

function addToRecentUrls(urlKey) {
    recentUrls.unshift(urlKey);
    
    // Keep only the most recent URLs
    if (recentUrls.length > maxRecentUrls) {
        recentUrls = recentUrls.slice(0, maxRecentUrls);
    }

    // Save to localStorage
    try {
        localStorage.setItem('wayback-recent-urls', JSON.stringify(recentUrls));
    } catch (err) {
        console.error('Error saving recent URLs:', err);
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
