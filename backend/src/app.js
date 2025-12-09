import express from "express"
import cors from "cors"



const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "JM" },
    { id: 2, name: "Cabrera" },
  ];
  
  res.json(users);
});


export default app;

