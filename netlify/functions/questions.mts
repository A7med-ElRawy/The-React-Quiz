import type { Config } from '@netlify/functions'
import data from '../../data/questions.json' with { type: 'json' }

export default async () => {
  return Response.json(data.questions)
}

export const config: Config = {
  path: '/questions',
}
