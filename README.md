Option 2: B2C Store Application

Objective
Design and develop a Business-to-Consumer (B2C) Store application as a continuation of the current assignment. The application will allow users to browse and purchase products, while administrators can manage products and view purchase records.

Requirements

Continuation of Current Assignment:
You can build upon the existing codebase from the current assignment, ensuring all existing functionality is preserved and fully operational.
All tests from the current assignment must pass, and any existing bugs must be resolved.
Integrate the new B2C store features seamlessly with the existing application structure.
Core Functionality:

Frontend:
Display a list of products with details (e.g., name, description, price, image).
Allow users to browse products, filter by categories (e.g., electronics, clothing), and search by product name.
Enable users to add products to a cart and complete purchases (e.g., via a mock payment system).

Backend:
Implement a RESTful or tRPC API to manage products and purchases.
Provide endpoints for administrators to add, delete, or modify products (e.g., name, price, description, category, stock quantity).
Include endpoints to retrieve purchase history (e.g., user ID, product ID, date, total amount).

Database:
Store product details, user information, and purchase records in a relational (e.g., PostgreSQL, MySQL) or non-relational (e.g., MongoDB) database.
Ensure proper schema design to handle relationships (e.g., users to purchases, products to categories).

User Interface (UI):
Design a clean, intuitive, and responsive UI for browsing products and managing the cart.
Use a CSS framework (e.g., Tailwind CSS, Bootstrap) or custom styles for a professional look.
Ensure accessibility (e.g., ARIA labels, keyboard navigation) and mobile responsiveness.

Minimum Features:
Include at least five distinct features, such as:
User Authentication: Secure login/registration for users and admins (e.g., JWT, OAuth).🔰
Shopping Cart: Allow users to add/remove products and view the cart before checkout.✔️
Payment Integration: Integrate a mock or real payment gateway (e.g., Stripe, PayPal).
Purchase History: Display a user’s past purchases with details (e.g., date, items, total).
Product Filtering/Search: Enable filtering by category and searching by product name.✔️
Admin Dashboard: Provide a UI for admins to manage products and view purchase records.

Technical Requirements:
Frontend: Use a modern JavaScript framework (e.g., React, Vue.js, Angular).
Backend: Use a server-side framework (e.g., Node.js).
Database: Choose an appropriate database for the application.
Deployment: Deploy the application to a public hosting platform (e.g., Heroku, Vercel, AWS).
Version Control: Use Git, with a repository on GitHub or GitLab. Include a README.md with setup and deployment instructions.
Deliverables
Source code in a GitHub/GitLab repository (provide the link).
Deployed application URL.
All new functionality must be accompanied by E2E tests
Your own CI pipeline executing the tests
API documentation.
A short demo video (3-5 minutes) showcasing the application’s features and functionality, including how it extends the current assignment.
Grading Criteria
Functionality (40%): Does the application work as intended? Are all required features implemented?
Code Quality (20%): Is the code well-organized, modular, and documented? Are tests included and passing?
UI/UX (20%): Is the interface polished, responsive, and user-friendly?
Documentation (10%): Is the project report clear and comprehensive? Is the API documentation complete?
Creativity and Effort (10%): Are the additional features innovative? Does the project demonstrate significant effort?
Resources
Refer to class lectures, assignments, and provided examples for guidance.
Use official documentation for your chosen frameworks and tools.
Reach out to the instructor or teaching assistants during office hours for clarification or support.