import { ImageResponse } from 'next/og';
 
// Route segment config
export const runtime = 'edge';
 
// Image API
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
 
    const title = searchParams.get('title') ?? 'India Toolkit';
    const tool = searchParams.get('tool') ?? 'tool';
 
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            backgroundImage: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
            padding: '48px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#4b5563',
              textAlign: 'center',
              maxWidth: '80%',
              lineHeight: 1.5,
            }}
          >
            Free Online {tool.replace(/-/g, ' ')} Tool | India Toolkit
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '48px',
              fontSize: 24,
              fontWeight: 500,
              color: '#6b7280',
            }}
          >
            www.indiatoolkit.in
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response('Failed to generate image', { status: 500 });
  }
}