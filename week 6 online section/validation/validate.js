validate.js
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    // Validate Name
    const name = document.getElementById('name').value;
    if (name.trim() === "") {
        alert('Name is required.');
        isValid = false;
    }

    // Validate Age
    const age = document.getElementById('age').value;
    if (age === "" || isNaN(age) || age <= 0) {
        alert('Please enter a valid age.');
        isValid = false;
    }

    // Validate Date of Birth
    const dob = document.getElementById('dob').value;
    const dobPattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!dobPattern.test(dob)) {
        alert('Date of Birth must be in dd-mm-yyyy format.');
        isValid = false;
    }

    // Validate Phone Number
    const phone = document.getElementById('phone').value;
    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone)) {
        alert('Phone number must contain only digits.');
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email').value;
    if (email.trim() === "") {
        alert('Email is required.');
        isValid = false;
    }

    // Validate Address
    const address = document.getElementById('address').value;
    if (address.trim() === "") {
        alert('Address is required.');
        isValid = false;
    }

    // Validate Gender
    const genderMale = document.getElementById('male').checked;
    const genderFemale = document.getElementById('female').checked;
    if (!genderMale && !genderFemale) {
        alert('Gender is required.');
        isValid = false;
    }

    // Validate Password
    const password = document.getElementById('password').value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
    if (!passwordPattern.test(password)) {
        alert('Password must contain at least one uppercase letter, one lowercase letter, and one special character.');
        isValid = false;
    }

    // Validate About Yourself
    const about = document.getElementById('about').value;
    if (about.trim() === "") {
        alert('About Yourself is required.');
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
        // Here you can add the code to actually submit the form data.
    }
});