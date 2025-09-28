import {regions} from './const'

export async function GET() {
    // const a = await fetch(`${process.env.API_PATH}/map/routes`)
    // console.log(a)
    return Response.json(regions)
}
