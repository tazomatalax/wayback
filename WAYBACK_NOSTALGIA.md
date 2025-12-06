# Wayback Nostalgia - Random Website Time Machine

A static single-page application that displays random archived websites from the Internet Archive's Wayback Machine, allowing users to discover forgotten corners of the internet from specific eras.

## Features

- **Time Period Selection**: Choose from four distinct eras:
  - 1996-1999: Dawn of the Web
  - 2000-2005: Dot-com Era
  - 2006-2010: Web 2.0
  - 2011-2015: Social Media Boom

- **Random Website Discovery**: Explore random archived websites from a curated list of 100-200 popular domains from each era

- **Shuffle Function**: Get random pages from any time period with a single click

- **Metadata Display**: View original URL, archive date, and selected era for each site

- **Open in New Tab**: Option to open archived sites in a new browser tab

- **Recent URL Tracking**: Uses localStorage to avoid showing the same sites repeatedly

- **Responsive Design**: Works seamlessly on mobile and desktop devices

## Usage

### Accessing the Application

The application is available at: `https://[your-username].github.io/wayback/`

### How to Use

1. **Select a Time Period**: Click on one of the four era buttons to choose a time period
2. **View Random Site**: The application automatically loads a random archived website from that era
3. **Next Random**: Click the "Next Random" button to see another site from the same era
4. **Shuffle Any Era**: Click "Shuffle Any Era" to get a random site from any time period
5. **Open in New Tab**: If the iframe doesn't display properly, use the "Open in New Tab" button

## Technical Details

### Technology Stack

- **Pure HTML/CSS/JavaScript**: No build step required
- **Wayback Machine Integration**: Direct URL construction for archived pages
- **localStorage API**: Tracks recently shown URLs to prevent repeats
- **Responsive CSS**: Mobile-first design with flexbox and grid layouts

### Curated Website Lists

The application includes curated lists of popular websites from each era, including:
- News sites (CNN, BBC, New York Times)
- Early social media (GeoCities, MySpace, Friendster)
- Forums and communities (Slashdot, Something Awful)
- Flash game sites (Newgrounds, Miniclip, Kongregate)
- File sharing sites (Napster, Kazaa, The Pirate Bay)
- Search engines (Yahoo, AltaVista, Google)
- And many more!

### How It Works

1. User selects a time period
2. Application randomly selects a domain from the curated list for that era
3. Generates a random timestamp within the selected year range
4. Constructs a direct Wayback Machine URL: `https://web.archive.org/web/{timestamp}/{domain}`
5. Displays the archived page in an iframe
6. Tracks the URL in localStorage to avoid repeats

### Browser Compatibility

The application works in all modern browsers that support:
- ES6 JavaScript features
- CSS Grid and Flexbox
- localStorage API
- iframe with sandbox attributes

### Known Limitations

- Some archived pages may not display properly in iframes due to security restrictions
- Use the "Open in New Tab" button as an alternative for blocked content
- The Wayback Machine may not have archived versions for all sites/dates
- Loading times vary depending on the size of archived pages

## Deployment

### GitHub Pages Setup

1. Ensure the files are in the root directory or a `docs` folder
2. Go to repository Settings → Pages
3. Select the source branch (usually `main` or `gh-pages`)
4. Choose the root folder or `/docs` folder
5. Save and wait for deployment

The site will be available at: `https://[username].github.io/[repository-name]/`

## Files

- `index.html` - Main HTML structure
- `style.css` - Responsive styling
- `app.js` - Core application logic

## Contributing

Contributions are welcome! You can:
- Add more websites to the curated lists
- Improve the UI/UX design
- Add new features
- Report bugs or suggest enhancements

## License

This project follows the repository's license (GNU General Public License v3.0).

## Disclaimer

This project is not affiliated with the Internet Archive. All archived content is accessed through the official Wayback Machine service.

## Credits

- Powered by the [Internet Archive Wayback Machine](https://archive.org/web/)
- Created as part of the Wayback project
