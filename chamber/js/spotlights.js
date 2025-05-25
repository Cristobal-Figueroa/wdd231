// JavaScript for displaying member spotlights on the home page

document.addEventListener('DOMContentLoaded', function() {
    // Fetch member data for spotlights
    fetchMembersForSpotlights();
});

// Fetch member data from JSON file
async function fetchMembersForSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displaySpotlights(data);
    } catch (error) {
        console.error('Error fetching member data for spotlights:', error);
        document.getElementById('spotlights-container').innerHTML = '<p class="error">Failed to load member spotlights. Please try again later.</p>';
    }
}

// Display random gold and silver members as spotlights
function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlights-container');
    
    // Filter for gold and silver members (levels 3 and 2)
    const eligibleMembers = members.filter(member => member.membershipLevel >= 2);
    
    // If we don't have enough eligible members, show an error
    if (eligibleMembers.length < 2) {
        spotlightsContainer.innerHTML = '<p class="error">Not enough spotlight members available.</p>';
        return;
    }
    
    // Shuffle the eligible members array
    const shuffledMembers = shuffleArray(eligibleMembers);
    
    // Select the first 3 members (or 2 if there are only 2 eligible members)
    const numberOfSpotlights = Math.min(3, shuffledMembers.length);
    const spotlightMembers = shuffledMembers.slice(0, numberOfSpotlights);
    
    // Clear the container
    spotlightsContainer.innerHTML = '';
    
    // Create spotlight cards for each selected member
    spotlightMembers.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.className = 'spotlight-card';
        
        // Determine membership level text
        let membershipText = '';
        if (member.membershipLevel === 3) {
            membershipText = '<span class="badge gold">Gold Member</span>';
        } else if (member.membershipLevel === 2) {
            membershipText = '<span class="badge silver">Silver Member</span>';
        }
        
        // Create card HTML
        spotlightCard.innerHTML = `
            <div class="spotlight-header">
                <img src="images/${member.image}" alt="${member.name} Logo" class="spotlight-logo">
                <h3>${member.name} ${membershipText}</h3>
            </div>
            <div class="spotlight-info">
                <p>${member.description}</p>
                <p class="contact-info">${member.phone}</p>
                <p class="contact-info">${member.address}</p>
                <p class="website"><a href="${member.website}" target="_blank">Visit Website</a></p>
            </div>
        `;
        
        spotlightsContainer.appendChild(spotlightCard);
    });
}

// Fisher-Yates shuffle algorithm to randomize array
function shuffleArray(array) {
    // Create a copy of the array to avoid modifying the original
    const shuffled = [...array];
    
    // Shuffle the array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}
