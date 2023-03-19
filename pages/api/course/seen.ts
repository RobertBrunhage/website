// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/database/user';
import { Response } from './course';

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type SeenResponse = {
  seen: boolean,
}

export type _SeenRequest = {
  courseName: string;
  lectureName: string;
  seen?: boolean;
}

export type MarkSeenRequest = Override<NextApiRequest, { body: _SeenRequest }>

export default withApiAuthRequired(handler);

async function handler(
  req: MarkSeenRequest,
  res: NextApiResponse<Response<SeenResponse>>
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
  res: NextApiResponse<Response<SeenResponse>>,
  session: Session,
) {
  try {
    console.log('try pog')

    let lectureResponse = await prisma.lecture.upsert({
      where: {
        name: req.body.lectureName,
      },
      create: {
        name: req.body.lectureName,
        Course: {
          connect: {
            name: req.body.courseName,
          }
        },
      },
      update: {}
    });
    console.log(lectureResponse)
    
    let seenResponse = await prisma.lectureUserInfo.upsert({
      where: {
        lectureId: lectureResponse.id,
      },
      create: {
        lecture: {
          connect: {
            id: lectureResponse.id,
          }
        },
        user: {
          connect: {
            sub: session.user.sub,
          }
        },
        seen: true,
      },
      update: {
        seen: req.body.seen,
      },
    });

    console.log(seenResponse)
    return res.status(200).json({ success: true, message: "Successfully set the seen property", value: { seen: seenResponse.seen } });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ success: false, message: "Server exception" });
  }
}
