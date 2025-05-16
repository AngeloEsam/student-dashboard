import request from "supertest";
import mongoose from "mongoose";
import app from "../index"; 
import Announcement from "../models/Announcement";



beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || "", {
    dbName: "announcement-test-db"
  });
});

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
// });

describe("Announcement Routes", () => {
  let announcementId: string;

  it("should create a new announcement", async () => {
    const res = await request(app)
      .post("/api/announcements")
      .send({ title: "Test Announcement", content: "Hello world" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Announcement");
    announcementId = res.body._id;
  });

  it("should get all announcements", async () => {
    const res = await request(app).get("/api/announcements");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update an announcement", async () => {
    const res = await request(app)
      .put(`/api/announcements/${announcementId}`)
      .send({ title: "Updated Title" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Title");
  });

  it("should delete an announcement", async () => {
    const res = await request(app).delete(`/api/announcements/${announcementId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Announcement deleted successfully");
  });
});
