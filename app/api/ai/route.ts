import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Replace with your actual API key
});
export async function POST(req: NextRequest) {
    try {
      const { city, weather, temperature, wind, humidity, uv, pressure } = await req.json();
  
      if (!city || !weather || !temperature || !wind || !humidity || !uv || !pressure) {
        return new NextResponse(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
      }
  
      // Log the input data
      console.log(`City: ${city}, Weather: ${weather}, Temperature: ${temperature}, Wind: ${wind}, Humidity: ${humidity}, UV Index: ${uv}, Pressure: ${pressure} hPa`);
  
      const prompt = `
        Generate a weather insight for the given city with the following data:
        City: ${city}
        Weather: ${weather}
        Temperature: ${temperature}
        Wind: ${wind}
        Humidity: ${humidity}
        UV Index: ${uv}
        Pressure: ${pressure} hPa
  
        Please provide the output in the following JSON format:
  
        {
          "information": "Your generated response here"
        }
      `;
  
      // Log the prompt
      console.log("Prompt sent to OpenAI:", prompt);
  
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Specify the desired model
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }],
      });
  
      // Extract the "information" content
      const aiResponseContent = response.choices?.[0]?.message?.content?.trim();
      console.log(aiResponseContent)
      if (!aiResponseContent) {
        throw new Error('No content found in AI response');
      }
  
      // Assuming the response content is a JSON string
      let aiInformation;
      try {
        aiInformation = JSON.parse(aiResponseContent)?.information;
      } catch (error) {
        console.error('Error parsing AI response content:', error);
        return new NextResponse(JSON.stringify({ error: 'Error parsing AI response content' }), { status: 500 });
      }
  
      // Construct the response object
      const result = {
        id: 1,
        location: city,
        prompt: `Current weather and forecast for ${city}`,
        information: aiInformation,
        model: "WeatherGPT",
        generatedAt: new Date().toISOString()
      };
  
      return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return new NextResponse(JSON.stringify({ error: 'Error generating response from OpenAI' }), { status: 500 });
    }
  }