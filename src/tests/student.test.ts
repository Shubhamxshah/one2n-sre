import { describe, expect, test, it } from "@jest/globals";
import request from "supertest";
import { app } from "..";

describe("Routes /student", () => {
  it("should create a new student", async () => {
    const res = await request(app).post("/api/v1/student").send({
      rollId: 111,
      name: "test user",
      standard: 12
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("new student test user created")
  })

  it("should update the new student", async () => {
    const res = await request(app).put("/api/v1/student").send({
      rollId: 111, 
      name: "test user updated", 
      standard: 10
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("student details updated test user updated 10")
  })

  it("should delete the newly created user", async () => {
    const res = await request(app).delete("/api/v1/student").send({
      rollId: 111
    })
    expect(res.statusCode).toBe(201)
    expect(res.body.message).toBe("student with id 111 deleted ")
  })
})
