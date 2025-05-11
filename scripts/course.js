
const courses = [
    {
        code: "CSE 110",
        name: "Introduction to Programming",
        credits: 3,
        description: "Web development with HTML, CSS, and JavaScript.",
        completed: false
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 3,
        description: "Web development with functions and modules.",
        completed: false
    },
    {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 3,
        description: "Web development with Python.",
        completed: false
    },
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 3,
        description: "Web development with HTML+CSS, design principles, and site planning.",
        completed: false
    },
    {
        code: "WDD 131",
        name: "Web Frontend Development",
        credits: 3,
        description: "Web development with HTML+CSS layouts, advanced styling, and responsive design.",
        completed: false
    },
    {
        code: "WDD 231",
        name: "Web Frontend Development II",
        credits: 3,
        description: "Web development with JavaScript, application design, and architectural patterns.",
        completed: false
    }
];


function displayCourses(coursesToDisplay) {
    const courseContainer = document.getElementById('courseContainer');
    courseContainer.innerHTML = '';


    coursesToDisplay.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        courseCard.setAttribute('role', 'listitem');
        courseCard.setAttribute('aria-label', `${course.code} ${course.name}${course.completed ? ', Completado' : ''}`);
        

        if (course.completed) {
            courseCard.classList.add('completed');
        }
        
        courseCard.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
        `;
        
        courseContainer.appendChild(courseCard);
    });


    updateTotalCredits(coursesToDisplay);
}


function updateTotalCredits(coursesToDisplay) {
    const totalCredits = coursesToDisplay.reduce((total, course) => total + course.credits, 0);
    document.getElementById('totalCredits').textContent = totalCredits;
}


function filterCourses(type) {
    let filteredCourses;
    
    if (type === 'all') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.code.startsWith(type));
    }
    
    displayCourses(filteredCourses);
}


document.addEventListener('DOMContentLoaded', () => {

    displayCourses(courses);
    

    document.getElementById('allBtn').addEventListener('click', () => {
        setActiveButton('allBtn');
        filterCourses('all');
    });
    
    document.getElementById('cseBtn').addEventListener('click', () => {
        setActiveButton('cseBtn');
        filterCourses('CSE');
    });
    
    document.getElementById('wddBtn').addEventListener('click', () => {
        setActiveButton('wddBtn');
        filterCourses('WDD');
    });
});


function setActiveButton(activeButtonId) {
    document.querySelectorAll('.filter-buttons button').forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
    });

    const activeButton = document.getElementById(activeButtonId);
    activeButton.classList.add('active');
    activeButton.setAttribute('aria-pressed', 'true');
}
