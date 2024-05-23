import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

const port = 3001;

app.listen(3001, () => {
  console.log(`Server is running on port ${port}`);
});
