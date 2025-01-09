import { Response, Request } from "express";

export async function addManager(req: Request, res: Response) {
    res.send("Hello Manager!");
}