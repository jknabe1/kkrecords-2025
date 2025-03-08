import {client} from "@/sanity/client";
import { groq } from "next-sanity";

export default async function search(req: { query: { query: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) {
  const { query } = req.query;

  const searchQuery = groq`
        *[_type in ["post", 'author', 'category'] 
        && (
        title match $queryString + '*' 
        || name match $queryString + '*')] 
        | order(publishedAt desc){
          title,
          name, 
          bio,
          body,
          'slug' : slug.current,
          description,
          'type': _type,
          
        }
    `;

  const data = await client.fetch(searchQuery, {
    queryString: query,
  });

  res.status(200).json(data);
}