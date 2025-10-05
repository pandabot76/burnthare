document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle Logic
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

    // 2. Race Data Fetching and Rendering
    const racesGrid = document.getElementById('races-grid');
    const heroSection = document.getElementById('hero-section'); // <-- Reference to the container
    const heroBanner = document.getElementById('hero-banner');
    const racesDropdown = document.getElementById('races-dropdown');

    // --- Helper function to render the dropdown menu ---
    const renderDropdownMenu = (races) => {
        if (!racesDropdown) return; 

        races.forEach(race => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${race.link ?? '#races'}">${race.title ?? 'Unknown Race'}</a>`; 
            racesDropdown.appendChild(li);
        });
    };
    
    // --- Helper function to render all race cards ---
    const renderRaceCards = (races) => {
        if (!racesGrid) return;
        racesGrid.innerHTML = ''; // Clear loading message
        races.forEach(race => {
            const card = document.createElement('div');
            card.classList.add('race-card');
            
            const title = race.title ?? 'Event Title Missing';
            const subtitle = race.subtitle ?? 'A great event.';
            const cta = race.cta ?? 'View Details';
            const link = race.link ?? '#races';
            
            card.innerHTML = `
                <span class="distance">${race.distance ?? ''}</span>
                <h3>${title}</h3>
                <span class="date">${race.dateDisplay ?? 'Date TBC'}</span>
                <p>${subtitle}</p>
                <a href="${link}" class="btn">${cta}</a>
            `;
            racesGrid.appendChild(card);
        });
    };

    // --- Main Fetch Call ---
    fetch('./data/races.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} for races.json`);
            }
            return response.json(); 
        })
        .then(races => {
            // 1. Populate the Navigation Dropdown
            renderDropdownMenu(races);

            // 2. Sort races by date to find the 'next' one
            const sortedRaces = races.sort((a, b) => new Date(a.date) - new Date(b.date));
            const now = new Date();
            const nextRace = sortedRaces.find(race => new Date(race.date) > now);

            // 3. Render the Hero Banner
            if (nextRace && heroBanner && heroSection) {
                
                // === FIX: APPLY BACKGROUND IMAGE TO THE heroSection CONTAINER ===
                const promoImageUrl = nextRace.promoImage ?? '';
                // Since the JSON is now root-relative, this path will work correctly on index.html and subpages.
                if (promoImageUrl) {
                    heroSection.style.backgroundImage = `url('${promoImageUrl}')`; 
                }
                // =============================================================

                const title = nextRace.title?.toUpperCase() ?? 'NEXT RACE';
                const dateDisplay = nextRace.dateDisplay ?? 'DATE TBC';
                const subtitle = nextRace.subtitle ?? 'Join us for the next ultimate challenge.';
                const link = nextRace.link ?? '#races';
                const cta = nextRace.cta?.toUpperCase() ?? 'REGISTER NOW';

                heroBanner.innerHTML = `
                    <span class="next-race-banner">NEXT UP: ${title} - ${dateDisplay}</span>
                    <h1>Hitchin's Premier Endurance Events</h1>
                    <p>${subtitle}</p>
                    <a href="${link}" class="btn">${cta}</a>
                `;
            } else {
                // Fallback if NO future race is found 
                if(heroBanner) {
                    heroBanner.innerHTML = `
                        <h1>Challenge Your Limits</h1>
                        <p>Registration for our next season of events opens soon! Check the grid below for details.</p>
                        <a href="/support" class="btn">Stay Updated</a>
                    `;
                    // Clear any previous image if no race is found
                    if(heroSection) heroSection.style.backgroundImage = 'none';
                }
            }

            // 4. Render all races in the main grid
            renderRaceCards(races);
        })
        .catch(error => {
            console.error('Error loading or processing race data:', error);
            
            if(racesGrid) {
                racesGrid.innerHTML = '<p style="text-align:center; color: var(--color-primary); padding: 40px 0;">Could not load race events. Please check the **data/races.json** file content for syntax errors or check the browser console for details.</p>';
            }

            if(heroBanner) {
                heroBanner.innerHTML = `
                    <h1>Data Load Error</h1>
                    <p>We are experiencing issues loading our event schedule.</p>
                    <a href="/support" class="btn">Contact Support</a>
                `;
            }
        });
});