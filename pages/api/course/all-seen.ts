// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/database/user';
import { Response } from './course';

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type SeenLecture = {
  name: string;
  seen: boolean;
}

export type AllSeenResponse = {
  allSeen: SeenLecture[],
}

export type _SeenRequest = {
  courseName: string;
}

export type MarkSeenRequest = Override<NextApiRequest, { body: _SeenRequest }>

export default withApiAuthRequired(handler);

async function handler(
  req: MarkSeenRequest,
  res: NextApiResponse<Response<AllSeenResponse>>
) {
  let session = await getSession(req, res);
  // This will allow OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).send({ success: true, message: "You are authenticated" });
  }

  if (req.method === "POST" && session) {
    return await seen(req, res, session);
  } else if (req.method === "GET") {
    return res.status(500).json({ success: false, message: 'Not implemented' });
  } else {
    return res.status(405).json({ success: false, message: 'Not implemented' });
  }
}

async function seen(
  req: MarkSeenRequest,
  res: NextApiResponse<Response<AllSeenResponse>>,
  session: Session,
) {
  try {
    let response = await prisma.lectureUserInfo.findMany({
      where: {
        user: {
          sub: session.user.sub,
        },
        lecture: {
          Course: {
            name: req.body.courseName,
          }
        }
      },
      include: {
        lecture: true,
      }
    });

    let allSeen: SeenLecture[] = [];
    for (let i = 0; i < response.length; i++) {
      allSeen.push({ name: response[i].lecture.name, seen: response[i].seen });
    }

    return res.status(200).json({ success: true, message: "Successfully set the seen property", value: { allSeen } });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ success: false, message: "Server exception" });
  }
}
