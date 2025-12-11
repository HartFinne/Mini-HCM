import { admin, db } from "../config/firebase.js"; // import admin + firestore
import { getTodayDate } from "../utils/getToday.js";

export const punchIn = async (req, res) => {
  try {
    const uid = req.user.uid;
    const timezone = req.user.timezone || "Asia/Manila";
    const today = getTodayDate(timezone); // e.g., "2025-12-11"
    // const today = "2025-12-12";
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
      },
      { merge: true }
    );

    res.send({ message: "Punch out recorded." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


export const getTodayAttendance = async (req, res) => {
  try {
    const uid = req.user.uid;
    const today = getTodayDate(req.user.timezone || "Asia/Manila");
    const docRef = db
      .collection("attendance")
      .doc(uid)
      .collection("records")
      .doc(today);

    const doc = await docRef.get();

    if (!doc.exists) {
      return res.send({
        punchIn: null,
        punchOut: null,
        punches: [],
        status: null
      });
    }

    const data = doc.data();

    res.send({
      punchIn: data.punchIn ? data.punchIn.toDate() : null,
      punchOut: data.punchOut ? data.punchOut.toDate() : null,
      punches: data.punches
        ? data.punches.map((p) => ({
            type: p.type,
            timeStamps: p.timeStamps.toDate()
          }))
        : [],
      status: data.status || null
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
