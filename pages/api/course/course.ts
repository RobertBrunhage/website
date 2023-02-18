// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/database/user';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type Response<T> = {
  message: string;
  success: boolean;
  value?: T;
  errors?: string[];
};


export type _CourseRequest = {
  courseName: string;
}


export type CourseRequest = Override<NextApiRequest, { body: _CourseRequest }>

export default withApiAuthRequired(handler);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<String | undefined>>
) {
  let session = getSession(req, res);
  // This will allow OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).send({ success: true, message: "You are authenticated" });
  }

  if (req.method === "POST" && session) {
    return await getCourseProductId(req, res);
  } else if (req.method === "GET") {
    return res.status(500).json({ success: false, message: 'Not implemented' });
  } else {
    return res.status(405).json({ success: false, message: 'Not implemented' });
  }
}

async function getCourseProductId(
  req: NextApiRequest,
  res: NextApiResponse<Response<String | undefined>>
) {
  try {
    const course = await prisma.course.findFirst({
      where: {
        name: req.body.courseName,
      },
    });


    return res.status(200).json({ success: true, message: "You are authenticated", value: course?.stripeProductId });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ success: false, message: "Server exception" });
  }
}
