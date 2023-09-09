import { NextResponse } from 'next/server'

export async function GET() {
  // fetch a post based on req.query or req.body
  return NextResponse.json({ message: "Post fetched", method: "GET" })
}

export async function DELETE(req) {
  // delete a post based on req.query or req.body
  return NextResponse.json({ message: "Post deleted", method: "DELETE" })
}

export async function POST(req) {
  // add a post based on req.body
  return NextResponse.json({ message: "Post added", method: "POST" })
}

export async function PUT(req) {
  // update a post based on req.query or req.body
  return NextResponse.json({ message: "Post updated", method: "PUT" })
}