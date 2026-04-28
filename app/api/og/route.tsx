import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') ?? 'India Toolkit';
    const tool = searchParams.get('tool') ?? 'tool';

    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '48px',
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#ffffff',
            backgroundColor: '#10b981',
            padding: '8px 16px',
            borderRadius: '9999px',
            marginBottom: '24px',
            letterSpacing: '0.5px',
          }}
        >
          💎 100% FREE • NO SIGNUP • INSTANT
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '16px',
            textAlign: 'center' as const,
            lineHeight: 1.2,
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center' as const,
            maxWidth: '700px',
            lineHeight: 1.5,
            marginBottom: '40px',
          }}
        >
          Free Online {tool.replace(/-/g, ' ')} Tool
        </div>

        <div
          style={{
            display: 'flex' as const,
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          <div style={{ display: 'flex' as const, alignItems: 'center' as const, gap: '8px' }}>
            <span style={{ fontSize: 20 }}>✓</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#ffffff' }}>Secure</span>
          </div>
          <div style={{ display: 'flex' as const, alignItems: 'center' as const, gap: '8px' }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#ffffff' }}>Fast</span>
          </div>
          <div style={{ display: 'flex' as const, alignItems: 'center' as const, gap: '8px' }}>
            <span style={{ fontSize: 20 }}>🔒</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#ffffff' }}>Private</span>
          </div>
        </div>

        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '1px',
          }}
        >
          WWW.INDIATOOLKIT.IN
        </div>
      </div>,
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
