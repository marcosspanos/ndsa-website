class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.today = new Date();
        
        this.events = {
            
        };
        
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderCalendar();
        window.calendarInstance = this;
    }
    
    bindEvents() {
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');
        
        prevBtn.addEventListener('click', () => this.previousMonth());
        nextBtn.addEventListener('click', () => this.nextMonth());
    }
    
    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    }
    
    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }
    
    renderCalendar() {
        const monthHeader = document.getElementById('currentMonth');
        const calendarGrid = document.querySelector('.calendar-grid');
        
        monthHeader.textContent = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
        
        const dayHeaders = calendarGrid.querySelectorAll('.day-header');
        calendarGrid.innerHTML = '';
        
        dayHeaders.forEach(header => {
            calendarGrid.appendChild(header);
        });
        
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
        
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayElement = this.createDayElement(daysInPrevMonth - i, false);
            calendarGrid.appendChild(dayElement);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day, true);
            calendarGrid.appendChild(dayElement);
        }
        
        const totalCells = calendarGrid.children.length - 7;
        const remainingCells = 42 - totalCells;
        
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(day, false);
            calendarGrid.appendChild(dayElement);
        }
    }
    
    createDayElement(day, isCurrentMonth) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        
        if (isCurrentMonth) {
            dayElement.classList.add('current-month');
            
            if (this.currentYear === this.today.getFullYear() &&
                this.currentMonth === this.today.getMonth() &&
                day === this.today.getDate()) {
                dayElement.classList.add('today');
            }
            
            const eventKey = `${this.currentYear}-${this.currentMonth + 1}-${day}`;
            if (this.events[eventKey]) {
                dayElement.classList.add('event');
                dayElement.title = this.events[eventKey];
            }
        }
        
        return dayElement;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    new Calendar();
    initializeNewsletterForms();
});

function initializeNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form, .quick-newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
    
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const form = e.target;
    
    if (form.classList.contains('newsletter-form')) {
        const preferences = {
            events: form.querySelector('input[name="events"]')?.checked || false,
            general: form.querySelector('input[name="general"]')?.checked || false
        };
        
        subscribeToNewsletter(email, preferences);
    } else {
        subscribeToNewsletter(email, { events: true, general: true });
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        addToMailingList: formData.get('add-to-mailing-list') === 'on'
    };
    
    submitContactForm(data);
}

function subscribeToNewsletter(email, preferences = {}) {
    console.log('Newsletter subscription:', { email, preferences });
    
    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = '✓ Subscribed!';
        button.style.background = '#4caf50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            event.target.reset();
        }, 2000);
    }, 1000);
    
    alert(`Thank you for subscribing to our newsletter!\n\nEmail: ${email}\nPreferences: ${Object.keys(preferences).filter(key => preferences[key]).join(', ')}`);
}

function submitContactForm(data) {
    console.log('Contact form submission:', data);
    
    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = '✓ Sent!';
        button.style.background = '#4caf50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            event.target.reset();
        }, 2000);
    }, 1000);
    
    let message = `Thank you for your message!\n\nWe'll get back to you soon.`;
    if (data.addToMailingList) {
        message += '\n\nYou have also been added to our mailing list for event updates.';
    }
    
    alert(message);
}

function initTabs() {
    const navLinks = document.querySelectorAll('nav a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            link.classList.add('active');
            
            const targetTab = link.getAttribute('href').substring(1);
            const targetContent = document.getElementById(targetTab);
            
            if (targetContent) {
                targetContent.classList.add('active');
                
                if (targetTab === 'events') {
                    setTimeout(() => {
                        if (window.calendarInstance) {
                            window.calendarInstance.renderCalendar();
                        }
                    }, 100);
                }
            }
        });
    });
    
    const homeLink = document.querySelector('nav a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
}

function switchTab(targetTab) {
    const navLinks = document.querySelectorAll('nav a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(l => l.classList.remove('active'));
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    const targetLink = document.querySelector(`nav a[href="#${targetTab}"]`);
    const targetContent = document.getElementById(targetTab);
    
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    if (targetContent) {
        targetContent.classList.add('active');
        
        if (targetTab === 'events') {
            setTimeout(() => {
                if (window.calendarInstance) {
                    window.calendarInstance.renderCalendar();
                }
            }, 100);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.hero, .calendar-section, .upcoming-events');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    initializeEventFiltering();
});

function initializeEventFiltering() {
    const eventsSection = document.querySelector('.upcoming-events');
    if (!eventsSection) return;
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'event-filters';
    filterContainer.innerHTML = `
        <h3>Filter Events:</h3>
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Events</button>
            <button class="filter-btn" data-filter="student-housing">Student Housing</button>
            <button class="filter-btn" data-filter="social">Social</button>
            <button class="filter-btn" data-filter="support">Support</button>
            <button class="filter-btn" data-filter="educational">Educational</button>
            <button class="filter-btn" data-filter="creative">Creative</button>
        </div>
    `;
    
    const eventList = eventsSection.querySelector('.event-list');
    eventsSection.insertBefore(filterContainer, eventList);
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterEvents(filter);
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

function filterEvents(filter) {
    const eventItems = document.querySelectorAll('.event-item');
    
    eventItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
            item.style.opacity = '1';
        } else {
            const tags = item.querySelectorAll('.tag');
            let hasTag = false;
            
            tags.forEach(tag => {
                if (tag.classList.contains(filter)) {
                    hasTag = true;
                }
            });
            
            if (hasTag) {
                item.style.display = 'flex';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        }
    });
}
