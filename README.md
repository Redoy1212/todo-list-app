# ✅ To-Do List App

A beautiful and simple To-Do list application with local storage functionality.

## 🌟 Features

- ✅ **Add Tasks** - Create new tasks with ease
- 📝 **Edit & Delete** - Manage your tasks
- ✔️ **Mark Complete** - Check off completed tasks
- 🔍 **Filter Tasks** - View All, Active, or Completed tasks
- 💾 **Local Storage** - All tasks saved locally using AsyncStorage
- 📱 **Responsive Design** - Works perfectly on all screen sizes
- 🎨 **Beautiful UI** - Clean and modern interface
- 📊 **Task Stats** - Track your progress

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/Redoy1212/todo-list-app.git
cd todo-list-app

# Install dependencies
npm install

# Start the app
npm start
```

### Running on Device

```bash
# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## 📁 Project Structure

```
todo-list-app/
├── App.tsx          # Main app component
├── app.json         # Expo configuration
└── package.json     # Dependencies
```

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform
- **TypeScript** - Type-safe development
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - Beautiful icons

## 💡 How to Use

1. **Add a Task**: Type in the input field and tap the + button
2. **Complete a Task**: Tap the checkbox to mark as done
3. **Delete a Task**: Tap the delete icon
4. **Filter Tasks**: Use the filter buttons (All, Active, Completed)
5. **Track Progress**: See your completion stats at the top

## 🎨 Customization

### Colors
Edit the colors in `App.tsx`:
- Primary Color: `#2196F3` (Blue)
- Background: `#f5f5f5`
- Text: `#333`

### Font Size
Modify `fontSize` values in the StyleSheet

## 📱 Screenshots

- Clean task list with checkboxes
- Filter options (All, Active, Completed)
- Task creation with validation
- Completion tracking

## 🔐 Data Storage

All tasks are saved in device's local storage using AsyncStorage. Data persists even after app restart.

## 🚀 Future Enhancements

- [ ] Due dates for tasks
- [ ] Task categories/tags
- [ ] Priority levels
- [ ] Recurring tasks
- [ ] Cloud sync
- [ ] Dark mode
- [ ] Task notifications
- [ ] Export/Import tasks

## 📄 License

MIT License - feel free to use and modify!

## 👨‍💻 Author

Created by Redoy1212

---

**Start organizing your tasks today! 🎯**
