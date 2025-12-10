import { auth, db } from "../config/firebase.js";
import dotenv from "dotenv" 

dotenv.config()

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


// Login User
export const loginUser = async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    return res.status(400).json({error: "Email and password are required"})
  }

  try {
    const firebaseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`
    const response = await fetch(firebaseUrl, {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    })

    const data = await response.json()
    if (data.error) return res.status(401).json({error: data.error.message})

    res.json({
      message: "Login succesfully",
      token: data.idToken
    })
  } catch (error) {
    console.log(error)

  }
}