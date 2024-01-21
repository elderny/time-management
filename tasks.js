document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    displayProductivityTips();
    displayMotivationalQuote();
    document.getElementById('task-form').addEventListener('submit', addTask);
    document.getElementById('tasks').addEventListener('click', markComplete);
});
function addTask(e) {
    e.preventDefault();

    // Get input values
    let taskName = document.getElementById('taskName').value;
    let taskDeadline = document.getElementById('deadline').value;
    let taskPriority = document.getElementById('priority').value;

    // Create a new task object
    let task = {
        name: taskName,
        deadline: taskDeadline,
        priority: taskPriority
    };

    // Save the task in local storage
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear the form
    document.getElementById('task-form').reset();

    // Reload tasks
    loadTasks();
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    let tasksList = document.getElementById('tasks');
    tasksList.innerHTML = '';

    tasks.sort(advancedSortingAlgorithm);

    tasks.forEach(function (task, index) {
        let li = document.createElement('li');
        let dueStatus = getDueStatus(task.deadline);
        li.innerHTML = `
            ${task.name} - Deadline: ${task.deadline} (${dueStatus}) - Priority: ${task.priority}
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button>
            <input type="checkbox" ${task.completed ? 'checked' : ''} class="task-complete" data-index=${index}>
        `;
        li.classList.add(dueStatus.toLowerCase().replace(" ", "-")); // Add class for styling based on due status
        tasksList.appendChild(li);
    });
}
function getDueStatus(deadline) {
    const now = new Date();
    const dueDate = new Date(deadline);
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const daysUntilDue = Math.round((dueDate - now) / oneDay);

    if (daysUntilDue < 0) {
        return 'Overdue';
    } else if (daysUntilDue <= 3) {
        return 'Due Soon';
    }
    return 'On Track';
}

