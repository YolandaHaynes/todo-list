# Todo App

A responsive Todo application built with React that allows users to create, manage, search, sort, and filter their tasks. The application includes user authentication, protected routes, form validation, and responsive styling for desktop, tablet, and mobile screens.

## Features

- User login and authentication
- Protected Todo and Profile routes
- Add new todos
- Mark todos as complete or active
- Edit existing todos
- Delete todos
- Filter todos by:
  - All
  - Active
  - Completed
- Search todos by title
- Sort todos by:
  - Created date
  - Title
- Sort in ascending or descending order
- Form validation for todo titles
- Loading and error states
- Responsive layout for desktop, tablet, and mobile
- Keyboard-friendly controls and visible focus states
- Custom checkbox styling for completed todos

## Technologies Used

- React
- React Router
- JavaScript
- HTML
- CSS
- Vite
- Git / GitHub
- REST API

## Screenshots

### Desktop

![Desktop view](/public/screenshot/desktop/desktop-LogIn.png)
![Desktop view](/public/screenshot/desktop/desktop-About.png)
![Desktop view](/public/screenshot/desktop/desktop-profilePage.png)
![Desktop view](/public/screenshot/desktop/desktop-Todo.png)


### Mobile

![Mobile view](/public/screenshot/mobile/mobile-LogIn.png)
![Mobile view](/public/screenshot/mobile/mobile-About.png)
![Mobile view](/public/screenshot/mobile/mobile-Profile.png)
![Mobile view](/public/screenshot/mobile/mobile-Todo.png)
![Mobile view](/public/screenshot/mobile/mobile-TodoList.png)
## Getting Started

### Prerequisites

Before running this project, make sure you have:

- Node.js installed
- npm installed
- Git installed

### Installation

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```


2. Navigate to the project directory:

```bash
cd YOUR_PROJECT_FOLDER
```

3. Install the dependencies:

```bash
npm install
```

4. Start development server:

```bash
npm run dev
```
5. Open the local development URL shown in terminal

### Available Scripts
- npm run dev

Starts the Vite development server.

- npm run build

Creates a production build of the application.

- npm run preview

Previews the production build locally.

### Deisgn Decisions
The application uses a simple CSS-based styling approach to keep the project lightweight and easy to maintain.

CSS custom properties were used for common colors so the application's color palette can be updated consistently throughout the stylesheet.

The interface uses cards, rounded controls, consistent spacing, and a blue color palette to create a clean and professional Todo application.

The layout uses responsive CSS so the controls and content adjust for smaller screen sizes. On larger screens, the Todo controls are displayed in a single row when space allows. At smaller widths, the search field moves to its own row and the layout adapts for easier use on tablets and mobile devices.

Accessibility was also considered through visible keyboard focus states, appropriately sized controls, labels for form fields, and keyboard-friendly interactions.

### Future Improvements
With additional development time, I would consider adding:

- Due dates for todos
- Todo categories
- Priority levels
- Drag and drop todo organization
- Additional user profiles

### License
This project is licensed under the MIT License.

### Contact

GitHub: 

[Github](https://github.com/YolandaHaynes/todo-list)