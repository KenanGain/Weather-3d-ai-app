import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://newsdata.io/api/1/latest', {
      params: {
        apikey: process.env.NEXT_PUBLIC_NEWSDATA_API_KEY, // Your API key
        q: city,
        language: 'en',
      },
    });

    return NextResponse.json(response.data);
   
  } catch (error) {
    console.error('Error fetching news data:', error);
    return NextResponse.json({ error: 'Error fetching news data' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const city = searchParams.get('city');

//   if (!city) {
//     return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
//   }

//   try {
//     // Fake response data
//     const fakeData = {
//       status: 'success',
//       results: [
//         {
//           title: `Breaking News in ${city}`,
//           description: `This is a mock news description for ${city}.`,
//           url: 'https://example.com/news1',
//           source: 'Mock News Agency',
//           publishedAt: new Date().toISOString(),
//         },
//         {
//           title: `Another News Story in ${city}`,
//           description: `Another mock news description for ${city}.`,
//           url: 'https://example.com/news2',
//           source: 'Mock News Network',
//           publishedAt: new Date().toISOString(),
//         },
//       ],
//     };

//     return NextResponse.json(fakeData);
//   } catch (error) {
//     console.error('Error fetching news data:', error);
//     return NextResponse.json({ error: 'Error fetching news data' }, { status: 500 });
//   }
// }
