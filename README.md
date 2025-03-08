# 🗺️ Loco App  

Loco App is a React Native application that utilizes **React Native Maps** to display maps and allow users to create, edit, and manage markers. The app also saves markers using **Async Storage** so that they persist even after restarting. It features a splash screen and uses **Expo Location** to fetch the user's current location.

## 🚀 Features  

### 🌍 Map Functionality  
- **Current Location:** The app requests location permissions and displays the user's current location using the **Expo Location** library.  
- **Markers:** Users can create custom markers at points of interest.  
- **Marker Callout:** Each marker displays its latitude and longitude when tapped.  
- **Marker Info:** Provides additional information about a marker with options to **Save, Edit, or Delete** the marker.  
- **Marker Modal:** A modal appears when adding a new marker, prompting the user to enter a title.  

### 🔄 Data Persistence  
- **Async Storage:** Markers are stored using **React Native Async Storage**, ensuring that they remain even after the app is closed and reopened.  

### 🎨 UI Components  
- **Splash Screen:** A custom splash screen appears on app launch.  

---

## 📌 Components  

### 1️⃣ `MapComponent`  
- This component renders the map and integrates all the child components.  
- It manages state and passes required props to child components.  

### 2️⃣ `Map` (Parent Component)  
- Imports and renders all child components.  
- Declares key functions like handling user location, marker creation, and data storage.  

### 3️⃣ `MarkerCallout`  
- Displays the latitude and longitude of a marker when tapped.  

### 4️⃣ `MarkerInfo`  
- Shows detailed information about a marker.  
- Provides options to **Save, Edit, and Delete** a marker.  

### 5️⃣ `MarkerModal`  
- A modal that appears when creating a new marker.  
- Requires users to enter a marker title before saving.  
- Displays "Please enter a title" if no title is provided.  

---

## 🛠️ Tech Stack  
- **React Native**  
- **Expo**  
- **React Native Maps**  
- **Expo Location** (for fetching current location)  
- **React Native Async Storage** (for persistent data storage)  

---

## 📦 Installation  

Follow these steps to run the project locally:  

```sh
git clone https://github.com/your-username/loco-app.git

cd loco-app

npm install

npm start
