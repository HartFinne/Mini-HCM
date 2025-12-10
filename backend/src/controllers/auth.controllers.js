import { auth, db } from "../config/firebase.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, timezone } = req.body;

    // for backend testing comment it if there is a connected frontend
    // const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // 2️⃣ Create Firebase Auth user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    // 3️⃣ Create Firestore document
    await db.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
      role: "employee",
      timezone,
      schedule: {
        start: "9:00",
        end: "18:00"
      },
      createdAt: new Date()
    });

    res.status(201).json({ message: "User registered successfully!" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
