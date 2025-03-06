import dotenv from "dotenv";

dotenv.config();

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development" });
}
