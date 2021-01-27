import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'
import Mongo from '../../services/Mongo'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (session) {
    res.statusCode = 200
    const mongo = new Mongo()
    const response = await mongo.query('micro-saas', {
      user: new ObjectID(session.user.id),
    })
    res.json(response)
  } else {
    // Not Signed in
    res.status(401)
  }
}
