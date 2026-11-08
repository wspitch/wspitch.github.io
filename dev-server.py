#!/usr/bin/env python3
"""Local preview server that never caches and serves /etc as etc.html (like GitHub Pages).
Run: python3 dev-server.py  then open http://localhost:8000"""
import http.server, socketserver, os
class H(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        p=self.path.split('?')[0]
        if p!='/' and not os.path.splitext(p)[1] and os.path.exists('.'+p+'.html'):
            self.path=p+'.html'+('?'+self.path.split('?',1)[1] if '?' in self.path else '')
        super().do_GET()
    def end_headers(self):
        self.send_header('Cache-Control','no-store, max-age=0'); super().end_headers()
socketserver.TCPServer.allow_reuse_address=True
with socketserver.TCPServer(('',8000),H) as s:
    print('Preview at http://localhost:8000  (Ctrl+C to stop)'); s.serve_forever()
