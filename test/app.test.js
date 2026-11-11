
const request = require("supertest");
const app = require("../src/app");

describe("User Management API", () => {

    // Test 1: Welcome API
    test("Should return welcome message", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain("Welcome");
    });

    // Test 2: Health check
    test("Should return application health status", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("UP");
    });

    // Test 3: Get all users
    test("Should return all users", async () => {
        const response = await request(app).get("/api/users");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    // Test 4: Get user by ID
    test("Should return user by ID", async () => {
        const response = await request(app).get("/api/users/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.data.name).toBe("Nagaraju");
    });

    // Test 5: Invalid user ID
    test("Should return 400 for invalid user ID", async () => {
        const response = await request(app).get("/api/users/abc");

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid user ID");
    });

    // Test 6: User not found
    test("Should return 404 if user does not exist", async () => {
        const response = await request(app).get("/api/users/999");

        expect(response.statusCode).toBe(404);
    });

    // Test 7: Create user
    test("Should create a new user", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "John",
                email: "john@example.com"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.data.name).toBe("John");
    });

    // Test 8: Validate user input
    test("Should reject user without required fields", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "John"
            });

        expect(response.statusCode).toBe(400);
    });

    // Test 9: Delete user
    test("Should delete an existing user", async () => {
        const response = await request(app)
            .delete("/api/users/3");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });

    // Test 10: Delete non-existing user
    test("Should return 404 when deleting missing user", async () => {
        const response = await request(app)
            .delete("/api/users/999");

        expect(response.statusCode).toBe(404);
    });

});
