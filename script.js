console.log("hyy");
let arr=[]
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log("Login attempt");

    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            alert('Login successful');
            console.log(data.users);
            populateTable(data.users);
        })
        .catch(error => {
            alert('Error logging in');
            console.error('Error:', error);
        });
});

function populateTable(users) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="border border-gray-400 p-2">${user.id}</td>
            <td class="border border-gray-400 p-2">
                <img alt="Employee Image" height="50" src="${user.image}" width="50"/>
            </td>
            <td class="border border-gray-400 p-2">${user.firstName} ${user.lastName}</td>
            <td class="border border-gray-400 p-2">
                <a class="text-blue-500" href="mailto:${user.email}">${user.email}</a>
            </td>
            <td class="border border-gray-400 p-2">${user.phone}</td>
            <td class="border border-gray-400 p-2">${user.company.title}</td>
            <td class="border border-gray-400 p-2">${user.gender}</td>
            <td class="border border-gray-400 p-2">${user.university}</td>
            <td class="border border-gray-400 p-2">${new Date(user.birthDate).toLocaleDateString()}</td>
            <td class="border border-gray-400 p-2">
                <a class="text-blue-500" href="#">Edit</a> -
                <a class="text-red-500" href="#">Delete</a>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


document.getElementById('createEmployeeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Gather input values from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const designation = document.getElementById('designation').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const courses = Array.from(document.querySelectorAll('input[name="course"]:checked')).map(cb => cb.value);
    const imgUpload = document.getElementById('imgUpload').files[0];

    // Create a new row object
    const newUser = {
        id: Date.now(), // Unique ID
        name: name,
        email: email,
        mobile: mobile,
        designation: designation,
        gender: gender,
        courses: courses.join(', '),
        image: imgUpload ? URL.createObjectURL(imgUpload) : 'https://via.placeholder.com/50', // Placeholder if no image
        createDate: new Date().toLocaleDateString()
    };

    // Add new row to the table
    addUserToTable(newUser);

    // Reset the form after submission
    document.getElementById('createEmployeeForm').reset();
});

function addUserToTable(user) {
    const tableBody = document.querySelector('tbody');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="border border-gray-400 p-2">${user.id}</td>
        <td class="border border-gray-400 p-2">
            <img alt="Employee Image" height="50" src="${user.image}" width="50"/>
        </td>
        <td class="border border-gray-400 p-2">${user.name}</td>
        <td class="border border-gray-400 p-2">
            <a class="text-blue-500" href="mailto:${user.email}">${user.email}</a>
        </td>
        <td class="border border-gray-400 p-2">${user.mobile}</td>
        <td class="border border-gray-400 p-2">${user.designation}</td>
        <td class="border border-gray-400 p-2">${user.gender}</td>
        <td class="border border-gray-400 p-2">${user.courses}</td>
        <td class="border border-gray-400 p-2">${user.createDate}</td>
        <td class="border border-gray-400 p-2">
            <a class="text-blue-500" href="#">Edit</a> -
            <a class="text-red-500" href="#">Delete</a>
        </td>
    `;

    tableBody.appendChild(row);
}

