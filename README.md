# 📝 My Notes – A Simple Note-Taking Web App  

My Notes is a web application designed to help users manage their notes efficiently. It provides an intuitive interface for creating, organizing, and securing notes with authentication.

## 👨‍💻 Developed by:
- **M. Rabyndra Janitra Binello**  

---

## ✨ Features  
✅ **User Authentication** – Secure login and registration system.  
✅ **View Notes** – Display a list of all saved notes.  
✅ **Add Notes** – Create and store new notes.  
✅ **Delete Notes** – Remove unwanted notes permanently.  
✅ **Pin Notes** – Keep important notes at the top for easy access.  

---

## 🛠️ Technologies Used  
🔹 **Frontend** → EJS, Tailwind CSS  
🔹 **Backend** → Node.js, Express.js  
🔹 **Database** → MySQL  

---

## ⚙️ Installation Guide  

### 1️⃣ Setup the Database  
- Open **XAMPP** and create a new database named **mynotebook**.  
- Import the `mynotebook.sql` file located in the `database` folder.  
- If successful, the database will contain two tables: **User** and **Notes**.  

### 2️⃣ Running the Project  
- Open the project in **Visual Studio Code**.  
- Open the terminal and run the following command to install dependencies:  
  ```bash
  npm install

  ```
- Ensure that **MySQL** and **Apache** in **XAMPP** are running.
- Adjust the **MySQL** **username** and **password** in the `.env` file to match your configuration.

  - **Default**: `USERNAME=root`, `PASSWORD=` (empty).
- Start the server using:
  ```bash
  npm run start:dev
  ```

## 🌐 Accessing the BukuKu Website

- Open your browser and visit:
  ```
  http://localhost:2000
  ```
- You will be directed to the **login** page.
- **Register** or use the following credentials to log in:
  - **Username**: `ElloRabyndra`
  - **Password**: `123456`

**Congratulations! You can now use My Notes to manage your notes easily!**

