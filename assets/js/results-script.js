document.addEventListener('DOMContentLoaded', () => {
    const resultsGrid = document.getElementById('results-list-grid');

    const renderResultsLinks = (results) => {
        if (!resultsGrid) return;
        
        // Clear loading text
        resultsGrid.innerHTML = ''; 

        // Sort results by date, newest first
        const sortedResults = results.sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedResults.forEach(race => {
            const card = document.createElement('div');
            card.classList.add('results-card');

            // Safely retrieve properties with fallback defaults
            const name = race.name ?? 'Unknown Event';
            const distance = race.distance ?? '';
            const dateDisplay = race.dateDisplay ?? 'Date TBC';
            const resultsUrl = race.resultsUrl ?? '#';

            card.innerHTML = `
                <span class="distance">${distance}</span>
                <h3>${name}</h3>
                <span class="date">${dateDisplay}</span>
                <a href="${resultsUrl}" class="btn" target="_blank" rel="noopener noreferrer">
                    View Full Results &rarr;
                </a>
            `;
            resultsGrid.appendChild(card);
        });
    };

    // --- Main Fetch Call ---
    fetch('./data/results-archive.json')
        .then(response => {
            if (!response.ok) {
                // Throw an error if the HTTP status is not 200-299
                throw new Error(`HTTP error! Status: ${response.status} fetching results-archive.json`);
            }
            return response.json(); 
        })
        .then(data => {
            if (data.length === 0) {
                 resultsGrid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; padding: 40px 0;">No historical results found in the archive.</p>';
                 return;
            }
            renderResultsLinks(data);
        })
        .catch(error => {
            console.error('Error loading results archive:', error);
            // Display a user-friendly error message on the page
            if (resultsGrid) {
                resultsGrid.innerHTML = `<p class="error-message" style="text-align:center; grid-column: 1 / -1; padding: 40px 0; color: var(--color-primary);">
                    **Error:** We couldn't load the results archive. Please check the **data/results-archive.json** file.
                </p>`;
            }
        });
});