document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        // Update icon
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Email contact card functionality
    const emailContact = document.getElementById('email-contact');
    const emailContent = document.getElementById('email-content');
    
    emailContact.addEventListener('click', () => {
        emailContent.classList.toggle('visible');
    });
    
    // Project overlay functionality
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger overlay when clicking the GitHub link
            if (e.target.closest('.github-link')) {
                return;
            }
            
            const projectId = card.getAttribute('data-project-id');
            createProjectOverlay(projectId);
        });
    });

    function createProjectOverlay(projectId) {
        // Create overlay container
        const overlay = document.createElement('div');
        overlay.className = 'project-overlay';
        
        let overlayContent = '';
        
        switch(projectId) {
            case 'smart-gimbal':
                overlayContent = `
                    <div class="overlay-content">
                        <h2>Smart Gimbal Controller</h2>
                        <div class="overlay-close">&times;</div>
                        
                        <div class="overlay-section">
                            <h3>Core Technologies</h3>
                            <ul>
                                <li>C# and .NET for the core control system</li>
                                <li>JavaScript with a modern framework for frontend</li>
                                <li>HTML5/CSS3 for user interface</li>
                                <li>Entity Framework for database interactions</li>
                            </ul>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>System Architecture</h3>
                            <ul>
                                <li>Model-View-Controller (MVC) pattern for the web interface</li>
                                <li>RESTful API architecture for communication between components</li>
                                <li>Microservices approach for different gimbal control functions</li>
                                <li>Hardware abstraction layer for interfacing with various gimbal models</li>
                            </ul>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>Key Features</h3>
                            <ul>
                                <li>Real-time motion control algorithms</li>
                                <li>Camera stabilization systems</li>
                                <li>User authentication and permission management</li>
                                <li>Telemetry data visualization</li>
                                <li>Pre-programmed movement patterns</li>
                            </ul>
                        </div>
                        
                        <a href="https://github.com/OmerMersin/SmartGimbalController" class="btn primary" target="_blank">View on GitHub</a>
                    </div>
                `;
                break;
                
            case 'video-stab':
                overlayContent = `
                    <div class="overlay-content">
                        <h2>Video Stabilization Library</h2>
                        <div class="overlay-close">&times;</div>
                        
                        <div class="overlay-section">
                            <h3>Core Technologies</h3>
                            <ul>
                                <li>C++ as the primary programming language</li>
                                <li>OpenCV for image processing and computer vision operations</li>
                                <li>CMake build system for cross-platform compatibility</li>
                                <li>CUDA for GPU acceleration of critical algorithms</li>
                            </ul>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>Stabilization Techniques</h3>
                            <ul>
                                <li>Feature detection and matching algorithms (SIFT/SURF/ORB)</li>
                                <li>Homography transformation for frame alignment</li>
                                <li>Moving average filtering for trajectory smoothing</li>
                                <li>Kalman filtering for motion prediction</li>
                            </ul>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>Architecture</h3>
                            <ul>
                                <li>Object-oriented design with modular components</li>
                                <li>Pipeline architecture for video frame processing</li>
                                <li>Multi-threading capabilities for performance optimization</li>
                                <li>Dependency on Eigen for matrix operations and linear algebra</li>
                            </ul>
                        </div>
                        
                        <a href="https://github.com/OmerMersin/video-stab" class="btn primary" target="_blank">View on GitHub</a>
                    </div>
                `;
                break;
                
            case 'pdf-editor':
                overlayContent = `
                    <div class="overlay-content">
                        <h2>Online PDF Editor</h2>
                        <div class="overlay-close">&times;</div>
                        
                        <div class="overlay-section">
                            <h3>Core Technologies</h3>
                            <ul>
                                <li>Java as the primary backend language</li>
                                <li>JavaScript for frontend interactivity</li>
                                <li>HTML5/CSS3 for user interface structure and styling</li>
                            </ul>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>Framework & Libraries</h3>
                            <ul>
                                <li>Spring Boot for the backend framework</li>
                                <li>Apache PDFBox for PDF manipulation and rendering</li>
                                <li>jQuery for DOM manipulation</li>
                                <li>Bootstrap for responsive design components</li>
                            </ul>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>Architecture</h3>
                            <ul>
                                <li>MVC (Model-View-Controller) architecture</li>
                                <li>RESTful API design for client-server communication</li>
                                <li>Single-page application approach for the frontend</li>
                            </ul>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>Key Features</h3>
                            <ul>
                                <li>PDF text editing and annotation</li>
                                <li>Page manipulation (add, delete, reorder)</li>
                                <li>Form filling capabilities</li>
                                <li>Document merging and splitting</li>
                                <li>Image insertion and manipulation within PDFs</li>
                            </ul>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>Development Tools</h3>
                            <ul>
                                <li>Maven for dependency management and build automation</li>
                                <li>Git for version control</li>
                                <li>Tomcat for application deployment</li>
                            </ul>
                        </div>
                        
                        <a href="https://github.com/OmerMersin/Pdf" class="btn primary" target="_blank">View on GitHub</a>
                    </div>
                `;
                break;
        }
        
        overlay.innerHTML = overlayContent;
        body.appendChild(overlay);
        
        // Prevent scrolling when overlay is open
        body.style.overflow = 'hidden';
        
        // Add animation class after a slight delay for transition effect
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        
        // Close overlay when clicking X or outside the content
        const closeButton = overlay.querySelector('.overlay-close');
        closeButton.addEventListener('click', closeOverlay);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        });
        
        // Close with escape key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeOverlay();
                document.removeEventListener('keydown', escHandler);
            }
        };
        
        document.addEventListener('keydown', escHandler);
        
        function closeOverlay() {
            overlay.classList.remove('active');
            setTimeout(() => {
                body.removeChild(overlay);
                body.style.overflow = 'auto';
            }, 300); // Match this with CSS transition time
        }
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Animation on scroll (simple version)
    const fadeInElements = document.querySelectorAll('.project-card, .about-content, .contact-card');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });
    
    document.addEventListener('fade-in', () => {
        fadeInElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    });
    
    // Trigger fade-in for initial view
    setTimeout(() => {
        document.dispatchEvent(new Event('fade-in'));
    }, 300);
});
