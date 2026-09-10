"""Generate flat, outlined SVG illustrations for each vocabulary word.
Style matches the app bunny: ink #3a3356 outlines, pastel fills, rounded shapes.
Output: /home/user/malone-mandarin/img/<name>.svg
"""
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "img")
os.makedirs(OUT, exist_ok=True)

INK = "#3a3356"
S = f'stroke="{INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"'

def svg(body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">'
            f'{body}</svg>')

icons = {}

# 教室 classroom: chalkboard on the wall, a desk with an apple.
icons["classroom"] = svg(f'''
<rect x="14" y="14" width="92" height="56" rx="6" fill="#c9a27a" {S}/>
<rect x="20" y="20" width="80" height="44" rx="3" fill="#4f9d75" {S}/>
<path d="M30 32 h28 M30 42 h40 M30 52 h22" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity=".9"/>
<path d="M78 46 l6 -8 l6 8 z" fill="#ffd93d" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
<rect x="24" y="80" width="72" height="12" rx="4" fill="#e8c9a3" {S}/>
<path d="M32 92 v14 M88 92 v14" {S}/>
<circle cx="60" cy="74" r="8" fill="#ff6b6b" {S}/>
<path d="M60 66 q2 -6 6 -6" {S} fill="none"/>
<path d="M60 67 q-6 -4 -8 1 q4 2 8 -1z" fill="#6bcb77" {S}/>
''')

# 圖書館 library: bookshelf with colourful books.
books = ""
colors = ["#ff8fb1", "#ffd93d", "#6bcb77", "#4d96ff", "#c779ff", "#ff6b6b", "#4d96ff", "#ffd93d", "#6bcb77", "#ff8fb1"]
x = 22
for i, w in enumerate([10, 8, 12, 9, 11]):
    h = 26 + (i % 3) * 3
    books += f'<rect x="{x}" y="{58-h}" width="{w}" height="{h}" rx="2" fill="{colors[i]}" {S}/>'
    x += w + 2
x = 22
for i, w in enumerate([11, 9, 10, 12, 8]):
    h = 25 + ((i + 1) % 3) * 3
    books += f'<rect x="{x}" y="{96-h}" width="{w}" height="{h}" rx="2" fill="{colors[i+5]}" {S}/>'
    x += w + 2
icons["library"] = svg(f'''
<rect x="14" y="14" width="92" height="92" rx="6" fill="#c9a27a" {S}/>
<rect x="20" y="20" width="80" height="80" fill="#f3e2c7" {S}/>
{books}
<path d="M20 60 h80 M20 98 h80" {S}/>
<path d="M78 42 l12 -14 l4 2 l-10 14 z" fill="#ff8fb1" {S}/>
''')

# 操場 playground: slide, sun, grass, ball.
icons["playground"] = svg(f'''
<circle cx="92" cy="26" r="11" fill="#ffd93d" {S}/>
<path d="M92 8 v5 M92 39 v5 M74 26 h5 M105 26 h5 M79 13 l4 4 M101 35 l4 4 M105 13 l-4 4 M83 35 l-4 4" {S}/>
<path d="M8 104 q26 -10 52 0 q26 10 52 0 v10 h-104 z" fill="#8fd67f" {S}/>
<path d="M28 96 v-58 h14 v58" fill="#ffd3e0" {S}/>
<path d="M28 46 h14 M28 56 h14 M28 66 h14 M28 76 h14 M28 86 h14" {S}/>
<path d="M42 38 h14 q6 0 10 8 l24 44 q3 6 -4 6 h-8 q-4 0 -6 -4 l-22 -40 h-8 z" fill="#4d96ff" {S}/>
<circle cx="24" cy="96" r="9" fill="#ff6b6b" {S}/>
<path d="M17 90 q7 6 14 0 M17 102 q7 -6 14 0" {S} fill="none"/>
''')