function displayProductivityTips() {
    const tips = [
        "Break your work into small steps.",
        "Set clear and achievable goals.",
        "Prioritize your tasks with the Eisenhower Matrix.",
        "Overcome procrastination by using the Pomodoro Technique.",
        "Set a specific time to check your emails and messages.",
        "Break your work into small steps.",
        "Set clear and achievable goals.",
        "Prioritize your tasks with the Eisenhower Matrix.",
        "Overcome procrastination by using the Pomodoro Technique.",
        "Set a specific time to check your emails and messages.",
        "Learn to say no to unimportant tasks and focus on what truly matters.",
        "Take regular breaks to refresh your mind and avoid burnout.",
        "Eliminate distractions to maintain focus and increase productivity.",
        "Reflect on your productivity at the end of each day and plan for tomorrow.",
        "Cultivate a growth mindset and view challenges as opportunities to learn.",
        "Start your day with a clear focus.",
        "Set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals.",
        "Prioritize your tasks using the Eisenhower Box.",
        "Use the Pomodoro Technique for focused work sessions.",
        "Break large projects into smaller, manageable tasks.",
        "Limit the number of times you check your email each day.",
        "Learn to say \"no\" to unnecessary meetings.",
        "Delegate tasks that others can do.",
        "Keep a distraction list to note down any thoughts that interrupt your work.",
        "Batch similar tasks together to increase efficiency.",
        "Avoid multitasking; it's less productive than focusing on one task at a time.",
        "Set deadlines for everything, even tasks that don't have one.",
        "Review your productivity at the end of each day.",
        "Use the 2-minute rule: if something takes less than two minutes, do it now.",
        "Organize your workspace to reduce clutter and distractions.",
        "Set a time limit for decision-making to avoid analysis paralysis.",
        "Use technology to automate repetitive tasks.",
        "Focus on high-return tasks that align with your goals.",
        "Learn to recognize and manage your peak energy periods.",
        "Establish and maintain a morning routine.",
        "End your day with a plan for tomorrow.",
        "Practice mindfulness to stay present and focused.",
        "Cultivate the habit of continuous learning.",
        "Maintain a healthy work-life balance.",
        "Regularly reassess and adjust your goals.",
        "Keep your to-do list short and realistic.",
        "Use positive affirmations to boost your confidence and motivation.",
        "Create a system for tracking and organizing your ideas.",
        "Develop a strong support network for advice and encouragement.",
        "Embrace failure as a learning opportunity.",
        "Avoid perfectionism; it can lead to procrastination.",
        "Prioritize tasks based on the Pareto Principle (80/20 rule).",
        "Set clear boundaries to manage others' expectations.",
        "Find an accountability partner to keep you on track.",
        "Use visualization techniques to focus on your goals.",
        "Challenge yourself regularly to step out of your comfort zone.",
        "Celebrate small wins to maintain motivation.",
        "Develop a growth mindset and embrace challenges.",
        "Practice gratitude to maintain a positive outlook.",
        "Implement a \"waiting for\" list to track delegated tasks.",
        "Regularly clear out digital clutter from your devices.",
        "Focus on solutions, not problems.",
        "Develop a habit of taking regular breaks to rest and recharge.",
        "Keep a journal to reflect on your productivity and growth.",
        "Learn to manage stress through exercise, meditation, or hobbies.",
        "Use the \"eat the frog\" technique to tackle your most challenging task first.",
        "Set up a reward system to incentivize productivity.",
        "Regularly update and refine your skills to stay competitive.",
        "Practice active listening to improve communication and understanding.",
        "Remember that it's okay to rest; downtime is essential for long-term success."
    ];
    const randomIndex = Math.floor(Math.random() * tips.length);
    const tipOfTheDay = tips[randomIndex];

    document.getElementById('productivity-tip').textContent = `Tip of the Day: ${tipOfTheDay}`;
}
function displayMotivationalQuote() {
    const quotes = [
        { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { quote: "It's not the time you spend, but how you spend the time.", author: "Michael Altshuler" },
        { quote: "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.", author: "Paul J. Meyer" },
        {
            "quote": "The way to get started is to quit talking and begin doing. ",
            "author": "Walt Disney"
        },
        {
            "quote": "The future belongs to those who believe in the beauty of their dreams. ",
            "author": "Eleanor Roosevelt"
        },
        {
            "quote": "Don't watch the clock; do what it does. Keep going. ",
            "author": "Sam Levenson"
        },
        {
            "quote": "The only way to do great work is to love what you do. ",
            "author": "Steve Jobs"
        },
        {
            "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts. ",
            "author": "Winston Churchill"
        },
        {
            "quote": "Believe you can and you're halfway there. ",
            "author": "Theodore Roosevelt"
        },
        {
            "quote": "I can't change the direction of the wind, but I can adjust my sails to always reach my destination. ",
            "author": "Jimmy Dean"
        },
        {
            "quote": "Life is 10% what happens to us and 90% how we react to it. ",
            "author": "Charles R. Swindoll"
        },
        {
            "quote": "The most common way people give up their power is by thinking they don't have any. ",
            "author": "Alice Walker"
        },
        {
            "quote": "The best time to plant a tree was 20 years ago. The second best time is now. ",
            "author": "Chinese Proverb"
        },
        {
            "quote": "The only limit to our realization of tomorrow will be our doubts of today. ",
            "author": "Franklin D. Roosevelt"
        },
        {
            "quote": "Do what you can, with what you have, where you are. ",
            "author": "Theodore Roosevelt"
        },
        {
            "quote": "You are never too old to set another goal or to dream a new dream. ",
            "author": "C.S. Lewis"
        },
        {
            "quote": "Everything you’ve ever wanted is on the other side of fear. ",
            "author": "George Addair"
        },
        {
            "quote": "Success is walking from failure to failure with no loss of enthusiasm. ",
            "author": "Winston Churchill"
        },
        {
            "quote": "What you lack in talent can be made up with desire, hustle and giving 110% all the time. ",
            "author": "Don Zimmer"
        },
        {
            "quote": "The only place where success comes before work is in the dictionary. ",
            "author": "Vidal Sassoon"
        },
        {
            "quote": "Don’t wish it were easier. Wish you were better. ",
            "author": "Jim Rohn"
        },
        {
            "quote": "I am not a product of my circumstances. I am a product of my decisions. ",
            "author": "Stephen Covey"
        },
        {
            "quote": "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time. ",
            "author": "Thomas A. Edison"
        },
        {
            "quote": "The only way to achieve the impossible is to believe it is possible. ",
            "author": "Charles Kingsleigh"
        },
        {
            "quote": "Opportunities don't happen, you create them. ",
            "author": "Chris Grosser"
        },
        {
            "quote": "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. ",
            "author": "Roy T. Bennett"
        },
        {
            "quote": "You get what you work for, not what you wish for. ",
            "author": "Howard A. Tullman"
        },
        {
            "quote": "Success is not in what you have, but who you are. ",
            "author": "Bo Bennett"
        },
        {
            "quote": "Hardships often prepare ordinary people for an extraordinary destiny. ",
            "author": "C.S. Lewis"
        },
        {
            "quote": "Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. Never let anyone bring you down. You got to keep going. ",
            "author": "Chantal Sutherland"
        },
        {
            "quote": "It does not matter how slowly you go as long as you do not stop. ",
            "author": "Confucius"
        },
        {
            "quote": "Our greatest glory is not in never falling, but in rising every time we fall. ",
            "author": "Confucius"
        },
        {
            "quote": "All progress takes place outside the comfort zone. ",
            "author": "Michael John Bobak"
        },
        {
            "quote": "You don’t have to be great to start, but you have to start to be great. ",
            "author": "Zig Ziglar"
        },
        {
            "quote": "The only limit to our realization of tomorrow will be our doubts of today. ",
            "author": "Franklin D. Roosevelt"
        },
        {
            "quote": "It always seems impossible until it's done. ",
            "author": "Nelson Mandela"
        },
        {
            "quote": "Don't let what you cannot do interfere with what you can do. ",
            "author": "John R. Wooden"
        },
        {
            "quote": "Start where you are. Use what you have. Do what you can. ",
            "author": "Arthur Ashe"
        },
        {
            "quote": "Fall seven times and stand up eight. ",
            "author": "Japanese Proverb"
        },
        {
            "quote": "You just can't beat the person who never gives up. ",
            "author": "Babe Ruth"
        },
        {
            "quote": "There is no royal road to anything. One thing at a time, all things in succession. That which grows fast, withers as rapidly. That which grows slowly, endures. ",
            "author": "Josiah Gilbert Holland"
        },
        {
            "quote": "Be not afraid of going slowly, be afraid only of standing still. ",
            "author": "Chinese Proverb"
        },
        {
            "quote": "Success is the sum of small efforts, repeated day",
            "author": "in and day"
        },
        {
            "quote": "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will. ",
            "author": "Vince Lombardi"
        },
        {
            "quote": "Motivation is what gets you started. Habit is what keeps you going. ",
            "author": "Jim Ryun"
        },
        {
            "quote": "The only place success comes before work is in the dictionary. ",
            "author": "Vince Lombardi"
        },
        {
            "quote": "I've missed more than 9,000 shots in my career. I've lost almost 300 games. 26 times I've been trusted to take the game",
            "author": "winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed."
        },
        {
            "quote": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. ",
            "author": "Albert Schweitzer"
        },
        {
            "quote": "The road to success and the road to failure are almost exactly the same. ",
            "author": "Colin R. Davis"
        },
        {
            "quote": "Success usually comes to those who are too busy to be looking for it. ",
            "author": "Henry David Thoreau"
        },
        {
            "quote": "If you really look closely, most overnight successes took a long time. ",
            "author": "Steve Jobs"
        },
        {
            "quote": "The only place where success comes before work is in the dictionary. ",
            "author": "Vidal Sassoon"
        }
    ]

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteOfTheDay = quotes[randomIndex];
    document.getElementById('motivational-quote').textContent = `"${quoteOfTheDay.quote}" - ${quoteOfTheDay.author}`;
}
function advancedSortingAlgorithm(taskA, taskB) {
    const priorityMap = { 'High': 1, 'Medium': 2, 'Low': 3 };
    const completedMap = { true: 1, false: 0 };

    // Sort by completion status first (incomplete tasks first)
    if (completedMap[taskA.completed] < completedMap[taskB.completed]) return -1;
    if (completedMap[taskA.completed] > completedMap[taskB.completed]) return 1;

    // Then sort by priority
    if (priorityMap[taskA.priority] < priorityMap[taskB.priority]) return -1;
    if (priorityMap[taskA.priority] > priorityMap[taskB.priority]) return 1;

    // Finally, sort by deadline
    return new Date(taskA.deadline) - new Date(taskB.deadline);
}
function markComplete(e) {
    if (e.target.classList.contains('task-complete')) {
        let index = e.target.dataset.index;
        let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks(); // Reload the tasks
    }
}

function deleteTask(index) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.splice(index, 1); // Remove the task
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(); // Reload the tasks
}

