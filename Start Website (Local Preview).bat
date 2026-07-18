@echo off
cd /d "%~dp0"
echo Starting local preview server (no-cache mode)...
start "" http://localhost:8000/index.html
python nocache-server.py
