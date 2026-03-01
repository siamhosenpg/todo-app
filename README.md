# Next.js Todo Application

A full-stack Todo application built with **Next.js (App Router)**, **MongoDB**, **NextAuth.js**, and **Tailwind CSS**. This project demonstrates Server Actions, Optimistic UI updates, protected routes, and client-server integration for a responsive Todo experience.

---

## Features

### ✅ Authentication

- User login using **NextAuth.js** with credentials.
- JWT-based sessions with server-side session verification.
- Todos are linked to a specific user (`userId`), so each user only sees their own tasks.
- **Protected Routes**: Pages are only accessible to logged-in users.

### ✅ Todo CRUD Operations

- **Create**: Server Action with **Zod validation** and **Optimistic UI**.
- **Read**:
  - Server-side initial data fetch.
  - Client-side debounced search via `/api/todos`.
  - Filtering by completed, pending, and today’s tasks.
- **Update**: Toggle todo completion via Server Actions.
- **Delete**: Server-side deletion with client UI update.

### ✅ Client-side Features

- Optimistic updates with temporary “Pending” status.
- useTransition to show loading while server updates occur.
- Success and error messages for feedback.
- Debounced search with live client-side filtering.

### ✅ Styling

- Fully responsive UI using **Tailwind CSS**.
- Custom layout with navigation and sidebar components.

---

## Tech Stack

- **Framework**: Next.js (App Router, Server Components & Client Components)
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js (Credentials + JWT)
- **Validation**: Zod for form validation
- **Styling**: Tailwind CSS
- **Icons**: react-icons

---

## How It Works

1. **Authentication**
   - User logs in via NextAuth.js credentials.
   - Each todo is associated with `userId`.
   - ProtectedRoute ensures only logged-in users can access pages.

2. **Creating Todos**
   - User submits a todo in `TodoForm`.
   - Uses **Server Action** and **useOptimistic** for instant feedback.
   - Validates input using Zod.
   - Displays “Pending” state until server confirms creation.

3. **Updating Todos**
   - Toggle completion directly updates server via Server Action.
   - useTransition shows loading state per todo item.

4. **Deleting Todos**
   - Soft-delete handled via API route.
   - Client-side UI updates without page reload.

5. **Searching Todos**
   - Initial todos fetched in Server Component.
   - Search input triggers **debounced client-side API fetch**.
   - Search results only show user-specific todos.

---

## How to Run Locally

1. Clone the repository:

````bash
git clone <your-repo-url>
cd <project-folder>





---

## How It Works

1. **Authentication**
   - User logs in via NextAuth.js credentials.
   - Each todo is associated with `userId`.
   - ProtectedRoute ensures only logged-in users can access pages.

2. **Creating Todos**
   - User submits a todo in `TodoForm`.
   - Uses **Server Action** and **useOptimistic** for instant feedback.
   - Validates input using Zod.
   - Displays “Pending” state until server confirms creation.

3. **Updating Todos**
   - Toggle completion directly updates server via Server Action.
   - useTransition shows loading state per todo item.

4. **Deleting Todos**
   - Soft-delete handled via API route.
   - Client-side UI updates without page reload.

5. **Searching Todos**
   - Initial todos fetched in Server Component.
   - Search input triggers **debounced client-side API fetch**.
   - Search results only show user-specific todos.

---

## How to Run Locally

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <project-folder>
````
