// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/database/user';
import { Response } from '../../../lib/response';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type _HasAccessRequest = {
  stripeProductId: string;
}

export type HasAccessRequest = Override<NextApiRequest, { body: _HasAccessRequest }>

export default withApiAuthRequired(handler);

async function handler(
  req: HasAccessRequest,
  res: NextApiResponse<Response<boolean>>
) {
  let session = await getSession(req, res);
  // This will allow OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).send({ success: true, message: "You are authenticated" });
  }

  if (req.method === "POST" && session) {
    return await hasCourseAccess(session, req, res);
  } else if (req.method === "GET") {
    return res.status(500).json({ success: false, message: 'Not implemented' });
  } else {
    return res.status(405).json({ success: false, message: 'Not implemented' });
  }
}

async function hasCourseAccess(
  session: Session,
  req: HasAccessRequest,
  res: NextApiResponse<Response<boolean>>
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        sub: session.user.sub,
      },
      include: {
        courses: true,
      }
    });

    let hasCourse = user?.courses.map((c) => c.stripeProductId).includes(req.body.stripeProductId);

    return res.status(200).json({ success: true, message: "You are authenticated", value: hasCourse });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ success: false, message: "Server exception" });
  }
}
