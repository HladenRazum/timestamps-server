import * as dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const PORT = process.env.PORT || 9999;

const app = express();

app.get("/api", manageTimestamp);
app.get("/api/:date", manageTimestamp);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

function manageTimestamp(req: Request, res: Response) {
    const timestamp = Number(req.params.date);

    if (!req.params.date) {
        let now = new Date();
        return res.status(200).json({
            unix: now.getTime(),
            utc: now.toUTCString()
        });
    }

    if (isNaN(timestamp)) {
        return res.status(200).json({
            error: "Invalid Date"
        });
    }
    const formatedDate = new Date(timestamp).toUTCString();
    res.status(200).json({
        unix: timestamp,
        utc: formatedDate
    });
}




