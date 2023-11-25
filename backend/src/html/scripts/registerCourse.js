var courses;

function renderCoursesTable() {
    const req = new XMLHttpRequest();
    req.addEventListener('load', (event) => {
        courses = JSON.parse(event.target.responseText);
        var table = document.getElementById('coursesTable');
        table.tBodies[0].remove();
        var tBody = table.createTBody();

        for (var course of courses) {
            var row = tBody.insertRow(-1);

            row.insertCell(0).innerHTML = course.CourseName;
            row.insertCell(1).innerHTML = course.StudentName;
            row.insertCell(2).innerHTML = '<a href="#" onclick="updateCourse(\'' + course.CourseName + '\', \'' + course.StudentName + '\')">Update</a> | <a href="#" onclick="deleteCourse(\'' + course.CourseName + '\', \'' + course.StudentName + '\')">Delete</a>';
        }
    });

    req.open('GET', 'http://localhost:3000/RegisterCourse');
    req.send();
}

function updateCourse(courseName, studentName) {
    console.log('updateCourse: ' + courseName + ', ' + studentName);
    document.getElementById('courseName').value = courseName;
    document.getElementById('studentName').value = studentName;
}

function deleteCourse(courseName, studentName) {
    console.log('deleteCourse: ' + courseName + ', ' + studentName);

    if (confirm('Confirm delete registration for ' + studentName + ' in ' + courseName + '?')) {
        const req = new XMLHttpRequest();
        req.addEventListener('load', renderCoursesTable);
        req.open("DELETE", 'http://localhost:3000/RegisterCourse?CourseName=' + encodeURIComponent(courseName) + '&StudentName=' + encodeURIComponent(studentName));
        req.send();
    }
}

function createUpdateCourse() {
    console.log('createUpdateCourse');

    var courseName = document.getElementById('courseName').value;
    var studentName = document.getElementById('studentName').value;
    var registration = { 'CourseName': courseName, 'StudentName': studentName };

    const req = new XMLHttpRequest();
    req.addEventListener('load', renderCoursesTable);

    req.open("POST", 'http://localhost:3000/RegisterCourse');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(registration));

    return false;
}

// Load courses when the page is ready
document.addEventListener('DOMContentLoaded', renderCoursesTable);