function editTask(index) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    let task = tasks[index];

    // Populate the form with the task details
    document.getElementById('taskName').value = task.name;
    document.getElementById('deadline').value = task.deadline;
    document.getElementById('priority').value = task.priority;

    // Remove the task from the list (it will be re-added when 'Add Task' is clicked)
    deleteTask(index);
}

function findFrogOfTheDay() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    if (tasks.length === 0) {
        return null;
    }

    // Sort tasks based on priority and deadline
    tasks.sort(eisenhowerMatrix);

    // The "frog" is the first task after sorting
    return tasks[0];
}

// Eisenhower Matrix Algorithm for task sorting
function eisenhowerMatrix(taskA, taskB) {
    const priorityMap = { 'High': 1, 'Medium': 2, 'Low': 3 };
    // Sort by priority first
    if (priorityMap[taskA.priority] < priorityMap[taskB.priority]) return -1;
    if (priorityMap[taskA.priority] > priorityMap[taskB.priority]) return 1;
    // If priorities are the same, sort by deadline
    return new Date(taskA.deadline) - new Date(taskB.deadline);
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
function submitDailyReview() {
    const review = document.getElementById('daily-review-text').value;
    const reviewDate = new Date().toLocaleDateString();

    let reviews = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews')) : [];
    reviews.push({ date: reviewDate, review: review });
    localStorage.setItem('reviews', JSON.stringify(reviews));

    // Clear the review text area
    document.getElementById('daily-review-text').value = '';
    alert('Thank you for your review. Reflecting on your day can significantly improve your productivity!');
}

// Call this function when the review form is submitted
document.getElementById('daily-review-form').addEventListener('submit', function (e) {
    e.preventDefault();
    submitDailyReview();
});
