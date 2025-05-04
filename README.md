# 📚 MyBigShelf

**BigShelf** is a dropshipping online bookstore designed to make books more accessible to readers across Nigeria, and help them actually finish the books they buy. This repo contains the codebase for the BigShelf website, built with performance, clarity, and mobile-first design in mind.

# 🎯 Big Philosophy

> ✨ At BigShelf, we believe a book’s real value comes from finishing it — not just buying it.

BigShelf is more than an e-commerce site. It’s a movement to help people get real value from their books that is why we build tools to help users go from buying a book to actually getting something out of it.

---

## 🌐 Live Site

🔗 [mybigshelf.com](https://mybigshelf.com)

---

## 🚀 Key Features

- Browse and discover books by genre, author, or title
- Search with filtering options
- Add to cart and checkout with Paystack integration
- Track orders and delivery status
- Responsive across devices
- Delivery by individual order and by BookHauls
- Coupon support for the checkout system (Coming soon)
- AI agent to help people find what they are looking for (Coming soon)
- A fun, game-like system that keep users motivated to read and finish their books. (Coming soon)

---

## 🧰 Tech Stack

| Layer      | Tech                           |
| ---------- | ------------------------------ |
| Framework  | [React.js](https://react.dev/) |
| Language   | TypeScript                     |
| Styling    | Tailwind CSS + custom css      |
| State Mgmt | Zustand, React Query           |
| Payments   | Paystack                       |
| Deployment | Vercel                         |

---

## 🗂️ Project Structure

MyBigShelf/
├── src/  
│ ├── routes/ # Application routing (e.g., Router.ts)
│ ├── services/ # API clients and service logic (e.g., protected-api-client.ts)
│ ├── stores/ # Zustand state management (e.g., cartStore.ts)
│ ├── pages/ # Page components for routes
│ ├── components/ # Shared UI components
│ ├── hooks/ # Custom React hooks
│ └── utils/ # Utility functions (e.g., JWT validation)
│
├── public/ # Static assets (e.g., images, icons)
└── .env.local # Environment configuration

---

## 🛠️ Getting Started

To run the project locally:

```bash
# Clone the repo
git clone https://github.com/thekingslee/MyBigShelf.git
cd MyBigShelf

# Install dependencies
npm install

# Edit the .env.local file with your specific configuration
cp example.env .env.local

# Start the development server
npm dev
```

---

## 📬 Contact

For inquiries, feedback, or collaboration, feel free to reach out:

- Twitter: [Kingslee](https://twitter.com/nworiekingslee)
- Email: [kingslee@bigshelf.ng](mailto:kingslee@mybigshelf.com)
