fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('global-header').innerHTML = data;
        
        // 1. Browser ke current URL se file ka naam nikaalo (e.g., "index.html")
        const currentPath = window.location.pathname.split("/").pop().toLowerCase();
        
        // Agar aap normal folder open karke chala rahe ho aur URL khali hai, toh default 'index.html' maan lo
        const currentPage = currentPath === "" ? "index.html" : currentPath;
        
        console.log("Current Page URL:", currentPage); // Debugging ke liye

        // 2. Header ke saare links ko dhoondo
        const navLinks = document.querySelectorAll('.navbar a');
        
        // 3. Match karke class lagao
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split("/").pop().toLowerCase();
            console.log("Checking link href:", linkPath); // Debugging ke liye
            
            if (linkPath === currentPage) {
                link.classList.add('active-page');
            }
        });
    })
    .catch(error => console.error("Header load nahi hua:", error));
