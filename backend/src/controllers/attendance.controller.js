import { admin, db } from "../config/firebase.js"; // import admin + firestore
import { getTodayDate } from "../utils/getToday.js";

export const punchIn = async (req, res) => {
  try {
    const uid = req.user.uid;
    const timezone = req.user.timezone || "Asia/Manila";
    const today = getTodayDate(timezone); // e.g., "2025-12-11"
    const now = admin.firestore.Timestamp.now();

    const docRef = db
      .collection("attendance")
      .doc(uid) // link to user UID
      .collection("records")
      .doc(today);

    const doc = await docRef.get();

    if (doc.exists && doc.data().punchIn) {
      return res.status(400).send({ message: "Already punched in." });
    }

    await docRef.set(
      {
        punchIn: now,
        status: "missing-out",
        punches: [
          {
            type: "IN",
            timeStamps: now, // use "timeStamps" to match your schema
          },
        ],
      },
      { merge: true }
    );

    res.send({ message: "Punch in recorded." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const punchOut = async (req, res) => {
  try {
    const uid = req.user.uid;
    const timezone = req.user.timezone || "Asia/Manila";
    const today = getTodayDate(timezone);
    const now = admin.firestore.Timestamp.now();

    const docRef = db
      .collection("attendance")
      .doc(uid)
      .collection("records")
      .doc(today);

    const doc = await docRef.get();

    if (!doc.exists || !doc.data().punchIn) {
      return res.status(400).send({ message: "You did not punch in." });
    }

    if (doc.data().punchOut) {
      return res.status(400).send({ message: "Already punched out." });
    }

    await docRef.set(
      {
        punchOut: now,
        status: "completed",
        punches: admin.firestore.FieldValue.arrayUnion({
          type: "OUT",
          timeStamps: now,
        }),
      },
      { merge: true }
    );

    res.send({ message: "Punch out recorded." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
