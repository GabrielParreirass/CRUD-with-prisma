const express = require("express");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post("/add", async (req: any, res: any) => {
  const user = await prisma.users.create({
    data: {
      name: "Siclano",
      password: "asjdasdasdsa",
      email: "delete@email.com",
      age: 20,
      family: {
        create: {
          father: "Luis",
          mother: "Carla",
          brother: true,
          sister: true,
        },
      },
    },
    include: { family: true },
  });

  return res.json({ user });
});

app.get("/find", async (req: any, res: any) => {
  const users = await prisma.users.findMany({});

  return res.json({ users });
});

app.patch("/update", async (req: any, res: any) => {
  const updtUser = await prisma.users.update({
    where: {
      email: "email@email.com",
    },
    data: {
      name: "User test for update",
    },
  });

  return res.json({ updtUser });
});

app.delete("/delete", async (req: any, res: any) => {
  const deletedUser = await prisma.users.delete({
    where: {
      email:"delete@email.com",
    }
  })

  return res.json({ deletedUser });
});

app.listen(3001, () => {
  console.log("rodando na 3001");
});
