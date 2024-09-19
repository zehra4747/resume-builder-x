// Define types for the form elements 
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string[];
    experience: string;
    skills: string[];
}

document.getElementById('resumeform')?.addEventListener('submit', function(event: Event) {
    event.preventDefault();

    const previewContent = document.getElementById('preview-content') as HTMLDivElement;
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value.split('\n');
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.split('\n');

    const educationHTML = education.map(edu => `<li>${edu}</li>`).join('');
    const skillsHTML = skills.map(skill => `<li>${skill}</li>`).join('');

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const shareableLinkContainer = document.getElementById('share-link-container') as HTMLDivElement;
    const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;

    const resumeData: ResumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event: ProgressEvent<FileReader>) {
            const profilePictureURL = event.target?.result as string;

            const resumeHTML = `
                <div class="resume-header">
                    <div class="profile-picture" style="background-image: url(${profilePictureURL});"></div>
                    <div class="name"><span contenteditable="true">${name}</span></div>
                </div>

                <div class="resume-body">
                    <div class="vertical-line"></div>
                    <div class="resume-content">
                        <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
                        <p><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>
                        <h4>Education</h4>
                        <ul contenteditable="true">${educationHTML}</ul>
                        <h4>Experience</h4>
                        <p contenteditable="true">${experience}</p>
                        <h4>Skills</h4>
                        <ul contenteditable="true">${skillsHTML}</ul>
                    </div>
                </div>
            `;

            previewContent.innerHTML = resumeHTML;
            previewContent.classList.remove("hidden");

            //* Generate and display the shareable URL
           const shareableUrl = `${window.location.origin}/user_${encodeURIComponent(username)}`;
            shareableLinkContainer.style.display = "block";
            shareableLinkElement.href = shareableUrl;
            shareableLinkElement.textContent = shareableUrl;

            

            // Show download and share link buttons
            (document.getElementById('download-pdf') as HTMLButtonElement).style.display = "inline-block";
            (document.getElementById('copy-link') as HTMLButtonElement).style.display = "inline-block";
        };

        reader.readAsDataURL(file);
    } else {
     const   resumeHTML = `
            <div class="resume-header">
                <div class="profile-picture"></div>
                <div class="name">${name}</div>
            </div>

            <div class="resume-body">
                <div class="vertical-line"></div>
                <div class="resume-content">
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <h4>Education</h4>
                    <ul>${educationHTML}</ul>
                    <h4>Experience</h4>
                    <p>${experience}</p>
                    <h4>Skills</h4>
                    <ul>${skillsHTML}</ul>
                </div>
            </div>
        `;

        previewContent.innerHTML = resumeHTML;
        previewContent.classList.remove("hidden");

        // Generate and display the shareable URL
        const shareableUrl = `${window.location.origin}/resume/${encodeURIComponent(username)}.bymz`;

        shareableLinkContainer.style.display = "block";
        shareableLinkElement.href = shareableUrl;
        shareableLinkElement.textContent = shareableUrl;

        // Show download and share link buttons
        (document.getElementById('download-pdf') as HTMLButtonElement).style.display = "inline-block";
        (document.getElementById('copy-link') as HTMLButtonElement).style.display = "inline-block";
    }
});

var html2pdf: any;

// Handle PDF download
(document.getElementById('download-pdf') as HTMLButtonElement)?.addEventListener('click', function() {
    const element = document.getElementById('preview-content') as HTMLDivElement;
    html2pdf().from(element).save('resume.pdf'); // Download only the resume section as PDF
});

// Handle copy share link
(document.getElementById('copy-link') as HTMLButtonElement)?.addEventListener('click', function() {
    const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
    navigator.clipboard.writeText(shareableLinkElement.href).then(() => {
        alert('Shareable link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy the link: ', err);
    });
});

// Handle loading existing data from URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        const savedResumeData = localStorage.getItem(username);

        if (savedResumeData) {
            const resumeData: ResumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education.join('\n');
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills.join('\n');
        }
    }
});
