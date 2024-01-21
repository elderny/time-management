document.addEventListener('DOMContentLoaded', function () {
    loadAnalytics();
    displayProductivityTips()
    loadAndDisplayReviews();
});

function loadAnalytics() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    let totalTasks = tasks.length;
    let priorityCount = { 'High': 0, 'Medium': 0, 'Low': 0 };

    tasks.forEach(task => {
        priorityCount[task.priority]++;
    });

    let frogTask = findFrogOfTheDay(tasks);
    let importantTasks = applyParetoPrinciple(tasks);

    // Update the UI
    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('high-priority-tasks').textContent = priorityCount['High'];
    document.getElementById('medium-priority-tasks').textContent = priorityCount['Medium'];
    document.getElementById('low-priority-tasks').textContent = priorityCount['Low'];
    document.getElementById('frog-task').textContent = frogTask ? `Your most important task: ${frogTask.name} - Deadline: ${frogTask.deadline}` : 'No tasks for today!';
    document.getElementById('important-tasks').textContent = `Top 20% important tasks count: ${importantTasks.length}`;
}

function findFrogOfTheDay(tasks) {
    if (tasks.length === 0) {
        return null;
    }
    tasks.sort(eisenhowerMatrix);
    return tasks[0]; // The "frog" is the first task after sorting
}

function applyParetoPrinciple(tasks) {
    // Sort tasks by priority and deadline
    tasks.sort(eisenhowerMatrix);

    // Get the top 20% of tasks
    let importantTaskCount = Math.ceil(tasks.length * 0.2);
    return tasks.slice(0, importantTaskCount);
}

// Eisenhower Matrix Algorithm for task sorting (same as before)
function eisenhowerMatrix(taskA, taskB) {
    const priorityMap = { 'High': 1, 'Medium': 2, 'Low': 3 };
    // Sort by priority first
    if (priorityMap[taskA.priority] < priorityMap[taskB.priority]) return -1;
    if (priorityMap[taskA.priority] > priorityMap[taskB.priority]) return 1;
    // If priorities are the same, sort by deadline
    return new Date(taskA.deadline) - new Date(taskB.deadline);
}
function displayProductivityTips() {
    const tips = [
        "Break your work into small steps.",
        "Set clear and achievable goals.",
        "Prioritize your tasks with the Eisenhower Matrix.",
        "Overcome procrastination by using the Pomodoro Technique.",
        "Set a specific time to check your emails and messages."
        // Add more tips as desired
    ];

    const tipOfTheDay = tips[new Date().getDay()]; // Get a tip based on the day of the week
    document.getElementById('productivity-tip').textContent = `Tip of the Day: ${tipOfTheDay}`;
}
function loadAndDisplayReviews() {
    let reviews = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews')) : [];
    let recentReviewsContainer = document.getElementById('recent-reviews');
    recentReviewsContainer.innerHTML = '';

    // Display the last 5 reviews (or fewer if less than 5 exist)
    reviews.slice(-5).forEach(review => {
        let reviewElement = document.createElement('li');
        reviewElement.textContent = `${review.date}: ${review.review}`;
        recentReviewsContainer.appendChild(reviewElement);
    });

    if (reviews.length === 0) {
        recentReviewsContainer.textContent = 'No reviews yet.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navClose = document.querySelector('.nav-close');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.add('active');
    });

    navClose.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});