#!/usr/bin/env python3
"""Local preview server that never caches. Run: python3 dev-server.py  then open http://localhost:8000"""
import http.server, socketserver
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-store, max-age=0'); super().end_headers()
socketserver.TCPServer.allow_reuse_address=True
with socketserver.TCPServer(('',8000),H) as s:
    print('Preview at http://localhost:8000  (Ctrl+C to stop)'); s.serve_forever()
