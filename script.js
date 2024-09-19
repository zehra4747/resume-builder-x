var _a, _b, _c;
(_a = document.getElementById('resumeform')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var previewContent = document.getElementById('preview-content');
    var fileInput = document.getElementById('photo');
    var file = (_a = fileInput === null || fileInput === void 0 ? void 0 : fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value.split('\n');
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value.split('\n');
    var educationHTML = education.map(function (edu) { return "<li>".concat(edu, "</li>"); }).join('');
    var skillsHTML = skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
    var username = document.getElementById('username').value;
    var shareableLinkContainer = document.getElementById('share-link-container');
    var shareableLinkElement = document.getElementById('shareable-link');
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            var profilePictureURL = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            var resumeHTML = "\n                <div class=\"resume-header\">\n                    <div class=\"profile-picture\" style=\"background-image: url(".concat(profilePictureURL, ");\"></div>\n                    <div class=\"name\"><span contenteditable=\"true\">").concat(name, "</span></div>\n                </div>\n\n                <div class=\"resume-body\">\n                    <div class=\"vertical-line\"></div>\n                    <div class=\"resume-content\">\n                        <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n                        <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n                        <h4>Education</h4>\n                        <ul contenteditable=\"true\">").concat(educationHTML, "</ul>\n                        <h4>Experience</h4>\n                        <p contenteditable=\"true\">").concat(experience, "</p>\n                        <h4>Skills</h4>\n                        <ul contenteditable=\"true\">").concat(skillsHTML, "</ul>\n                    </div>\n                </div>\n            ");
            previewContent.innerHTML = resumeHTML;
            previewContent.classList.remove("hidden");
            //* Generate and display the shareable URL
            var shareableUrl = "".concat(window.location.origin, "/user_").concat(encodeURIComponent(username));
            shareableLinkContainer.style.display = "block";
            shareableLinkElement.href = shareableUrl;
            shareableLinkElement.textContent = shareableUrl;
            // Show download and share link buttons
            document.getElementById('download-pdf').style.display = "inline-block";
            document.getElementById('copy-link').style.display = "inline-block";
        };
        reader.readAsDataURL(file);
    }
    else {
        var resumeHTML = "\n            <div class=\"resume-header\">\n                <div class=\"profile-picture\"></div>\n                <div class=\"name\">".concat(name, "</div>\n            </div>\n\n            <div class=\"resume-body\">\n                <div class=\"vertical-line\"></div>\n                <div class=\"resume-content\">\n                    <p><strong>Email:</strong> ").concat(email, "</p>\n                    <p><strong>Phone:</strong> ").concat(phone, "</p>\n                    <h4>Education</h4>\n                    <ul>").concat(educationHTML, "</ul>\n                    <h4>Experience</h4>\n                    <p>").concat(experience, "</p>\n                    <h4>Skills</h4>\n                    <ul>").concat(skillsHTML, "</ul>\n                </div>\n            </div>\n        ");
        previewContent.innerHTML = resumeHTML;
        previewContent.classList.remove("hidden");
        // Generate and display the shareable URL
        var shareableUrl = "".concat(window.location.origin, "/resume/").concat(encodeURIComponent(username), ".bymz");
        shareableLinkContainer.style.display = "block";
        shareableLinkElement.href = shareableUrl;
        shareableLinkElement.textContent = shareableUrl;
        // Show download and share link buttons
        document.getElementById('download-pdf').style.display = "inline-block";
        document.getElementById('copy-link').style.display = "inline-block";
    }
});
var html2pdf;
// Handle PDF download
(_b = document.getElementById('download-pdf')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var element = document.getElementById('preview-content');
    html2pdf().from(element).save('resume.pdf'); // Download only the resume section as PDF
});
// Handle copy share link
(_c = document.getElementById('copy-link')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    var shareableLinkElement = document.getElementById('shareable-link');
    navigator.clipboard.writeText(shareableLinkElement.href).then(function () {
        alert('Shareable link copied to clipboard!');
    }).catch(function (err) {
        console.error('Failed to copy the link: ', err);
    });
});
// Handle loading existing data from URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('education').value = resumeData.education.join('\n');
            document.getElementById('skills').value = resumeData.skills.join('\n');
        }
    }
});
