# Real-Time User Management System with WebSocket Protocol using JavaScript

## Overview
This project is a real-time user management system that utilizes the **WebSocket protocol** for efficient and instant communication between the frontend and backend. The system manages data for three user categories: **Students**, **Teachers**, and **Admins**, providing full CRUD (Create, Read, Update, Delete) functionalities. Data is stored in lightweight JSON files, ensuring simplicity and portability.

---

## Features
1. **Login System**:
   - User authentication via WebSocket.
   - Validates user credentials and redirects to the dashboard.

2. **Dashboard**:
   - Central navigation to manage:
     - Student details
     - Teacher details
     - Admin details

3. **CRUD Operations**:
   - **Create**: Add new records via forms.
   - **Read**: View details in organized tables.
   - **Update**: Edit details inline or through a dedicated update page.
   - **Delete**: Remove records directly from the table.

4. **Real-Time Updates**:
   - WebSocket ensures instant synchronization between frontend and backend.

5. **Frontend Design**:
   - HTML, CSS, and JavaScript for a clean, responsive UI.

6. **Backend**:
   - Node.js WebSocket server for handling requests and managing data in JSON files.

---

## System Architecture
### Components:
1. **Frontend**:
   - HTML for structure.
   - CSS for styling.
   - JavaScript for interactivity and WebSocket communication.

2. **Backend**:
   - Node.js server with WebSocket implementation.
   - Manages user requests and updates JSON files.

3. **Data Storage**:
   - JSON files (`students.json`, `teachers.json`, `admins.json`) for lightweight and structured data storage.

---

## Workflow
1. **Login**:
   - User enters credentials in `login.html`.
   - Credentials are validated via WebSocket communication with the server.

2. **Dashboard**:
   - Displays buttons for managing **Students**, **Teachers**, and **Admins**.

3. **CRUD Operations**:
   - **Add**: Forms (`add.html`, `add_teacher.html`, `add_admin.html`).
   - **View/Edit/Delete**:
     - Inline editing and deletion in `students.html`, `teachers.html`, and `admins.html`.
     - Update functionality in `update.html`.

---

## Installation and Usage
### Prerequisites:
- **Node.js** installed on your system.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo

2. Install dependencies:
   ```bash
   npm install

3. Run the server:
   ```bash
   node server.js

4. Open login.html in your browser to start using the system.





   


