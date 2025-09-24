import {regions} from './const'

export async function GET() {
    return Response.json(regions)
}