const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is Running...");
});



app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {

            return res.json({
    message: "User Not Found"
});

        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.json({
    message: "Incorrect Password"
});

        }

        const token = jwt.sign(

    {

        id: user.id,

        email: user.email

    },

    process.env.JWT_SECRET,

    {

        expiresIn: "1h"

    }

);

res.json({

    message:"Login Successful",

    token

});

    } catch (err) {

        console.log(err);
        res.json({
    message: "Login Failed"
});

    }

  });



app.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password,10);


        await pool.query(

            "INSERT INTO users(name, email, password) VALUES($1,$2,$3)",

            [name, email, hashedPassword]

        );

        res.send("User Registered Successfully");

    }

    catch(err){

        console.log(err);

        res.send("Registration Failed");

    }

});

app.post("/add-trip", async (req, res) => {

    try {

        // Get token from request header
        const token = req.headers.authorization;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get logged-in user's ID
        const userId = decoded.id;

        // Get trip details from React
        const { place, days, budget, rating, experience,photo} = req.body;

        console.log(req.body);

        // Save trip into PostgreSQL
        await pool.query(

            `INSERT INTO trips
            (user_id, place, days, budget, rating, experience,photo)
            VALUES($1,$2,$3,$4,$5,$6,$7)`,

            [
                userId,
                place,
                days,
                budget,
                rating,
                experience,
                photo
            ]

        );

        res.send("Trip Added Successfully");

    } catch (err) {

        console.log(err);

        res.send("Failed to Add Trip");

    }

});

app.get("/my-trips", async (req, res) => {

    try {

        // Get token from React
        const token = req.headers.authorization;

        // Verify JWT
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        // Logged-in user's ID
        const userId = decoded.id;

        

        // Fetch only this user's trips
        const result = await pool.query(

            "SELECT * FROM trips WHERE user_id = $1",

            [userId]

        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message: "Failed to Fetch Trips"

        });

    }

});

app.delete("/delete-trip/:id", async (req, res) => {

    try {

        const token = req.headers.authorization;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const tripId = req.params.id;

        await pool.query(

            "DELETE FROM trips WHERE id = $1 AND user_id = $2",

            [tripId, userId]

        );

        res.send("Trip Deleted Successfully");

    } catch (err) {

        console.log(err);

        res.send("Failed to Delete Trip");

    }

});

app.post("/bucketlist", async (req, res) => {

    try {

        const token = req.headers.authorization;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const { place } = req.body;

        await pool.query(

            "INSERT INTO bucketlist(user_id, place) VALUES($1,$2)",

            [userId, place]

        );

        res.send("Place Added Successfully");

    }

    catch(err){

        console.log(err);

        res.send("Failed");

    }

});

app.get("/bucketlist", async (req, res) => {

    try {

        const token = req.headers.authorization;

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const userId = decoded.id;

        const result = await pool.query(

            "SELECT * FROM bucketlist WHERE user_id = $1",

            [userId]

        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to Fetch Bucket List"

        });

    }

});

app.delete("/bucketlist/:id", async (req, res) => {

    try {

        const token = req.headers.authorization;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const id = req.params.id;

        await pool.query(

            "DELETE FROM bucketlist WHERE id = $1 AND user_id = $2",

            [id, userId]

        );

        res.send("Place Deleted Successfully");

    } catch (err) {

        console.log(err);

        res.send("Failed");

    }

});

app.get("/dashboard", async (req, res) => {

    try {

        const token = req.headers.authorization;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        // Get user details
        const userResult = await pool.query(

            "SELECT name, email FROM users WHERE id = $1",

            [userId]

        );

        // Total trips
        const tripResult = await pool.query(

            "SELECT COUNT(*) FROM trips WHERE user_id = $1",

            [userId]

        );

        // Total budget
        const budgetResult = await pool.query(

            "SELECT COALESCE(SUM(budget),0) AS total FROM trips WHERE user_id = $1",

            [userId]

        );

        // Total photos
        const photoResult = await pool.query(

            "SELECT COUNT(photo) FROM trips WHERE user_id = $1 AND photo IS NOT NULL",

            [userId]

        );

        // Bucket list count
        const bucketResult = await pool.query(

            "SELECT COUNT(*) FROM bucketlist WHERE user_id = $1",

            [userId]

        );

        res.json({

            name: userResult.rows[0].name,

            email: userResult.rows[0].email,

            totalTrips: tripResult.rows[0].count,

            totalBudget: budgetResult.rows[0].total,

            totalPhotos: photoResult.rows[0].count,

            bucketList: bucketResult.rows[0].count

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Dashboard Failed"

        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});