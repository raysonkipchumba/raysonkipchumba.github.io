const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

// Projects Expand / Collapse Logic
const compressedBlock = document.getElementById('projects-compressed-block');
const expandedContainer = document.getElementById('project-list-container');
const expandBtn = document.getElementById('expand-projects-btn');
const collapseBtn = document.getElementById('collapse-projects-btn');
const compressedItems = document.querySelectorAll('.compressed-item');

function expandProjects(targetIndex) {
    if (!compressedBlock || !expandedContainer) return;
    compressedBlock.hidden = true;
    expandedContainer.hidden = false;
    expandBtn?.setAttribute('aria-expanded', 'true');
    collapseBtn?.setAttribute('aria-expanded', 'true');

    // Trigger reveal if elements inside were not yet triggered
    const hiddenCards = expandedContainer.querySelectorAll('.project-card, .work-divider');
    hiddenCards.forEach(card => card.classList.add('visible'));

    if (typeof targetIndex === 'number') {
        const cards = expandedContainer.querySelectorAll('.project-card');
        if (cards[targetIndex]) {
            cards[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            cards[targetIndex].style.boxShadow = '16px 16px 0 var(--lime)';
            setTimeout(() => {
                cards[targetIndex].style.boxShadow = '';
            }, 1200);
            return;
        }
    }

    expandedContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function collapseProjects() {
    if (!compressedBlock || !expandedContainer) return;
    expandedContainer.hidden = true;
    compressedBlock.hidden = false;
    expandBtn?.setAttribute('aria-expanded', 'false');
    collapseBtn?.setAttribute('aria-expanded', 'false');
    compressedBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

expandBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    expandProjects();
});

collapseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    collapseProjects();
});

compressedItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        expandProjects(index);
    });

    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            expandProjects(index);
        }
    });
});
