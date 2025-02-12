$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer-invertido/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});


//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


// timeline --------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Select all events and corresponding text IDs
    const events = document.querySelectorAll('.event');
    const today = new Date();
    const currentYear = today.getFullYear(); // Use the current year
    let closestEvent = null;
    let closestDate = null;
    let closestTextId = '';

    events.forEach((event, index) => {
        const dateText = event.querySelector('.mesano').textContent.trim();
        const [day, month] = dateText.split('/').map(Number);
        const eventDate = new Date(currentYear, month - 1, day); // Assume current year

        if (!closestDate || Math.abs(eventDate - today) < Math.abs(closestDate - today)) {
            closestDate = eventDate;
            closestEvent = event;
            closestTextId = `text${index + 1}`;
        }
    });

    // If a closest event was found, activate it
    if (closestEvent) {
        showText(closestTextId, closestEvent);
    }
});

window.addEventListener('resize', updateTimelineLine);

function showText(textId, clickedEvent) {
    // Remove activetimeline class from all events and text contents
    const events = document.querySelectorAll('.event');
    const texts = document.querySelectorAll('.text-content');
    
    events.forEach(event => event.classList.remove('activetimeline'));
    texts.forEach(text => text.classList.remove('activetimeline'));

    // Add activetimeline class to the clicked event and the corresponding text
    clickedEvent.classList.add('activetimeline');
    const activetimelineText = document.getElementById(textId);
    if (activetimelineText) {
        activetimelineText.classList.add('activetimeline');
    }

    // Update the line animation
    updateTimelineLine();
}

function updateTimelineLine() {
    const activetimelineEvent = document.querySelector('.event.activetimeline');
    if (activetimelineEvent) {
        // Get the bounding rectangle of the activetimeline event and the timeline
        const clickedEventRect = activetimelineEvent.getBoundingClientRect();
        const timelineRect = document.querySelector('.timeline').getBoundingClientRect();

        // Calculate the position of the center of the clicked event relative to the timeline
        const centerX = clickedEventRect.left + clickedEventRect.width / 2 - timelineRect.left;

        // Set the width of the timeline line to end at the center of the clicked event
        document.querySelector('.timeline-line').style.width = `${centerX}px`;
    }
}
