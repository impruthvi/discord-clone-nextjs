# Discord Clone 

## Overview

This project is a Discord clone website created using Next.js 13 with a wide range of features and technologies to provide users with a robust chat and communication platform. It offers real-time messaging, multimedia support, voice and video calls, member management, server customization, and more.

## Features

### Real-time Messaging

- Utilizes Socket.io for real-time messaging, ensuring instant communication between users.

### File Attachments

- Users can send attachments as messages, enhancing the user experience.

### Message Management

- Allows users to delete and edit messages in real time, ensuring a smooth and interactive chat experience.

### Communication Channels

- Supports text, audio, and video call channels, offering various communication options to users.

### Private Conversations

- Enables one-on-one conversations between members for private interactions.

### Video Calls

- Supports one-on-one video calls between members for face-to-face communication.

### Member Management

- Admins can kick users and change their roles between guest and moderator for effective member management.

### Invite System

- Implements a unique invite link generation system for inviting new members to the platform.

### Message Pagination

- Uses tanstack/query to load messages in batches of 10, providing an efficient and seamless chat experience.

### Server Customization

- Allows users to create and customize servers to tailor their experience to their preferences.

### User Interface

- Features a beautiful and responsive UI design using TailwindCSS and ShadcnUI, ensuring an aesthetically pleasing user experience.

### Light/Dark Mode

- Offers both light and dark mode options to accommodate user preferences and reduce eye strain.

### Websocket Fallback

- Implements a fallback mechanism using polling with alerts in case WebSocket connectivity is unavailable.

### Database and ORM

- Utilizes Prisma as an Object-Relational Mapping (ORM) tool and a MySQL database hosted on Planetscale for efficient data management.

### Authentication

- Implements user authentication using Clerk for secure and personalized user experiences.

## Getting Started

1. Clone this repository to your local machine.

   ```shell
   git clone https://github.com/impruthvi/discord-clone-nextjs.git
   ```
2. Install the necessary dependencies.
   ```shell
   cd discord-clone-nextjs
   npm install
   ```
3. Configure environment variables for database, authentication, and other settings.
   ```shell
   cp .env.example .env
   ```

 4. Start the development server.
    ```shell
    npm run dev
     ```
  5. Access the application in your web browser at http://localhost:3000.

## Technologies Used

The Discord clone website is built using the following technologies and tools:

- **Next.js 13:** A popular JavaScript framework for building modern web applications, offering server-side rendering and a great developer experience.

- **Socket.io:** A library for real-time, bidirectional communication between clients and the server, enabling instant messaging.

- **UploadThing:** Used for sending attachments as messages within the chat application.

- **Prisma:** An Object-Relational Mapping (ORM) tool for working with databases, simplifying database interactions.

- **MySQL (Planetscale):** A relational database used for storing and managing data, hosted on Planetscale for scalability and reliability.

- **Clerk:** Provides user authentication and user management features to enhance security and user experiences.

- **Tanstack/Query:** Used for efficient message pagination, fetching data in batches for a smooth chat experience.

- **TailwindCSS:** A utility-first CSS framework for creating beautiful and responsive user interfaces.

- **ShadcnUI:** A UI component library or framework used to enhance the aesthetics and user experience of the website.


## Contributing

We welcome and appreciate contributions from the open-source community. If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository to your GitHub account.

2. Create a new branch for your feature or bug fix:

   ```shell
   git checkout -b feature/your-feature
    ```
3. Commit your changes with a descriptive commit message:
   ```shell
   git commit -m "Add feature: your feature description"
   ```
4. Push your changes to your fork:
   ```shell
    git push origin feature/your-feature
   ```
5. Create a pull request (PR) to the main repository, describing your changes and improvements.
6. Your PR will be reviewed, and once approved, your changes will be merged into the project.

- Thank you for contributing to our project!

## Demo

Check out the live demo of Discord Clone [here](https://discord-clone-impruthvi.vercel.app/).

## Contact

Created by [@impruthvi](https://impruthvi.netlify.app/) if you have any questions or suggestions.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Support

If you find this project helpful or interesting, please consider giving it a ⭐️ on GitHub!
   
