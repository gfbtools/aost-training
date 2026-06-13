import React from 'react'

export default function ContentBlocks({ blocks }) {
  return (
    <div>
      {blocks.map((block, i) => <Block key={i} block={block} />)}
    </div>
  )
}

function Block({ block }) {
  const t = block.type

  if (t === 'heading') return (
    <h3 style={{
      fontSize: 19, fontWeight: 700, color: 'var(--white)',
      margin: '32px 0 12px',
      borderLeft: '3px solid var(--teal)', paddingLeft: 14,
    }}>{block.text}</h3>
  )

  if (t === 'body') return (
    <p className="body-lg" style={{ marginBottom: 16 }}>{block.text}</p>
  )

  if (t === 'mission') return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(14,124,123,0.18), rgba(27,108,168,0.12))',
      border: '1px solid rgba(14,124,123,0.35)',
      borderRadius: 12, padding: '24px 28px', margin: '24px 0', textAlign: 'center',
    }}>
      <div className="label-sm" style={{ color: 'var(--teal)', marginBottom: 12 }}>Our Mission</div>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 22, fontStyle: 'italic', color: 'var(--white)',
        fontWeight: 600, lineHeight: 1.4,
      }}>{block.text}</div>
    </div>
  )

  if (t === 'callout' || t === 'callout-gold' || t === 'callout-blue') {
    const c = t === 'callout-gold' ? 'var(--gold)' : t === 'callout-blue' ? 'var(--blue2)' : 'var(--teal)'
    const bg = t === 'callout-gold' ? 'rgba(200,146,42,0.08)' : t === 'callout-blue' ? 'rgba(37,128,192,0.08)' : 'rgba(14,124,123,0.08)'
    return (
      <div style={{
        borderLeft: `3px solid ${c}`, background: bg,
        borderRadius: '0 10px 10px 0', padding: '16px 20px', margin: '20px 0',
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: c, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 10 }}>
          {block.label}
        </div>
        <div className="body-md" style={{ whiteSpace: 'pre-line' }}>{block.text}</div>
      </div>
    )
  }

  if (t === 'list') return (
    <ul style={{ margin: '12px 0 20px', listStyle: 'none', padding: 0 }}>
      {block.items.map((item, i) => (
        <li key={i} style={{
          display: 'flex', gap: 12, alignItems: 'flex-start',
          padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
          fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.75)',
        }}>
          <span style={{
            width: 20, height: 20, borderRadius: '50%', background: 'var(--teal)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 700, color: 'var(--white)', flexShrink: 0, marginTop: 2,
          }}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  )

  if (t === 'comparison') return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '20px 0' }}>
      {[block.left, block.right].map((col, ci) => (
        <div key={ci} style={{
          background: ci === 1 ? 'rgba(14,124,123,0.10)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${ci === 1 ? 'rgba(14,124,123,0.3)' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: 12, padding: '18px 18px',
        }}>
          <div style={{
            fontSize: 12, fontWeight: 700, letterSpacing: '0.5px',
            textTransform: 'uppercase', color: col.color, marginBottom: 14,
          }}>{col.title}</div>
          {col.items.map((item, i) => (
            <div key={i} style={{
              fontSize: 13, lineHeight: 1.6,
              color: ci === 1 ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.42)',
              padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', gap: 8, alignItems: 'flex-start',
            }}>
              <span style={{ color: col.color, fontSize: 9, marginTop: 5, flexShrink: 0 }}>
                {ci === 1 ? '▶' : '–'}
              </span>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  if (t === 'value-block') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '20px 0' }}>
      {block.values.map((v, i) => (
        <div key={i} style={{
          background: 'var(--navy2)', border: '1px solid var(--border)',
          borderLeft: '4px solid var(--teal)', borderRadius: '0 10px 10px 0', padding: '20px 22px',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--teal)', marginBottom: 8 }}>{v.title}</div>
          <div className="body-md">{v.body}</div>
        </div>
      ))}
    </div>
  )

  if (t === 'standards') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0' }}>
      {block.items.map((item, i) => (
        <div key={i} style={{
          background: 'var(--navy2)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '16px 20px', display: 'flex', gap: 14,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'rgba(14,124,123,0.2)', border: '1px solid rgba(14,124,123,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: 'var(--teal)', flexShrink: 0, marginTop: 2,
          }}>{i + 1}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--white)', marginBottom: 5 }}>{item.title}</div>
            <div className="body-md">{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  )

  if (t === 'procedure-list') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0' }}>
      {block.procedures.map((p, i) => (
        <div key={i} style={{
          background: 'var(--navy2)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '16px 20px',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--teal)', marginBottom: 7 }}>{p.name}</div>
          <div className="body-md">{p.detail}</div>
        </div>
      ))}
    </div>
  )

  if (t === 'placeholder') return (
    <div style={{
      background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.14)',
      borderRadius: 10, padding: '16px 20px', margin: '20px 0',
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>{block.label}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, fontStyle: 'italic' }}>{block.text}</div>
    </div>
  )

  if (t === 'levels') return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, margin: '20px 0' }}>
      {block.levels.map((level, i) => (
        <div key={i} style={{
          background: `${level.color}18`,
          border: `1px solid ${level.color}40`,
          borderTop: `3px solid ${level.color}`,
          borderRadius: '0 0 10px 10px',
          padding: '18px 16px',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: level.color, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 6 }}>
            {level.title}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>{level.subtitle}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{level.desc}</div>
        </div>
      ))}
    </div>
  )

  return null
}
