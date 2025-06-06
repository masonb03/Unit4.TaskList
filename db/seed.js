import db from "./client.js";
import bcrypt from "bcrypt";
import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const password = "gamera"
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name: "mason",
    password: hashedPassword,
  });

  await createTask({ title: "Walk dogs", done: "false", user_id: user.id});
  await createTask({ title: "Get groceries", done: "false", user_id: user.id});
  await createTask({ title: "Procrastinate Project", done: "true", user_id: user.id});
}
