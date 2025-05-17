// JavaScript for the Directory page

document.addEventListener('DOMContentLoaded', function() {
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');
    const directoryContainer = document.getElementById('directory-container');
    
    // Toggle between grid and list views
    if (gridBtn && listBtn && directoryContainer) {
        gridBtn.addEventListener('click', function() {
            directoryContainer.classList.add('grid');
            directoryContainer.classList.remove('list');
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
        });
        
        listBtn.addEventListener('click', function() {
            directoryContainer.classList.add('list');
            directoryContainer.classList.remove('grid');
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            
            // Hide images in list view
            document.querySelectorAll('.directory-card img').forEach(img => {
                img.style.display = 'none';
            });
        });
        
        gridBtn.addEventListener('click', function() {
            // Show images in grid view
            document.querySelectorAll('.directory-card img').forEach(img => {
                img.style.display = 'block';
            });
        });
    }
    
    // Fetch and display member data
    fetchMemberData();
});

async function fetchMemberData() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
        document.getElementById('directory-container').innerHTML = '<p class="error">Failed to load member data. Please try again later.</p>';
    }
}

function displayMembers(data) {
    const container = document.getElementById('directory-container');
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Loop through each member and create a card
    data.forEach(member => {
        const card = document.createElement('div');
        card.className = 'directory-card';
        
        // Determine membership level badge
        let membershipBadge = '';
        if (member.membershipLevel === 3) {
            membershipBadge = '<span class="badge gold">Gold Member</span>';
        } else if (member.membershipLevel === 2) {
            membershipBadge = '<span class="badge silver">Silver Member</span>';
        }
        
        // Create card HTML
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <div class="card-content">
                <h2>${member.name} ${membershipBadge}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            </div>
        `;
        
        container.appendChild(card);
    });
}
