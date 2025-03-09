class AuthManager {
    constructor() {
        this.users = [];
        this.currentUser = null;
    }

    register(email, password) {
        const userExists = this.users.some(user => user.email === email);
        if (userExists) {
            throw new Error('User already exists');
        }
        
        const newUser = { email, password, id: Date.now() };
        this.users.push(newUser);
        return newUser;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            return user;
        }
        throw new Error('Invalid credentials');
    }

    logout() {
        this.currentUser = null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Dropdown menu functionality
    const dropdownItems = document.querySelectorAll('.main-nav li');
    
    dropdownItems.forEach(item => {
        const dropdownMenu = item.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            item.addEventListener('mouseenter', () => dropdownMenu.style.display = 'block');
            item.addEventListener('mouseleave', () => dropdownMenu.style.display = 'none');
        }
    });

    // Mobile navigation toggle
    const createMobileMenu = () => {
        if (document.querySelector('.mobile-menu-toggle')) return;
        
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const mobileToggle = document.createElement('button');

        mobileToggle.classList.add('mobile-menu-toggle');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        header.insertBefore(mobileToggle, nav);
        
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileToggle.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    };

    // Adjust mobile menu on resize
    const checkWindowSize = () => {
        if (window.innerWidth <= 768) createMobileMenu();
    };

    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => button.style.transform = 'scale(1.05)');
        button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)');
    });

    // Pregnancy Calculator Logic
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const year = parseInt(document.getElementById('year').value);
            const month = parseInt(document.getElementById('month').value) - 1; // Months are 0-indexed
            const day = parseInt(document.getElementById('day').value);

            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                alert('Please enter a valid date.');
                return;
            }

            const conceptionDate = new Date(year, month, day);
            const dueDate = new Date(conceptionDate);
            dueDate.setDate(conceptionDate.getDate() + 280); // Approximate pregnancy duration

            document.getElementById('result').innerHTML = `
                <strong>Estimated Due Date:</strong> ${dueDate.toDateString()}
            `;
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            document.getElementById('year').value = '';
            document.getElementById('month').value = '';
            document.getElementById('day').value = '';
            document.getElementById('result').innerHTML = '';
        });
    }

    // ✅ Fix: Sidebar Navigation Redirect
    const pregnancyLink = document.querySelector('.sidebar-section a[href="pregnancy-calculator.html"]');

    if (pregnancyLink) {
        pregnancyLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            window.location.href = 'pregnancy-calculator.html'; // Redirect
        });
    }

    // Smooth scrolling for internal links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
});
