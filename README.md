# 🦸‍♂️ Heroes App

A **Single Page Application (SPA)** built with **Angular 18** that allows users to **list, create, update, and delete heroes** (CRUD functionality). The app includes **pagination, filtering, and form validations** to enhance the user experience.

## 🚀 Features
✅ **List heroes** with search and pagination  
✅ **Add new heroes** with a dynamic form  
✅ **Edit existing heroes**  
✅ **Delete heroes** with a confirmation dialog  
✅ **Angular Material UI** for an enhanced experience  
✅ **Loading interceptor** for better UX  
✅ **Custom directives** for reusable UI behaviors  
✅ **Docker support** for containerized deployment  

---

## 📦 Installation & Setup

### 1️. Clone the Repository
```bash
git clone https://github.com/RamzoDeveloper/heroes-app.git
cd heroes-app
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Run the Application
```bash
npm start
```
Now open http://localhost:4200/ in your browser.

## 🛠️ Build for Production
To generate an optimized build, run:
```bash
npm run build
```
The build files will be available in the dist/heroes-app folder.

## 🐳 Running with Docker

### 1️. Build the Docker Image
```bash
docker build -t heroes-app .
```

### 2. Run the Docker Container
```bash
docker run -p 8080:80 heroes-app
```
Now access the app at:
🔗 http://localhost:8080
### Alternatively, you can use docker-compose:

```bash
docker-compose up --build -d
```

## 🏗️ Technologies Used

✅ **Angular 18** Frontend framework  
✅ **Angular Material & Bootstrap** UI components  
✅ **Docker** Deployment