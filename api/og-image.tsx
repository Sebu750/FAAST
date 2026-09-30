import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Adorzia'
  const subtitle = searchParams.get('subtitle') || 'Where Visionaries Rise'
  const type = searchParams.get('type') || 'website'

  // Truncate long titles
  const displayTitle = title.length > 60 ? title.substring(0, 57) + '...' : title
  const displaySubtitle = subtitle.length > 100 ? subtitle.substring(0, 97) + '...' : subtitle

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#000',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at 20% 80%, rgba(187,148,87,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(111,29,27,0.1) 0%, transparent 50%)',
          }}
        />

        {/* Top border accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #BB9457, #d4af37, #BB9457)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '80px 100px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <span
              style={{
                fontSize: '18px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#BB9457',
                fontWeight: 600,
              }}
            >
              {type === 'article' ? 'JOURNAL' : type === 'profile' ? 'DESIGNER' : 'ADORZIA'}
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
              fontFamily: 'serif',
            }}
          >
            {displayTitle}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '22px',
              color: '#a0a0a0',
              lineHeight: 1.5,
              fontWeight: 300,
              maxWidth: '800px',
            }}
          >
            {displaySubtitle}
          </div>

          {/* Bottom accent line */}
          <div
            style={{
              width: '60px',
              height: '2px',
              backgroundColor: '#BB9457',
              marginTop: '48px',
            }}
          />
        </div>

        {/* Bottom brand */}
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#666',
            }}
          >
            adorzia.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