# 禮堂 auditorium: stage with red curtains and a spotlight star.
icons["auditorium"] = svg(f'''
<rect x="10" y="10" width="100" height="100" rx="8" fill="#fff3c4" {S}/>
<rect x="10" y="10" width="100" height="18" rx="6" fill="#ff6b6b" {S}/>
<path d="M14 28 q0 44 20 48 q-10 -20 -8 -48 z" fill="#ff6b6b" {S}/>
<path d="M106 28 q0 44 -20 48 q10 -20 8 -48 z" fill="#ff6b6b" {S}/>
<path d="M22 60 q6 8 12 0" {S} fill="none"/>
<path d="M86 60 q6 8 12 0" {S} fill="none"/>
<path d="M60 20 l22 58 h-44 z" fill="#ffffff" opacity=".7"/>
<rect x="18" y="82" width="84" height="20" rx="4" fill="#c9a27a" {S}/>
<path d="M60 50 l4 9 l10 1 l-7 7 l2 10 l-9 -5 l-9 5 l2 -10 l-7 -7 l10 -1 z" fill="#ffd93d" {S}/>
''')

# 餐廳 restaurant: table with cloth, plate, fork & knife, a candle.
icons["restaurant"] = svg(f'''
<path d="M10 62 h100 l-8 12 h-84 z" fill="#ff8fb1" {S}/>
<path d="M26 74 v34 M94 74 v34" {S}/>
<ellipse cx="60" cy="56" rx="22" ry="9" fill="#ffffff" {S}/>
<ellipse cx="60" cy="56" rx="13" ry="5" fill="#f0e4f3" {S}/>
<path d="M26 40 v20 M22 40 v8 M30 40 v8 M22 48 q4 4 8 0" {S} fill="none"/>
<path d="M94 40 v20 M94 40 q6 6 0 14" {S} fill="none"/>
<rect x="56" y="24" width="8" height="18" rx="2" fill="#ffffff" {S}/>
<path d="M60 24 q-5 -8 0 -12 q5 4 0 12 z" fill="#ffd93d" {S}/>
''')

# 食堂 cafeteria: lunch tray with sandwich, apple, milk carton.
icons["cafeteria"] = svg(f'''
<rect x="10" y="34" width="100" height="70" rx="10" fill="#ffd93d" {S}/>
<rect x="18" y="42" width="44" height="54" rx="6" fill="#fff8e1" {S}/>
<rect x="68" y="42" width="34" height="24" rx="5" fill="#fff8e1" {S}/>
<rect x="68" y="72" width="34" height="24" rx="5" fill="#fff8e1" {S}/>
<path d="M24 82 l32 0 l-6 -14 h-20 z" fill="#f4c26b" {S}/>
<path d="M22 70 h36 l-4 -8 h-28 z" fill="#8fd67f" {S}/>
<path d="M24 62 l32 0 l-5 -10 h-22 z" fill="#f4c26b" {S}/>
<circle cx="85" cy="55" r="8" fill="#ff6b6b" {S}/>
<path d="M85 47 q3 -5 6 -4" {S} fill="none"/>
<path d="M76 92 v-12 l4 -6 h10 l4 6 v12 z" fill="#4d96ff" {S}/>
<path d="M80 74 h10" {S}/>
''')

# 洗手間 restroom: sign with two figures.
icons["restroom"] = svg(f'''
<rect x="12" y="12" width="96" height="96" rx="12" fill="#4d96ff" {S}/>
<path d="M60 22 v76" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
<circle cx="37" cy="36" r="7" fill="#ffffff" {S}/>
<rect x="29" y="46" width="16" height="22" rx="5" fill="#ffffff" {S}/>
<path d="M32 68 v20 M42 68 v20" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
<path d="M32 68 v20 M42 68 v20" {S}/>
<circle cx="83" cy="36" r="7" fill="#ffffff" {S}/>
<path d="M83 46 l-14 28 h28 z" fill="#ffffff" {S}/>
<path d="M79 74 v14 M87 74 v14" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
<path d="M79 74 v14 M87 74 v14" {S}/>
''')

