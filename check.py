import socket
from requests import get
def check_port(host, port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(1)
        return s.connect_ex((host, port)) == 0
print(f"Computer name: {socket.gethostname()}")
print(f"Your Computer LAN IP Address is: {socket.gethostbyname(socket.gethostname())}")
print(f"Your Computer WAN IPv4 Address is: {get('https://api.ipify.org').text}")
print(f"Your Computer WAN IPv6 Address is: {get('https://ipapi.co/ip/').text}")