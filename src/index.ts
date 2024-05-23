import * as dotenv from "dotenv";
import app from "./server";

dotenv.config();

const port = 3001;

app.listen(3001, () => {
  console.log(`Server is running on port ${port}`);
});