# 辦公室 office: desk with computer, papers, pencil cup.
icons["office"] = svg(f'''
<rect x="10" y="78" width="100" height="10" rx="4" fill="#c9a27a" {S}/>
<path d="M20 88 v20 M100 88 v20" {S}/>
<rect x="34" y="30" width="52" height="36" rx="5" fill="#3a3356" {S}/>
<rect x="39" y="35" width="42" height="26" rx="2" fill="#a8d8ff"/>
<path d="M45 42 h20 M45 49 h28 M45 56 h14" stroke="#3a3356" stroke-width="3" stroke-linecap="round"/>
<path d="M52 66 h16 l3 12 h-22 z" fill="#8a8aa0" {S}/>
<rect x="12" y="62" width="18" height="16" rx="2" fill="#ffffff" {S}/>
<path d="M16 68 h10 M16 73 h7" {S}/>
<rect x="90" y="58" width="14" height="20" rx="3" fill="#ff8fb1" {S}/>
<path d="M94 58 v-14 M100 58 v-18" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>
<path d="M94 58 v-14 M100 58 v-18" stroke="#ffd93d" stroke-width="3" stroke-linecap="round"/>
''')

# 東南西北 compass rose with one direction highlighted.
def compass(active):
    arrows = {
        "N": ("M60 22 l9 28 h-18 z", ""),
        "E": ("M98 60 l-28 9 v-18 z", ""),
        "S": ("M60 98 l-9 -28 h18 z", ""),
        "W": ("M22 60 l28 -9 v18 z", ""),
    }
    labels = {"N": (60, 15), "E": (110, 65), "S": (60, 116), "W": (10, 65)}
    body = f'<circle cx="60" cy="60" r="30" fill="#ffffff" {S}/>'
    for k, (d, _) in arrows.items():
        fill = "#ff6b6b" if k == active else "#e9e4f0"
        body += f'<path d="{d}" fill="{fill}" {S}/>'
    body += f'<circle cx="60" cy="60" r="6" fill="#ffd93d" {S}/>'
    for k, (x, y) in labels.items():
        col = "#ff6b6b" if k == active else INK
        body += (f'<text x="{x}" y="{y}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" '
                 f'font-size="14" font-weight="800" fill="{col}">{k}</text>')
    return svg(body)

icons["north"] = compass("N")
icons["east"] = compass("E")
icons["south"] = compass("S")
icons["west"] = compass("W")

# 是 is / yes: smiling kid nodding "yes" beside a big green check.
icons["yes"] = svg(f'''
<path d="M6 112 q38 -44 76 0 z" fill="#c779ff" {S}/>
<circle cx="44" cy="54" r="26" fill="#ffe0b2" {S}/>
<path d="M20 48 q4 -22 26 -22 q20 0 24 20 q-12 -10 -24 -8 q-16 0 -26 10 z" fill="#3a3356"/>
<circle cx="35" cy="54" r="3" fill="{INK}"/>
<circle cx="53" cy="54" r="3" fill="{INK}"/>
<path d="M34 64 q10 10 20 0" {S} fill="none"/>
<circle cx="29" cy="63" r="4" fill="#ffb6c1" opacity=".8"/>
<circle cx="59" cy="63" r="4" fill="#ffb6c1" opacity=".8"/>
<circle cx="90" cy="36" r="22" fill="#6bcb77" {S}/>
<path d="M78 36 l9 9 l16 -18" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
''')

# 個 (measure word): one single apple with a "1" tag.
icons["one"] = svg(f'''
<circle cx="60" cy="68" r="30" fill="#ff6b6b" {S}/>
<path d="M60 38 q3 -12 12 -14" {S} fill="none"/>
<path d="M60 40 q-14 -10 -20 2 q10 6 20 -2 z" fill="#6bcb77" {S}/>
<ellipse cx="48" cy="58" rx="6" ry="9" fill="#ffffff" opacity=".5"/>
<rect x="80" y="14" width="26" height="28" rx="6" fill="#ffd93d" {S}/>
<text x="93" y="36" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800" fill="{INK}">1</text>
''')

