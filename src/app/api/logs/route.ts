import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const content = 'timestamp,level,message\n2025-09-29T10:00:00Z,INFO,Sample log entry'
    const file = new Blob([content], { type: 'text/csv' })

    return new NextResponse(file.stream(), {
      status: 200,
      headers: new Headers({
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="logs.csv"',
        'Cache-Control': 'no-store',
      }),
    })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to generate logs' }, { status: 500 })
  }
}


