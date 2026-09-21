fetch('header.html')
    .then(response => response.text())
    .then(data => {

        /* =========================
           LOAD HEADER
        ========================= */

        const headerContainer =
            document.getElementById('global-header');

        headerContainer.innerHTML = data;


        /* =========================
           FIND NAVBAR
        ========================= */

        const navbar =
            headerContainer.querySelector('.navbar');

        if (!navbar) return;


        /* =========================
           CREATE SLIDING PILL
        ========================= */

        let activeBg =
            navbar.querySelector('.active-bg');

        if (!activeBg) {

            activeBg =
                document.createElement('div');

            activeBg.classList.add('active-bg');

            navbar.prepend(activeBg);
        }


        /* =========================
           MOVE PILL
        ========================= */

        function movePillToLink(targetLink) {

            if (!targetLink) return;

            activeBg.style.width =
                `${targetLink.offsetWidth}px`;

            activeBg.style.transform =
                `translateX(${targetLink.offsetLeft - 2}px)`;
        }


        /* =========================
           CURRENT PAGE
        ========================= */

        const currentPath =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();

        const currentPage =
            currentPath === ""
                ? "index.html"
                : currentPath;


        /* =========================
           NAV LINKS
        ========================= */

        const navLinks =
            navbar.querySelectorAll('a');

        let currentActiveLink = null;


        /* =========================
           CHECK EVERY LINK
        ========================= */

        navLinks.forEach(link => {

            const href =
                link.getAttribute('href');

            if (!href) return;

            const linkPath =
                href
                    .split("/")
                    .pop()
                    .toLowerCase();


            /* =========================
               CURRENT PAGE
            ========================= */

            if (linkPath === currentPage) {

                link.classList.add('active-page');

                currentActiveLink = link;
            }


            /* =========================
               CLICK
            ========================= */

            link.addEventListener('click', (e) => {

                const targetUrl =
                    link.getAttribute('href');


                /* Same page */

                if (linkPath === currentPage) {
                    return;
                }


                /* Stop instant navigation */

                e.preventDefault();


                /* Remove old active */

                navLinks.forEach(l => {
                    l.classList.remove('active-page');
                });


                /* Add active to clicked link */

                link.classList.add('active-page');


                /* Slide pill */

                movePillToLink(link);


                /* =========================
                   CHANGE PAGE AFTER ANIMATION
                ========================= */

                setTimeout(() => {

                    window.location.href =
                        targetUrl;

                }, 300);

            });

        });


        /* =========================
           INITIAL PILL POSITION
        ========================= */

        if (currentActiveLink) {

            activeBg.classList.add('no-transition');

            requestAnimationFrame(() => {

                movePillToLink(currentActiveLink);

                requestAnimationFrame(() => {
                    activeBg.classList.remove('no-transition');
                });

            });

        }


        /* =========================
           RESIZE
        ========================= */

        window.addEventListener('resize', () => {

            const activeLink =
                navbar.querySelector(
                    'a.active-page'
                );

            if (activeLink) {

                activeBg.classList.add(
                    'no-transition'
                );

                movePillToLink(activeLink);

                requestAnimationFrame(() => {
                    activeBg.classList.remove(
                        'no-transition'
                    );
                });
            }

        });

    })
    .catch(error => {

        console.error(
            "Header load nahi hua:",
            error
        );

    });