document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Project / Architecture Blueprints Switcher
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Deactivate all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Hide all panes
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Activate selected
      button.classList.add('active');
      const targetPane = document.getElementById(`pane-${tabId}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Contact Form Mock Submission
  const contactForm = document.getElementById('contactForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  if (contactForm && formSubmitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const originalText = formSubmitBtn.textContent;
      formSubmitBtn.textContent = 'Deploying...';
      formSubmitBtn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        alert('Message deployed successfully! I will reach out to you shortly.');
        contactForm.reset();
        formSubmitBtn.textContent = originalText;
        formSubmitBtn.disabled = false;
      }, 1200);
    });
  }

  // DevOps Terminal Simulator Logic
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');
  const presetButtons = document.querySelectorAll('.btn-preset');
  const currentTyped = document.getElementById('currentTyped');
  const initialOutput = document.getElementById('initialOutput');

  // Command database
  const commands = {
    'cat summary.md': `<strong>## PROFESSIONAL SUMMARY</strong><br>
Backend engineer with a shipping mindset. Built and shipped production systems across multiple hackathons and internships: SparkPredict (AWS ECS/Fargate, RDS, Redis, Bedrock AI), Uniattend (AWS Community Day 2nd Runner-up), and full-stack APIs using Node.js/Express/Supabase. Experienced in DevOps, web security, reverse proxies (Nginx), CI/CD, containerization, and rapid troubleshooting. Currently contributing to Syntexhub backend and infrastructure.`,
    
    'docker ps': `<pre style="font-family: inherit; font-size: 0.82rem; margin: 0; line-height: 1.4; overflow-x: auto; color: var(--text-secondary);">CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS                     NAMES
a8b9c1d2e3f4   sparkpredict-api:1.0  "node dist/server.js"    2 weeks ago     Up 4 days      0.0.0.0:8080->8080/tcp    sparkpredict-prod
f7e6d5c4b3a2   uniattend-api:latest  "docker-entrypoint.s…"   3 months ago    Up 2 days      0.0.0.0:3000->3000/tcp    uniattend-service
c9b8a7d6e5f4   cbt-backend:latest    "npm run start"          6 months ago    Up 1 week      0.0.0.0:5000->5000/tcp    cbt-exam-prod
3d2c1b0a9f8e   nginx:alpine          "/docker-entrypoint.…"   2 weeks ago     Up 4 days      0.0.0.0:80->80/tcp        nginx-proxy</pre>`,
    
    'aws sts get-caller-identity': `<pre style="font-family: inherit; font-size: 0.85rem; margin: 0; line-height: 1.4; color: var(--text-secondary);">{
    "UserId": "AIDASAMPLESOLADOYE04",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/najib-sholadoye",
    "Certifications": [
        "AWS Certified Cloud Practitioner (ID: 987654321)",
        "Huawei Datacom Training (Completed)"
    ],
    "Role": "Cloud Infrastructure Architect / Backend Engineer"
}</pre>`,
    
    'cat contact.txt': `<strong>Email:</strong> <a href="mailto:najibsholadoye04@gmail.com">najibsholadoye04@gmail.com</a><br>
<strong>Phone:</strong> +234 906 709 3417<br>
<strong>GitHub:</strong> <a href="https://github.com/Bijansholay" target="_blank">github.com/Bijansholay</a><br>
<strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/najib-sholadoye-499449302" target="_blank">linkedin.com/in/najib-sholadoye-499449302</a><br>
<strong>Location:</strong> Ilorin, Nigeria<br>
<strong>Status:</strong> Open to DevOps, Cloud Infrastructure, and Backend positions`,
    
    'help': `Available commands:<br>
  <span style="color: var(--accent-cyan)">cat summary.md</span>             - Display professional summary<br>
  <span style="color: var(--accent-cyan)">docker ps</span>                  - List active infrastructure containers<br>
  <span style="color: var(--accent-cyan)">aws sts get-caller-identity</span>- Check AWS cloud identity & certifications<br>
  <span style="color: var(--accent-cyan)">cat contact.txt</span>            - Get email, phone, location & profiles<br>
  <span style="color: var(--accent-cyan)">help</span>                       - Print list of available commands<br>
  <span style="color: var(--accent-cyan)">clear</span>                      - Clear terminal screen`
  };

  // Helper to execute and print output
  const executeCommand = (cmdText) => {
    const cleanCmd = cmdText.trim();
    
    if (cleanCmd === '') return;

    // Create line representing user command input
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span class="prompt">najib@infra:~$</span> <span class="typed-command">${escapeHtml(cleanCmd)}</span>`;
    terminalBody.appendChild(commandLine);

    if (cleanCmd.toLowerCase() === 'clear') {
      terminalBody.innerHTML = '';
    } else if (commands[cleanCmd]) {
      const resultLine = document.createElement('div');
      resultLine.className = 'terminal-line system-out';
      resultLine.innerHTML = commands[cleanCmd];
      terminalBody.appendChild(resultLine);
    } else {
      const errorLine = document.createElement('div');
      errorLine.className = 'terminal-line system-out';
      errorLine.innerHTML = `<span style="color: #ef4444;">sh: command not found: ${escapeHtml(cleanCmd)}</span>. Type 'help' for options.`;
      terminalBody.appendChild(errorLine);
    }

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  // Input events
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value;
        // If we hit enter on the very first command, remove the static demo typing line to clean it up
        if (currentTyped) currentTyped.parentElement.style.display = 'none';
        if (initialOutput) initialOutput.style.display = 'none';
        
        executeCommand(cmd);
        terminalInput.value = '';
      }
    });

    // Make clicking the terminal body autofocus the input
    const terminalContainer = document.querySelector('.terminal-container');
    if (terminalContainer) {
      terminalContainer.addEventListener('click', () => {
        terminalInput.focus();
      });
    }
  }

  // Preset buttons triggers
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      
      // Hide initial demo lines
      if (currentTyped) currentTyped.parentElement.style.display = 'none';
      if (initialOutput) initialOutput.style.display = 'none';
      
      executeCommand(cmd);
    });
  });

  // Helper to escape HTML tags to avoid arbitrary injection in terminal
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }
});