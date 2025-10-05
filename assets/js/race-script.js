document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Toggle Logic (No changes needed)
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    document.documentElement.setAttribute('data-theme', storedTheme);
    themeToggle.textContent = storedTheme === 'dark' ? '💡 Light Mode' : '🌙 Dark Mode';

    themeToggle.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '💡 Light Mode' : '🌙 Dark Mode';
    });

    // 2. Race Data Loading and Rendering
    const raceId = document.getElementById('race-id-selector').getAttribute('data-race-id');
    
    // Check if the race ID is present
    if (!raceId) {
        console.error("No race ID found for data loading.");
        return;
    }

    // Wrap the execution in an async IIFE or use top-level async for cleaner await usage
    // Using a top-level async wrapper for better error handling:
    (async function loadRaceData() {
        try {
            // --- FETCH RACE DATA ---
            const raceResponse = await fetch('../data/races.json');
            if (!raceResponse.ok) {
                 throw new Error(`Failed to fetch races.json: Status ${raceResponse.status}`);
            }
            const races = await raceResponse.json();
            const raceData = races.find(r => r.id === raceId);

            if (!raceData) {
                document.getElementById('race-title-hero').textContent = `Race ID: ${raceId} Not Found`;
                return;
            }

            // --- FETCH TESTIMONIALS DATA (Safe fetch with fallback) ---
            let testimonials = [];
            try {
                const testimonialResponse = await fetch('../data/testimonials.json');
                if (testimonialResponse.ok) {
                    testimonials = await testimonialResponse.json();
                } else {
                    console.warn(`Testimonials file not found or failed to load (Status: ${testimonialResponse.status}). Proceeding without testimonials.`);
                }
            } catch (e) {
                 console.warn("Could not load testimonials.json due to network/syntax error. Proceeding without testimonials.", e);
            }

            // --- Inject Data into Page (Using Optional Chaining and Nullish Coalescing) ---
            
            // SEO & Header (Safely access title)
            const title = raceData.title ?? 'Race Details';
            document.getElementById('page-title').textContent = `${title} | Burnt Hare Events`;
            document.getElementById('race-title-hero').textContent = title;
            document.getElementById('race-date-hero').textContent = `Date: ${raceData.dateDisplay ?? 'TBC'}`;

            // Hero Image (Safely access promoImage)
            document.getElementById('race-hero').style.backgroundImage = `url('${raceData.promoImage ?? ''}')`;

            // Overview & Map (Safely access description and map)
            document.getElementById('race-description').textContent = raceData.description ?? 'A full description is coming soon.';
            const courseMapImage = document.getElementById('course-map-image');
            courseMapImage.src = raceData.courseMap ?? '#';
            courseMapImage.alt = `${title} Course Map`;

            // Entry Sidebar (Safely access distance, date, cost)
            document.getElementById('sidebar-distance').textContent = raceData.distance ?? 'Distance TBC';
            document.getElementById('sidebar-date').textContent = raceData.dateDisplay ?? 'Date TBC';
            document.getElementById('sidebar-cost').textContent = raceData.cost ?? 'Price TBC';
            
            const entryButton = document.getElementById('entry-button');
            entryButton.href = raceData.bookingLink ?? '#';
            entryButton.textContent = `ENTER ${title.toUpperCase()}`;

            // Inject Testimonials
            const relevantTestimonials = testimonials.filter(t => t.race_id === raceId);
            const testimonialsContainer = document.getElementById('testimonials-container');
            
            if (relevantTestimonials.length > 0 && testimonialsContainer) {
                relevantTestimonials.forEach(t => {
                    const card = document.createElement('div');
                    card.classList.add('testimonial-card');
                    card.innerHTML = `
                        <p>"${t.quote ?? 'Feedback missing.'}"</p>
                        <p style="margin-top: 10px;">**— ${t.author ?? 'Anonymous'}**</p>
                    `;
                    testimonialsContainer.appendChild(card);
                });
            } else if (testimonialsContainer) {
                 testimonialsContainer.innerHTML = '<p style="margin-top: 20px; font-style: italic;">Be the first to leave a review for this event!</p>';
            }

        } catch (error) {
            console.error('CRITICAL ERROR loading race data:', error);
            // Fallback for the entire page crash
            document.getElementById('race-title-hero').textContent = "Critical Error Loading Race Data";
            document.getElementById('race-description').textContent = "There was a critical error fetching the event data. Please check the console for details, or ensure the server is running and data files are valid.";
        }
    })(); // Execute the async function
});