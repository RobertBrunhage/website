// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient, Shit } from "@prisma/client";

// const prisma = new PrismaClient();

export type Response<T> = {
  message: string;
  success: boolean;
  value?: T;
  errors?: string[];
};


export default withApiAuthRequired(handler);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<boolean>>
) {
  // This will allow OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).send({ success: true, message: "You are authenticated" });
  }

  if (req.method === "POST") {
    return res.status(500).json({ success: false, message: 'Not implemented' });
  } else if (req.method === "GET") {
    return await hasCourseAccess(res);
  } else {
    return res.status(405).json({ success: false, message: 'Not implemented' });
  }
}

async function hasCourseAccess(
  res: NextApiResponse<Response<boolean>>
) {
  try {
    // Do request to planetscale to see if you have access to the course
    // let shits = await prisma.shit.findMany();
    return res.status(200).json({ success: true, message: "You are authenticated", value: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ success: false, message: "Server exception" });
  }
}