# 去 go: a chunky kid running toward an open door, with motion lines and an arrow.
icons["go"] = svg(f'''
<rect x="80" y="18" width="30" height="88" rx="3" fill="#e8c9a3" {S}/>
<path d="M80 18 l-18 10 v80 l18 -4 z" fill="#c9a27a" {S}/>
<circle cx="72" cy="64" r="3" fill="#ffd93d" {S}/>
<path d="M40 54 l-8 12 M46 54 l16 6" {S} fill="none"/>
<path d="M32 50 h20 q4 0 4 4 v22 h-28 v-22 q0 -4 4 -4 z" fill="#4d96ff" {S}/>
<path d="M34 76 l-8 18 M50 76 l10 14" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>
<path d="M34 76 l-8 18 M50 76 l10 14" stroke="#ffe0b2" stroke-width="5" stroke-linecap="round"/>
<circle cx="42" cy="34" r="14" fill="#ffe0b2" {S}/>
<path d="M28 32 q2 -16 16 -14 q12 2 12 14 q-8 -6 -14 -4 q-8 0 -14 4 z" fill="#3a3356"/>
<circle cx="38" cy="36" r="2.2" fill="{INK}"/>
<circle cx="47" cy="36" r="2.2" fill="{INK}"/>
<path d="M39 42 q4 4 8 0" {S} fill="none"/>
<path d="M8 66 h10 M4 76 h12 M8 86 h8" {S}/>
<path d="M40 12 h26 l-7 -7 M66 12 l-7 7" {S} fill="none"/>
''')

# 有 have: a kid hugging a teddy bear close ("I have a bear").
icons["have"] = svg(f'''
<path d="M10 114 q50 -50 100 0 z" fill="#4d96ff" {S}/>
<circle cx="60" cy="36" r="20" fill="#ffe0b2" {S}/>
<path d="M40 34 q2 -20 20 -18 q18 2 20 18 q-10 -8 -20 -6 q-12 0 -20 6 z" fill="#3a3356"/>
<circle cx="53" cy="38" r="2.6" fill="{INK}"/>
<circle cx="67" cy="38" r="2.6" fill="{INK}"/>
<path d="M54 45 q6 5 12 0" {S} fill="none"/>
<circle cx="47" cy="44" r="3.5" fill="#ffb6c1" opacity=".8"/>
<circle cx="73" cy="44" r="3.5" fill="#ffb6c1" opacity=".8"/>
<circle cx="60" cy="84" r="16" fill="#c9a27a" {S}/>
<circle cx="49" cy="72" r="5" fill="#c9a27a" {S}/>
<circle cx="71" cy="72" r="5" fill="#c9a27a" {S}/>
<circle cx="55" cy="82" r="2" fill="{INK}"/>
<circle cx="65" cy="82" r="2" fill="{INK}"/>
<ellipse cx="60" cy="89" rx="5" ry="3.5" fill="#e8c9a3" {S}/>
<circle cx="60" cy="88" r="1.6" fill="{INK}"/>
<path d="M26 74 q-4 20 18 26 M94 74 q4 20 -18 26" stroke="{INK}" stroke-width="10" stroke-linecap="round" fill="none"/>
<path d="M26 74 q-4 20 18 26 M94 74 q4 20 -18 26" stroke="#ffe0b2" stroke-width="6" stroke-linecap="round" fill="none"/>
''')

# 東西 stuff / things: open box overflowing with toys.
icons["things"] = svg(f'''
<path d="M20 60 h80 v44 h-80 z" fill="#e8c9a3" {S}/>
<path d="M20 60 l-8 -14 h96 l-8 14 z" fill="#c9a27a" {S}/>
<path d="M60 60 v44" {S} opacity=".4"/>
<circle cx="38" cy="46" r="12" fill="#ff6b6b" {S}/>
<path d="M28 42 q10 8 20 0 M28 50 q10 -8 20 0" {S} fill="none"/>
<rect x="52" y="34" width="20" height="20" rx="3" fill="#4d96ff" {S}/>
<text x="62" y="49" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="800" fill="#ffffff">A</text>
<circle cx="86" cy="42" r="9" fill="#c9a27a" {S}/>
<circle cx="79" cy="35" r="3.5" fill="#c9a27a" {S}/>
<circle cx="93" cy="35" r="3.5" fill="#c9a27a" {S}/>
<circle cx="83" cy="41" r="1.6" fill="{INK}"/>
<circle cx="89" cy="41" r="1.6" fill="{INK}"/>
<path d="M84 46 q2 2 4 0" {S} fill="none"/>
<path d="M96 24 l3 8 l8 1 l-6 5 l2 8 l-7 -4 l-7 4 l2 -8 l-6 -5 l8 -1 z" fill="#ffd93d" {S}/>
''')

for name, body in icons.items():
    with open(os.path.join(OUT, f"{name}.svg"), "w") as f:
        f.write(body.strip() + "\n")
print("wrote", len(icons), "icons:", ", ".join(sorted(icons)))
