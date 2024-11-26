# Role-Based Access Control (RBAC) Management System

A modern, feature-rich Role-Based Access Control (RBAC) management system built with **React** and **Ant Design**. This project allows administrators to manage users and roles with advanced permissions and validations.

---

## Table of Contents

- [Features](#features)

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [User Management](#user-management)
  - [Role Management](#role-management)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)

---

## Features

### User Management

- Add, edit, delete, and toggle user status (Active/Inactive).
- Enforce unique email addresses with proper validation.
- Prevent deletion of active users.

### Role Management

- Add, edit, delete, and toggle role status (Active/Inactive).
- Enforce unique role names (case-insensitive validation).
- Prevent deletion of roles assigned to users.

### UI

- Fully responsive UI built with Ant Design.
- Dynamic validation for required fields.
- Popup notifications for errors and actions.

---


## Getting Started

### Prerequisites

Before running the project, ensure you have:

- **Node.js** (>=16.x.x)
- **npm** (>=8.x.x) or **Yarn** (>=1.x.x)

### Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/yourusername/rbac-management-system.git](https://github.com/Vyshnav1600/Role-Based-Access-Control-RBAC-UI
)
   cd rbac-management-system
   ```

2.Install dependencies:

    ```bash
    npm install

    ```

3.Start the development server:

```bash
   npm start
```

4.Open your browser and navigate to:

    http://localhost:3000

---

## Usage

Login

- Use the following credentials to log in:
- Username: admin
- Password: admin
- You can log in either by clicking the Login button or pressing the Enter key.

### User Management

1. Navigate to the **User Management** section.
2. Use the **Add User** button to add new users.
3. Fill in the required fields:
   - **Name**
   - **Email** (must be unique and valid)
   - **Role** (select from available roles)
   - **Status** (Active/Inactive)
4. Edit or delete existing users using the **Edit** and **Delete** buttons in the Actions column.
5. Toggle user status between Active and Inactive using the **Set Active/Set Inactive** button.

### Role Management

1. Navigate to the **Role Management** section.
2. Use the **Add Role** button to add new roles.
3. Fill in the required fields:
   - **Role Name** (must be unique; case-insensitive validation).
   - **Permissions** (select one or more from Read, Write, Delete).
   - **Status** (Active/Inactive).
4. Edit or delete existing roles using the **Edit** and **Delete** buttons in the Actions column.
5. Prevent deletion of roles assigned to users with a warning message.
6. Toggle role status between Active and Inactive using the **Set Active/Set Inactive** button.

---

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces.
- **Ant Design**: A modern UI library for building responsive and accessible applications.
- **JavaScript (ES6+)**: Used for component logic and state management.
- **CSS**: For custom styling.

---

## Project Structure



```
rbac-management-system/
├── public/ # Public assets and index.html
├── src/
│ ├── components/
│ │ ├── Login.js # Login component
│ │ ├── RoleManagement.js # Role management component
│ │ ├── UserManagement.js # User management component
│ ├── App.js # Main application entry point
│ ├── index.js # React DOM renderer
│ ├── styles.css # Global styles
│ └── utils/ # Utility functions (if applicable)
├── package.json # Project dependencies and scripts
└── README.md # Project documentation
```
## ScreenShots

![image](https://github.com/user-attachments/assets/f278e683-99aa-4bc9-ba76-e25ae18cdfe3)

![image](https://github.com/user-attachments/assets/109f2d24-13ac-4429-8a68-f19ae32f9495)



## Contact

Author: Vyshnav

Email: Vyshnav1600@gmail.com

GitHub: https://github.com/Vyshnav1600/Role-Based-Access-Control-RBAC-UI
