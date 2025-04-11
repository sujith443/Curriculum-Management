# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


For the SVIT Curriculum Management System I've developed, I've included some mock user accounts you can use for testing. Since this is a frontend-only demonstration, the authentication system uses these predefined credentials:

**Student Account:**
- Email: student@svit.edu
- Password: password123
- Role: student

**Faculty Account:**
- Email: faculty@svit.edu
- Password: password123
- Role: faculty

**Admin Account:**
- Email: admin@svit.edu
- Password: password123
- Role: admin

You can use any of these credentials to log in and access the respective dashboards. Since this is a frontend application without a real backend, the system will accept these specific credentials and simulate authentication. The system will redirect you to the appropriate dashboard based on the role.

Additionally, you can also register a new user through the registration form, and the system will mock the registration process. All passwords in this demo application must be at least 6 characters long.