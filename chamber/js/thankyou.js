// thankyou.js - JavaScript for the Thank You page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get the summary content container
    const summaryContent = document.getElementById('summary-content');
    
    if (summaryContent) {
        // Get URL parameters (form data)
        const urlParams = new URLSearchParams(window.location.search);
        
        // Required fields to display
        const requiredFields = [
            { param: 'first-name', label: 'First Name' },
            { param: 'last-name', label: 'Last Name' },
            { param: 'email', label: 'Email' },
            { param: 'phone', label: 'Phone Number' },
            { param: 'business-name', label: 'Business Name' },
            { param: 'timestamp', label: 'Application Date' }
        ];
        
        // Create HTML for each field
        let summaryHTML = '';
        
        requiredFields.forEach(field => {
            let value = urlParams.get(field.param);
            
            // Format timestamp to a readable date if it's the timestamp field
            if (field.param === 'timestamp' && value) {
                try {
                    const date = new Date(value);
                    value = date.toLocaleString();
                } catch (e) {
                    console.error('Error formatting date:', e);
                }
            }
            
            // Only add to summary if value exists
            if (value) {
                summaryHTML += `
                <div class="summary-item">
                    <div class="summary-label">${field.label}:</div>
                    <div class="summary-value">${value}</div>
                </div>`;
            }
        });
        
        // Add membership level if provided
        const membershipLevel = urlParams.get('membership-level');
        if (membershipLevel) {
            // Convert membership level code to readable text
            let membershipText = '';
            switch (membershipLevel) {
                case 'np':
                    membershipText = 'NP Membership (Non-Profit)';
                    break;
                case 'bronze':
                    membershipText = 'Bronze Membership';
                    break;
                case 'silver':
                    membershipText = 'Silver Membership';
                    break;
                case 'gold':
                    membershipText = 'Gold Membership';
                    break;
                default:
                    membershipText = membershipLevel;
            }
            
            summaryHTML += `
            <div class="summary-item">
                <div class="summary-label">Membership Level:</div>
                <div class="summary-value">${membershipText}</div>
            </div>`;
        }
        
        // If no data was found, show a message
        if (summaryHTML === '') {
            summaryHTML = '<p>No application data found. Please try submitting the form again.</p>';
        }
        
        // Insert the HTML into the summary content container
        summaryContent.innerHTML = summaryHTML;
    }
});
