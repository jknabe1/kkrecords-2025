import { NextResponse } from 'next/server';
import { client } from "@/sanity/client"

export async function POST(req: Request) {
  const { query } = await req.json();

  const results = await client.fetch(
    `*[_type == "artist" && name match $q]{
        _id,
        name,
        slug,
        "excerpt": bio[0].children[0].text
      }`,
    { q: `*${query}*` }
  );

  return NextResponse.json(results);
}
