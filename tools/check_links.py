from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import sys

ROOT = Path(__file__).resolve().parents[1]

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs=[]
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        key='href' if tag in {'a','link'} else 'src' if tag in {'img','script','source'} else None
        if key and attrs.get(key): self.refs.append((tag,key,attrs[key]))

errors=[]
html_files=list(ROOT.rglob('*.html'))
for page in html_files:
    parser=Parser()
    parser.feed(page.read_text(encoding='utf-8',errors='replace'))
    for tag,key,ref in parser.refs:
        if ref.startswith(('https://','http://','mailto:','tel:','data:','javascript:','#')): continue
        path=unquote(urlsplit(ref).path)
        if not path: continue
        target=(page.parent/path).resolve()
        if path.endswith('/') or target.is_dir(): target=target/'index.html'
        if not target.exists(): errors.append(f'{page.relative_to(ROOT)} -> {ref}')

if errors:
    print('Broken internal references:')
    print('\n'.join(errors))
    sys.exit(1)
print(f'OK: {len(html_files)} HTML files checked; all internal references resolve.')
