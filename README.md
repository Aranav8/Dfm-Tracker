# Daily Fetal Movement (DFM) Tracker

A simple **offline-first React Native application** to help users record and track daily fetal movements (kick counts).

This project was built as part of a **React Native Developer Intern assignment** to demonstrate app structure, local data handling, and clean UI logic without using any backend.

---

## Features

- Record time taken to feel **10 fetal movements**
- Explicit session lifecycle:
  - Start
  - Stop
  - Save
  - Discard with confirmation
- Save sessions locally on the device
- View previously saved sessions on the Home screen
- Information bottom sheet explaining how to track fetal movements
- Data persists even after app restart
- Fully offline (no backend)

---

## Screenshots

| Home Screen | Start Recording | Recording |
|------------|----------------|-----------|
| <img src="https://github.com/user-attachments/assets/571d4a6e-311c-45c4-808b-6eed609b8e0a" width="200"/> | <img src="https://github.com/user-attachments/assets/706d9ed9-e0cc-4065-a6df-6e53121aea22" width="200"/> | <img src="https://github.com/user-attachments/assets/70f7bbfe-b151-48d5-bcf5-e8658608c5fa" width="200"/> |

| Save Confirmation | Session Too Short | Discard Session |
|------------------|------------------|----------------|
| <img src="https://github.com/user-attachments/assets/70fc4ba4-66ed-424b-b4d9-02a55aba8558" width="200"/> | <img src="https://github.com/user-attachments/assets/c275f652-92b2-4779-8755-d555366ddca7" width="200"/> | <img src="https://github.com/user-attachments/assets/9b58e234-f48f-44c4-83b4-92ffdfaa316a" width="200"/> |

| Information Sheet |
|------------------|
| <img src="https://github.com/user-attachments/assets/82c58a49-fdd8-4178-94c3-904b548354ff" width="200"/> |

---

## Screen Recording

A short screen recording demonstrating the complete app flow:
- Starting a fetal movement recording
- Timer behavior
- Save confirmation
- Validation for short sessions
- Discard confirmation
- Viewing saved records on the Home screen
- Information bottom sheet

**Watch the recording here:**  
[Google Drive – Screen Recording](https://drive.google.com/file/d/1ZDAE_Ygd4E0ew764mQV1RVJPBetmK6Iw/view?usp=sharing)

---

## Tech Stack & Libraries Used

- **React Native (CLI)** – core framework
- **TypeScript** – type safety and maintainability
- **@react-navigation/native & native-stack** – screen navigation
- **@gorhom/bottom-sheet** – information sheet UI
- **@react-native-async-storage/async-storage** – local persistence
- **react-native-svg** – SVG icons
- **react-native-linear-gradient** – UI gradients
- **react-native-reanimated & react-native-gesture-handler** – animations and gestures

---

## Project Structure

The project follows a **feature-first structure** to keep UI, state, and storage logic organized and scalable.
```
src/
├── app/
│   └── navigation/
│       └── AppNavigator.tsx              # Navigation configuration
│
├── features/
│   └── dfm/
│       ├── components/                   # Reusable UI components
│       │   ├── InfoSheet.tsx            # Bottom sheet with instructions
│       │   ├── RecordItem.tsx           # Individual record display
│       │   └── TimerDisplay.tsx         # Timer formatting component
│       ├── constants/                    # App-level constants (kick target, min duration)
│       ├── model/
│       │   └── DfmRecord.ts             # Data model interface
│       ├── storage/
│       │   └── DfmStorage.ts            # AsyncStorage persistence logic
│       ├── viewmodel/                    # Screen-specific state & logic
│       │   ├── HomeViewModel.ts         # Home screen business logic
│       │   └── RecordDfmViewModel.ts    # Timer & recording logic
│       └── views/                        # Screen components
│           ├── HomeScreen.tsx           # Main list screen
│           └── RecordDfmScreen.tsx      # Timer/tracking screen
│
├── shared/
│   ├── storage/
│   │   └── StorageKeys.ts               # Shared storage keys
│   └── utils/
│       └── timeFormatter.ts             # Utility helpers (time formatting)
│
└── App.tsx                               # Root component
```

---

## Data Storage Structure

All fetal movement sessions are stored locally using AsyncStorage.

### Record Model
```typescript
interface DfmRecord {
  id: string;                 // Unique session identifier
  startedAt: number;          // Epoch timestamp (milliseconds)
  durationSeconds: number;    // Time taken for 10 kicks (in seconds)
}
```

### Storage Shape
```json
{
  "version": 1,
  "records": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "startedAt": 1704196800000,
      "durationSeconds": 420
    }
  ]
}
```

### Design Decisions
- Session duration is stored in seconds for accuracy
- Time formatting (`mm:ss` or minutes) is handled only in the UI
- Storage is versioned to support future schema changes

## Assumptions

- A session is considered valid only if it lasts at least 1 minute
- The fetal movement target is fixed at 10 kicks
- In-progress sessions are not persisted if the app is closed
- All data is stored locally, no backend or cloud sync is used
- Article card, bookmark button, and header badge are static since no behavior was specified

---

## How to Run the Project

### Prerequisites
- Node.js `>= 20`
- Android Studio (with emulator) **or** physical Android device
- React Native CLI environment set up

### Steps

```bash
# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android
npm run android
