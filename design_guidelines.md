# Travel Itinerary Generator - Design Guidelines

## Design Approach

**Reference-Based Design** drawing inspiration from Airbnb's visual-first travel aesthetic, Google Travel's clean itinerary organization, and TripAdvisor's location card patterns. This creates an inspiring, trustworthy travel planning experience.

**Core Principles:**
- Visual storytelling through destination imagery
- Scannable daily itineraries with clear hierarchy
- Seamless integration of maps and location data
- Mobile-responsive for on-the-go access

---

## Typography System

**Font Families:**
- Primary: Inter or similar (clean, modern sans-serif via Google Fonts)
- Display: Optional serif accent for hero headlines

**Type Scale:**
- Hero headline: text-5xl/text-6xl, font-bold
- Section headers: text-3xl/text-4xl, font-semibold
- Day headers: text-2xl, font-semibold
- Location names: text-xl, font-medium
- Body text: text-base, font-normal
- Supporting details (times, distances): text-sm, font-normal
- Captions: text-xs

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, and 16 for consistency (p-4, gap-6, mt-8, etc.)

**Container Strategy:**
- Full-width hero and map sections
- Content containers: max-w-6xl for main itinerary
- Form sections: max-w-2xl centered
- Card grids: max-w-7xl

**Grid Patterns:**
- Location cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Day itinerary sections: single column with nested location grids
- Restaurant/attraction details: 2-column layout on desktop (image + info)

---

## Page Structure & Sections

### 1. Hero Section (80-90vh)
Large hero image of a popular travel destination with centered form overlay. Form sits on semi-transparent, blurred backdrop for legibility.

**Form Elements:**
- Destination input (text field with location autocomplete)
- Date range picker (start/end dates)
- Duration selector (dropdown: 1-7 days)
- Primary CTA button ("Generate My Itinerary")

### 2. Itinerary Results Section
Appears after form submission, replacing hero or scrolling into view.

**Day-by-Day Cards:**
- Each day as expandable/collapsible section
- Day header with date and overview
- Timeline-style layout showing morning → afternoon → evening
- Time slots clearly marked (8:00 AM, 12:00 PM, 6:00 PM, etc.)

**Location Cards (Restaurants & Attractions):**
- Card layout: horizontal on desktop (image left, details right), stacked on mobile
- Image: 240px × 180px with rounded corners
- Content: Name (heading), type/category tag, brief description, estimated time/duration
- Transport suggestions between locations (icon + text)

### 3. Interactive Map Section (50vh minimum)
Full-width embedded Google Map showing all itinerary locations with day-coded markers. Include day filter controls above map.

### 4. Export/Actions Bar
Sticky or fixed positioning at bottom of itinerary:
- "Print Itinerary" button
- "Save as PDF" button  
- "Share" button with copy link functionality

---

## Component Library

### Cards
- Rounded corners (rounded-lg to rounded-xl)
- Subtle shadows for depth
- Hover states: slight lift effect (transform + shadow enhancement)
- Padding: p-4 to p-6 depending on content density

### Buttons
- Primary: Large, rounded, solid background with semi-transparent blur when over images
- Secondary: Outlined or ghost style
- Icon buttons for actions (share, print)
- No custom hover states when on blurred backgrounds (built-in states handle all contexts)

### Form Inputs
- Consistent height (h-12)
- Rounded borders (rounded-lg)
- Clear focus states
- Placeholder text for guidance
- Icons for date/location pickers

### Tags/Badges
- Small, rounded-full pills for categories (Restaurant, Museum, Park, etc.)
- Compact sizing (px-3 py-1, text-xs)

### Timeline/Schedule Indicators
- Vertical line connecting time slots
- Icons for meal times and activities
- Time stamps aligned left, content indented right

---

## Images

**Hero Image:**
Include a stunning, full-bleed hero image of an iconic travel destination (e.g., Paris skyline, tropical beach, mountain vista). Should evoke wanderlust and inspire travel planning.

**Location Images:**
AI-generated or placeholder images for each restaurant and attraction in the itinerary. Images should be:
- Authentic and representative of the location
- Consistently sized across all cards
- High quality with good aspect ratio (4:3 or 16:9)

**Image Placement:**
- Hero: Full-screen background
- Location cards: Left-aligned thumbnail (desktop) or top (mobile)
- Map section: No decorative images, focus on map functionality

---

## Responsive Behavior

**Mobile (base):**
- Single column layouts
- Stacked cards
- Condensed form (full-width inputs)
- Collapsible day sections for easier scanning
- Bottom-fixed export bar

**Tablet (md:):**
- 2-column location grids
- Side-by-side form fields where appropriate
- Expanded map height

**Desktop (lg:):**
- 3-column location grids for variety
- Horizontal card layouts with images
- Spacious padding and generous whitespace

---

## Interactive Elements

**Map Integration:**
- Custom markers color-coded by day
- Info windows on marker click showing location name and time
- Toggle controls to show/hide specific days
- Route lines connecting locations in daily order

**Itinerary Cards:**
- Expand/collapse functionality for day sections
- Smooth animations for state changes
- Loading states during AI generation (skeleton screens or spinners)

**Form Behavior:**
- Real-time validation
- Autocomplete for destination input
- Loading indicator during itinerary generation
- Success state transition to results

---

## Accessibility

- Semantic HTML (main, section, article for itinerary days)
- ARIA labels for interactive map controls
- Keyboard navigation for all form inputs and buttons
- Sufficient contrast ratios throughout
- Focus indicators on all interactive elements
- Alt text for all images (destinations, restaurants, attractions)

---

## Special Considerations

**Loading States:**
Since AI generation takes time, include engaging loading experience:
- Progress indicator showing generation stages ("Finding restaurants...", "Mapping routes...")
- Skeleton screens for itinerary cards
- Subtle animations to maintain user engagement

**Empty States:**
Clear messaging when no itinerary exists yet, prompting user to fill out the form.

**Error States:**
Friendly error messages if AI generation fails, with retry options.

This design creates a visually compelling, highly functional travel planning experience that balances inspiration with practical itinerary organization.