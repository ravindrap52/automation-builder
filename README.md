# automation-builder
Automation Builder using Next JS and React Flow

## Libraries Used

### shadcn/ui
I used shadcn/ui components for this project, as they come with Tailwind utility classes support and can be easily customized.

### React Hook Form
I utilized React Hook Form for form validation because it is lightweight and minimizes re-renders.

### Zod
I used Zod for validations.

## Areas for Improvement

1. **Unit Tests**
   - Writing more unit test cases for scenarios such as checking whether the popup opens when a node is clicked.
   - Mocking APIs for testing purposes. I have already written unit test cases for the dialog and form validation.

2. **Client Components in Next.js**
   Since we are using client components, Next.js Suspense won't work here. We can use libraries like TanStack Query to manage different states such as loading and error. This library can greatly enhance performance.

3. **UI Enhancements**
   Making the UI more attractive by using different colors and animations.

## Project Setup

### Cloning the Repository
To clone the repository, use the following command:
```bash
git clone https://github.com/ravindrap52/automation-builder.git
```
### Installation
To install the dependencies by running, use the following command:
```bash
cd automation-builder
npm install
```
### Running the Development Server
To start the development server, run:
```bash
npm run dev
```
#### open Broswer and navigate to http://localhost:3000.

### Building for Production
To build the project for production, use:
```bash
npm run build
```
