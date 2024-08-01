import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        list: 'search',
        srsearch:query,
        format: 'json',
        origin: '*',
      },
    });

    return NextResponse.json(response.data.query.search);
  } catch (error) {
    console.error('Wikipedia API error:', error);
    return NextResponse.json({ error: 'Error fetching data from Wikipedia' }, { status: 500 });
  }
}