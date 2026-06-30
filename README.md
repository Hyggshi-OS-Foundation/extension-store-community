# NexCode Extension Marketplace

A professional extension marketplace website for NexCode IDE, built with HTML, CSS, and JavaScript, featuring Supabase database integration.

## Features

- **Modern UI**: Dark theme matching VS Code marketplace aesthetic
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Search Functionality**: Real-time search across extension names, descriptions, authors, and tags
- **Extension Details Modal**: Click any extension to view full details
- **Copy to Clipboard**: One-click copy of installation commands
- **Supabase Integration**: Database-backed extension storage with fallback to mock data
- **Star Ratings**: Visual star rating system
- **Installation Counts**: Formatted numbers (K/M) for large install counts

## Project Structure

```
extension-store-community/
├── index.html              # Main HTML file
├── styles.css              # Complete styling with CSS variables
├── script.js               # JavaScript functionality with Supabase integration
├── supabase-setup.sql      # Database schema and sample data
└── README.md               # This file
```

## Quick Start

### Option 1: Use Mock Data (No Database Required)

Simply open `index.html` in your browser. The website will automatically use the built-in mock data with 9 sample extensions.

### Option 2: Use Supabase Database

#### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be ready

#### Step 2: Set Up the Database

1. Open your Supabase project
2. Go to the **SQL Editor** tab
3. Copy the contents of `supabase-setup.sql`
4. Paste into the SQL Editor
5. Click **Run** to execute the SQL

This will create:
- `extensions` table with all necessary fields
- Indexes for faster queries
- Sample data (9 extensions)
- Row Level Security policies

#### Step 3: Configure the Website

1. Open `index.html` in a text editor
2. Find the Supabase configuration section (or edit `script.js`)
3. Replace the placeholder values with your Supabase credentials:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

4. Get your credentials from Supabase:
   - Go to **Project Settings** → **API**
   - Copy the **Project URL** (e.g., `https://xyz.supabase.co`)
   - Copy the **anon/public** key

#### Step 4: Run the Website

Open `index.html` in your browser. The website will now fetch extensions from your Supabase database.

## Database Schema

### extensions table

| Field | Type | Description |
|-------|------|-------------|
| id | TEXT | Primary key (e.g., `ms-python.python`) |
| name | TEXT | Extension display name |
| author | TEXT | Author name |
| author_url | TEXT | Author website URL |
| description | TEXT | Extension description |
| version | TEXT | Semantic version (e.g., `1.0.0`) |
| installs | BIGINT | Number of installations |
| rating | DECIMAL(3,2) | Average rating (0.00-5.00) |
| rating_count | INTEGER | Number of ratings |
| price | TEXT | Price (e.g., "Free", "$9.99") |
| categories | TEXT[] | Array of categories |
| tags | TEXT[] | Array of tags |
| last_updated | DATE | Last update date |
| icon | TEXT | Icon identifier for SVG |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last modification time |

## Adding New Extensions

### Via Supabase Dashboard

1. Go to your Supabase project
2. Navigate to **Table Editor** → **extensions**
3. Click **Insert row**
4. Fill in the extension details
5. Click **Save**

### Via SQL

```sql
INSERT INTO extensions (id, name, author, description, version, installs, rating, rating_count, price, categories, tags, icon)
VALUES (
    'publisher.extension-name',
    'Extension Name',
    'Author Name',
    'Extension description here',
    '1.0.0',
    1000,
    4.5,
    50,
    'Free',
    ARRAY['Category1', 'Category2'],
    ARRAY['tag1', 'tag2', 'tag3'],
    'python'
);
```

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --background-primary: #1e1e1e;
    --background-secondary: #252526;
    --accent-color: #007acc;
    /* ... more variables */
}
```

### Adding New Icons

Add new SVG icons to the `iconSVGs` object in `script.js`:

```javascript
const iconSVGs = {
    // ... existing icons
    myicon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Your SVG code here -->
    </svg>`
};
```

### Modifying the Header

Edit the navigation tabs in `index.html`:

```html
<nav class="nav-tabs">
    <a href="#" class="nav-tab active">NexCode</a>
    <!-- Add or remove tabs here -->
</nav>
```

## Features Explained

### Search
- Real-time filtering as you type
- Searches across name, description, author, and tags
- Case-insensitive matching

### Modal Details
- Click any extension card to open details
- Shows full description, categories, and tags
- Installation command with copy button
- Rating and install statistics

### Responsive Design
- Desktop: Multi-column grid layout
- Tablet: 2-column grid
- Mobile: Single column with stacked elements

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Technologies Used

- **HTML5**: Structure
- **CSS3**: Styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Functionality
- **Supabase**: Backend database and authentication
- **SVG**: Icons and graphics

## Security

- Row Level Security (RLS) enabled on database
- Public read access for extensions
- Authenticated write access for management
- No sensitive data exposed in client-side code

## Performance

- Optimized CSS with minimal repaints
- Efficient DOM manipulation
- Indexed database queries
- Lazy loading ready (extensions load on demand)

## Troubleshooting

### Extensions not loading from Supabase

1. Check browser console for errors
2. Verify Supabase URL and API key are correct
3. Ensure the `extensions` table exists in your database
4. Check that RLS policies are configured correctly

### Styling issues

1. Clear browser cache
2. Verify `styles.css` is loading (check Network tab in DevTools)
3. Check for CSS syntax errors in console

### Search not working

1. Ensure `script.js` is loaded after the DOM
2. Check that `searchInput` element exists in HTML
3. Verify no JavaScript errors in console

## Next Steps

- Add user authentication for publishing extensions
- Implement extension rating system
- Add extension screenshots gallery
- Create admin panel for managing extensions
- Add extension categories filtering
- Implement pagination for large extension lists
- Add dark/light theme toggle
- Integrate with NexCode IDE for direct installation

## License

This project is part of the NexCode extension store community.

## Support

For issues or questions, please refer to the NexCode documentation or create an issue in the project repository.