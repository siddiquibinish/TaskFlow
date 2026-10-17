# TaskFlow ✅

## Project Description
TaskFlow is a modern, responsive, and highly interactive To-Do list web application designed to help users manage their daily tasks efficiently. Built with a state-driven architecture, it ensures a seamless user experience with a clean UI, essential accessibility features, and professional development best practices.

## Features
- **Task Management:** Easily add, delete, and mark tasks as completed.
- **Dynamic Dashboard:** Real-time statistics showing Total, Active, Completed tasks, and a progress percentage.
- **Advanced Filtering & Search:** Filter tasks by 'All', 'Active', or 'Completed' status, and search through tasks in real-time.
- **Local Storage Persistence:** Your tasks are saved directly in your browser's local storage.
- **Smart Empty States:** Professional empty state messages when no tasks exist or when search/filters return no results.
- **Keyboard Navigation:** Support for keyboard users (e.g., using `Enter` or `Space` to manage tasks) and basic ARIA labels for screen readers.
- **Safe Rendering:** User inputs are rendered securely via text content to prevent basic XSS script injections.

## Technologies Used
- **HTML5:** Semantic structure and basic accessibility attributes (ARIA).
- **CSS3:** Custom styling, Flexbox layout, responsive design, and CSS variables.
- **Vanilla JavaScript (ES6+):** State-driven data management, event delegation, DOM manipulation, and Local Storage integration.
- **FontAwesome:** UI icons.

## Project Case Study

### 1. The Problem
Many task management tools are overly complex, slow, or require accounts just to keep track of simple daily activities. Users need a fast, accessible, and straightforward interface to organize their day without worrying about losing their data when they close or refresh the browser.

### 2. The Solution
To solve this, I built TaskFlow, a lightweight and responsive To-Do application using vanilla HTML, CSS, and JavaScript. It utilizes a state-driven architecture where a central array acts as the single source of truth, and integrates with the browser's Local Storage to ensure task data persists securely across sessions. 

### 3. Technical Challenges
During development, I encountered an issue where dashboard statistics displayed incorrect numbers when tasks were searched or filtered, because the logic relied on counting visible HTML elements. I resolved this by decoupling the UI from the data, updating the function to calculate stats strictly from the main state array. Another challenge was unreliable filter tab matching based on button text, which I fixed by implementing robust `data-filter` attributes.

### 4. Learning Outcomes
This project significantly strengthened my understanding of state-driven UI and separating data logic from DOM manipulation before moving on to frameworks like React. I also gained practical experience in web accessibility (implementing ARIA attributes and keyboard navigation) and security (preventing XSS attacks by rendering inputs as text content).

## Links
- **Live Demo:** https://siddiquibinish.github.io/TaskFlow
- **Repository:** https://github.com/siddiquibinish/TaskFlow

## Installation / How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/siddiquibinish/TaskFlow.git](https://github.com/siddiquibinish/TaskFlow.git)