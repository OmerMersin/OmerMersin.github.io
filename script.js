document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-pressed', 'true');
    } else {
        themeToggle.setAttribute('aria-pressed', 'false');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        // Update icon
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
            themeToggle.setAttribute('aria-pressed', 'true');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
            themeToggle.setAttribute('aria-pressed', 'false');
        }
    });
    
    // Email contact card functionality
    const emailContact = document.getElementById('email-contact');
    const emailContent = document.getElementById('email-content');

    function toggleEmailCard() {
        emailContent.classList.toggle('visible');
        emailContact.setAttribute('aria-expanded', emailContent.classList.contains('visible') ? 'true' : 'false');
    }

    emailContact.addEventListener('click', toggleEmailCard);
    emailContact.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleEmailCard();
        }
    });
    
    // Project overlay functionality
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger overlay when clicking GitHub link
            if (e.target.closest('.github-link')) return;

            // Details button + clicking anywhere else on the card both open overlay
            if (e.target.closest('.details-link')) {
                e.preventDefault();
                e.stopPropagation();
            }

            const projectId = card.getAttribute('data-project-id');
            createProjectOverlay(projectId);
        });
        
        // Also add click handler to details button specifically
        const detailsBtn = card.querySelector('.details-link');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const projectId = card.getAttribute('data-project-id');
                createProjectOverlay(projectId);
            });
        }
    });

    function createProjectOverlay(projectId) {
        // Create overlay container
        const overlay = document.createElement('div');
        overlay.className = 'project-overlay';
        
        let overlayContent = '';
        
        switch(projectId) {
            case 'lionav':
                overlayContent = `
                    <div class="overlay-content">
                        <h2>LIONav</h2>
                        <div class="overlay-close">&times;</div>
                        
                        <div class="overlay-section">
                            <h3>Project Overview</h3>
                            <p>LIONav is a modular ROS 2 autonomy stack for GPS-denied drone navigation. It fuses LiDAR and IMU for real-time localization, builds GPU TSDF/ESDF maps, plans through flyable graph structures, runs an always-on Smart RTL path, and exposes both web and native ground-station bridges.</p>
                        </div>

                        <div class="overlay-section">
                            <h3>What Problem It Solves</h3>
                            <ul>
                                <li>Autonomous operation in obstacle-dense environments where GPS is unavailable</li>
                                <li>Reduced pilot workload through layered autonomy and fallback behavior</li>
                                <li>Continuously valid return-pathing via Smart RTL rather than naive history replay</li>
                                <li>Field operation support through project recording, replay, and map lifecycle tooling</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Visual Demonstrations</h3>
                            <div class="image-gallery">
                                <div class="gallery-item">
                                    <img src="output.gif" alt="LIONav mission replay GIF">
                                    <p class="image-caption">Real-time shortest return-to-launch path discovery</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="output2.gif" alt="LIONav point cloud and trajectory GIF">
                                    <p class="image-caption">Live mapping output: point cloud evolution, trajectory updates, and planner response</p>
                                </div>
                            </div>
                        </div>

                        <div class="overlay-section">
                            <h3>Launch-Orchestrated Architecture (flyable_autonomy.launch.py)</h3>
                            <ul>
                                <li>FAST_LIO for LiDAR-inertial odometry and registered clouds</li>
                                <li>nvblox_fastlio_bridge for GPU TSDF/ESDF mapping</li>
                                <li>pose_graph_backend for iSAM2 global consistency and loop closure</li>
                                <li>flyable_pose_graph_builder + planner for ESDF-validated graph planning</li>
                                <li>smart_rtl_planner_node for always-on obstacle-aware return pathing</li>
                                <li>lionav_planner_manager for Level 0-5 autonomy and fallback orchestration</li>
                                <li>lionav_project_manager for recording, replay, and map/project lifecycle</li>
                                <li>ardupilot_mavlink_bridge for FCU command and setpoint integration</li>
                                <li>lionav_web_bridge + web server for browser telemetry and viewing</li>
                                <li>lionav_native_bridge for UDP binary native GCS connectivity</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Smart RTL (Flagship Differentiator)</h3>
                            <ul class="overlay-kpi-list">
                                <li>Hybrid model with dynamic local tail and persistent static corridor memory</li>
                                <li>Anchor selection balancing local traversal cost and remaining route cost</li>
                                <li>Monotonic progress guards and static-path repair when ESDF invalidates segments</li>
                                <li>Safer than naive backtracking because it adapts to updated free space and obstacles</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Planner Manager Autonomy Ladder</h3>
                            <ul>
                                <li>Level 0: Failsafe control</li>
                                <li>Level 1: Pure backtrack</li>
                                <li>Level 2: Shortcut backtrack with validation</li>
                                <li>Level 3: In-map navigation</li>
                                <li>Level 4: Risk-limited exploration</li>
                                <li>Level 5: Full frontier-style exploration</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Ground Station Software (lionav_viewer_gcs)</h3>
                            <ul>
                                <li>C++17 + Qt6 cockpit with OpenGL 3D point cloud, pose, path, and Smart RTL overlays</li>
                                <li>Telemetry and autonomy-state supervision with event and notification feeds</li>
                                <li>Project browser operations: record, list, load, replay, seek, speed control</li>
                                <li>Dual RGB/thermal stream workflows with operator controls and visualization layers</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Quantified Scope</h3>
                            <ul class="overlay-kpi-list">
                                <li>Launch footprint: 11 declared nodes, 5 included launch files, 1 additional process</li>
                                <li>Core package set in this autonomy pipeline: 11 packages</li>
                                <li>Custom ROS interfaces across key packages: 40 files</li>
                                <li>lionav_planner_manager: 17 custom msg/srv/action interfaces</li>
                                <li>lionav_project_manager: 18 custom msg/srv/action interfaces</li>
                                <li>Approximate key-package code volume: ~43k lines (.cpp/.hpp/.py/.yaml)</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Current Status / In Progress</h3>
                            <ul>
                                <li>Some project-manager export and GCS sync paths are present as TODO service stubs</li>
                                <li>Several subsystems are launch-toggle optional (collision shield, MAVLink bridge, GPU viewer, IMU transform)</li>
                                <li>Stack is optimized for Jetson/edge deployment while remaining modular for desktop testing</li>
                            </ul>
                        </div>
                        
                        <a href="https://github.com/OmerMersin/LIONav" class="btn primary" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                    </div>
                `;
                break;

            case 'smart-gimbal':
                overlayContent = `
                    <div class="overlay-content">
                        <h2>Smart Gimbal Manager</h2>
                        <div class="overlay-close">&times;</div>
                        
                        <div class="overlay-section">
                            <h3>Project Overview</h3>
                            <p>Smart Gimbal Manager is a professional-grade UAV ground control station built at Dronetools for real-time payload control, telemetry, video operations, and geospatial mission workflows. It is implemented as a Windows WPF desktop application on .NET 6 with an MVVM architecture.</p>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>Core Capabilities</h3>
                            <ul>
                                <li>Multi-protocol gimbal control abstraction for BaseCam, Viewlink, and DJI payloads</li>
                                <li>Dual-map workflow: 2D/3D mapping with live aircraft tracking and camera footprint projection</li>
                                <li>Low-latency video integration with FFmpeg/MPV and OpenCV-based enhancement/stabilization</li>
                                <li>Geo-targeting and terrain-aware calculations (ray-terrain intersection, geodetic transforms)</li>
                                <li>Mission tooling: telemetry replay, project folders, KML/KMZ workflows, and recording exports</li>
                            </ul>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>Architecture & Stack</h3>
                            <ul>
                                <li>C# 13 + .NET 6 + WPF frontend following MVVM separation of concerns</li>
                                <li>Protocol and comms stack: MQTT, protobuf, TCP/UDP, REST, SignalR</li>
                                <li>Map technologies: GMap.NET, Esri ArcGIS Runtime, WebView2/Cesium integration</li>
                                <li>Video stack: FFmpeg, MPV, Emgu.CV/OpenCV, ONVIF camera support</li>
                                <li>Modular solution organization across 40+ projects for scalability</li>
                            </ul>
                        </div>
                        
                        <div class="overlay-section">
                            <h3>Technical Highlights</h3>
                            <ul class="overlay-kpi-list">
                                <li>Factory/strategy driven protocol extensibility for multiple gimbal ecosystems</li>
                                <li>Geospatial algorithms for footprint projection and terrain intersection accuracy</li>
                                <li>Integrated telemetry, video, mapping, and control in a single operational desktop UX</li>
                                <li>Production-focused resilience with structured logging and fault handling</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Application Gallery</h3>
                            <div class="image-gallery">
                                <div class="gallery-item">
                                    <img src="images/Smart Gimbal Manager/Screenshot 2025-07-21 133609.png" alt="Main Dashboard">
                                    <p class="image-caption">Main control dashboard with live gimbal and payload state</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="images/Smart Gimbal Manager/Screenshot 2025-07-21 133741.png" alt="Camera Settings">
                                    <p class="image-caption">Camera parameter tuning and sensor configuration view</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="images/Smart Gimbal Manager/Screenshot 2025-07-21 133829.png" alt="Gimbal Control">
                                    <p class="image-caption">High-precision yaw, pitch, and roll control interface</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="images/Smart Gimbal Manager/Screenshot 2025-07-21 134122.png" alt="Stabilization Settings">
                                    <p class="image-caption">Stabilization module setup and controller tuning</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="images/Smart Gimbal Manager/Screenshot 2025-07-21 134251.png" alt="Tracking Interface">
                                    <p class="image-caption">Target tracking view with operator intervention support</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="images/Smart Gimbal Manager/Screenshot 2025-07-21 134337.png" alt="Map Integration">
                                    <p class="image-caption">Map-integrated situational awareness and mission context</p>
                                </div>
                            </div>
                        </div>
                        
                        <a href="https://github.com/OmerMersin/SmartGimbalController" class="btn primary" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                    </div>
                `;
                break;

            case 'video-stab':
                overlayContent = `
                    <div class="overlay-content">
                        <h2>Video Stabilization Engine</h2>
                        <div class="overlay-close">&times;</div>

                        <div class="overlay-section">
                            <h3>Project Overview</h3>
                            <p>libtracker (video-stab) is a modular C++17 library for real-time video stabilization and ultra-low-latency RTSP streaming. It combines OpenCV, CUDA, GStreamer, and DeepStream, and is optimized for NVIDIA Jetson edge deployments.</p>
                        </div>

                        <div class="overlay-section">
                            <h3>Problem & Solution</h3>
                            <ul>
                                <li>Solves the latency-vs-quality tradeoff in edge video systems</li>
                                <li>Supports true passthrough for minimal delay when processing is not needed</li>
                                <li>Provides GPU-accelerated processing mode for stabilization, roll correction, and tracking</li>
                                <li>Allows instant mode switching without dropping RTSP clients</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Architecture Snapshot</h3>
                            <ul>
                                <li>gstd passthrough pipeline for encoded low-overhead routing</li>
                                <li>gstd processing pipeline for decode -> process -> re-encode flow</li>
                                <li>interpipe-based switching between pipelines at runtime</li>
                                <li>RTSP output server with stable client connectivity across mode changes</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Key Features</h3>
                            <ul class="overlay-kpi-list">
                                <li>GPU stabilization with box/gaussian/kalman smoothing and adaptive modes</li>
                                <li>GPU roll correction via Canny + Hough with temporal smoothing</li>
                                <li>Image enhancement chain (CLAHE, denoise, gamma, white balance, sharpen)</li>
                                <li>DeepStream object detection/tracking with selectable target highlighting</li>
                                <li>Config-driven runtime behavior with hot-reload and optional REST updates</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Performance Notes (Project Docs)</h3>
                            <ul class="overlay-kpi-list">
                                <li>Passthrough mode: ~10-20 ms added latency</li>
                                <li>Processing mode: ~50-100 ms added latency</li>
                                <li>Jetson Orin-class hardware with CUDA acceleration</li>
                                <li>Built for real-time robotics and drone FPV use cases</li>
                            </ul>
                        </div>

                        <a href="https://github.com/OmerMersin/video-stab" class="btn primary" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                    </div>
                `;
                break;

            case 'robotaxi':
                overlayContent = `
                    <div class="overlay-content">
                        <h2>TEKNOFEST Robotaxi (Team Mekatek)</h2>
                        <div class="overlay-close">&times;</div>

                        <div class="overlay-section">
                            <h3>Awards & Outcome</h3>
                            <p>Our team, Mekatek, achieved 3rd place and received the Best Team Spirit Award in the TEKNOFEST Robotaxi Full-Scale Autonomous Vehicle competition. We participated for 3 consecutive years and improved the stack each season.</p>
                        </div>

                        <div class="overlay-section">
                            <h3>Competition Gallery</h3>
                            <div class="image-gallery">
                                <div class="gallery-item">
                                    <img src="teknofest1.jpeg" alt="TEKNOFEST Robotaxi - Team photo 1">
                                    <p class="image-caption">TEKNOFEST Robotaxi - Team Mekatek</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="teknofest2.jpeg" alt="TEKNOFEST Robotaxi - Team photo 2">
                                    <p class="image-caption">Competition field and team operations</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="teknofest3.jpeg" alt="TEKNOFEST Robotaxi - Team photo 3">
                                    <p class="image-caption">The autonomous vehicle featured on national television</p>
                                </div>
                                <div class="gallery-item">
                                    <img src="teknofest4.jpeg" alt="TEKNOFEST Robotaxi - Team photo 4">
                                    <p class="image-caption">The vehicle being presented to the delegation and ministers</p>
                                </div>
                            </div>
                        </div>

                        <div class="overlay-section">
                            <h3>My Technical Contributions</h3>
                            <ul>
                                <li>Drivable-area detection using real-time image processing</li>
                                <li>Label/sign detection with YOLO for scene interpretation</li>
                                <li>Autonomous driving algorithm design with multi-sensor fusion</li>
                                <li>Decision-making logic combining perception outputs and vehicle state</li>
                            </ul>
                        </div>

                        <div class="overlay-section">
                            <h3>Year-over-Year Engineering Progress</h3>
                            <ul class="overlay-kpi-list">
                                <li>Improved perception reliability under changing track conditions</li>
                                <li>Refined fusion logic for more stable driving decisions</li>
                                <li>Reduced failure cases through iterative system testing</li>
                                <li>Strengthened team workflow and competition readiness across 3 years</li>
                            </ul>
                        </div>

                        <div class="project-links">
                            <a href="https://cdn.t3kys.com/media/upload/userFormUpload/S2zQDD78jTrgGQ8giJVPf4P3l6sOHqiW.pdf" class="btn primary" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-file-pdf"></i> Team Proof
                            </a>
                            <a href="https://www.teknofest.org/en/competitions/robotaxi-full-scale-autonomous-vehicle-competition/" class="btn secondary" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-external-link-alt"></i> Competition Page
                            </a>
                        </div>
                    </div>
                `;
                break;

            default:
                overlayContent = `
                    <div class="overlay-content">
                        <h2>Project Details</h2>
                        <div class="overlay-close">&times;</div>
                        <div class="overlay-section">
                            <h3>Not Found</h3>
                            <p>Sorry — this project doesn't have a detail view yet.</p>
                        </div>
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
        if (closeButton) closeButton.addEventListener('click', closeOverlay);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        });
        
        // Close with escape key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeOverlay();
            }
        };
        
        document.addEventListener('keydown', escHandler);
        
        function closeOverlay() {
            document.removeEventListener('keydown', escHandler);
            overlay.classList.remove('active');
            setTimeout(() => {
                body.removeChild(overlay);
                body.style.overflow = 'auto';
            }, 300); // Match this with CSS transition time
        }
        
        // Add click handlers to gallery images for lightbox view
        setTimeout(() => {
            const galleryImages = overlay.querySelectorAll('.gallery-item img');
            galleryImages.forEach(img => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openLightbox(img.src, img.alt);
                });
            });
        }, 100);
    }
    
    // Lightbox functionality for full-size image viewing
    function openLightbox(imageSrc, caption) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-close">&times;</div>
            <img src="${imageSrc}" alt="${caption}">
            <div class="lightbox-caption">${caption}</div>
        `;
        
        document.body.appendChild(lightbox);
        
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => closeLightbox(lightbox));
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox(lightbox);
            }
        });
        
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox(lightbox);
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
    
    function closeLightbox(lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }, 300);
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
