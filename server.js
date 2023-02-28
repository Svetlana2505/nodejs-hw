import app from "./app.js";
import { connection } from "./src/db/connection.js";

const start = async () => {
  try {
    await connection();

    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`);
  }
};

start();
