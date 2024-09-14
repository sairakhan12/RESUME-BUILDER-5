document.getElementById('resume-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const username = document.getElementById('username').value;
    const profilePicture = document.getElementById('profile-picture').files[0];
    const profilePicturePreview = document.getElementById('preview-profile-picture');

    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicturePreview.src = e.target.result;
        };
        reader.readAsDataURL(profilePicture);
    }

    // Populate the resume preview section with form values
    document.getElementById('preview-name').textContent = name;
    document.getElementById('preview-email').textContent = email;
    document.getElementById('preview-phone').textContent = phone;
    document.getElementById('preview-education').textContent = education;
    document.getElementById('preview-skills').textContent = skills;
    document.getElementById('preview-experience').textContent = experience;

    try {
        const response = await fetch('http://localhost:3000/create-resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, education, skills, experience, username })
        });
        const data = await response.json();
        document.getElementById('share-link').value = data.url;
    } catch (error) {
        console.error('Error creating resume:', error);
    }
});

// Handle PDF download
document.getElementById('download-pdf')?.addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(document.getElementById('preview-name').textContent || '', 10, 10);
    doc.text(document.getElementById('preview-email').textContent || '', 10, 20);
    doc.text(document.getElementById('preview-phone').textContent || '', 10, 30);
    doc.text('Education:', 10, 40);
    doc.text(document.getElementById('preview-education').textContent || '', 10, 50);
    doc.text('Skills:', 10, 60);
    doc.text(document.getElementById('preview-skills').textContent || '', 10, 70);
    doc.text('Experience:', 10, 80);
    doc.text(document.getElementById('preview-experience').textContent || '', 10, 90);
    doc.save('resume.pdf');
});
function generateLink() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();

    if (username && email) {
      const uniqueURL = `${username}.vercel.app/resume`;
      const outputDiv = document.getElementById('output');
      
      outputDiv.innerHTML = `
        <p>Your unique resume link:</p>
        <a href="https://${uniqueURL}" target="_blank">${uniqueURL}</a><br><br>
        <button onclick="downloadPDF()">Download as PDF</button>
      `;
      outputDiv.style.display = 'block';
    } else {
      alert('Please enter both your username and email.');
    }
  }
  function generateLink() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();

    if (username && email) {
      const uniqueURL = `${username}.vercel.app/resume`;
      const outputDiv = document.getElementById('output');
      
      outputDiv.innerHTML = `
        <p>Your unique resume link:</p>
        <a href="https://${uniqueURL}" target="_blank">${uniqueURL}</a><br><br>
        <button onclick="downloadPDF()">Download as PDF</button>
      `;
      outputDiv.style.display = 'block';
    } else {
      alert('Please enter both your username and email.');
    }
  }

  
