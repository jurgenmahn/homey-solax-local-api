Support for local Solax G3 inverters using the WiFi dongle with local connection and API instead of the cloud connection.

Special thanks to https://github.com/squishykid/solax who did all of the hard work by reverse engineer and implement all inverter API responses, i just ported the python project partly to Homey / NodeJS

Project can be found on https://github.com/jurgenmahn/homey-solax-local-api

Supported inverters
X1
X1 Boost
X1 Hybrid Gen4
X1 Mini
X1 Mini V34
X1 Smart
X3
X3 Hybrid G4
X3 Mic Pro G2
X3 Ultra
X3 V34
X Hybrid

How to use:

Recent inverter models, including those using PocketWifi devices, have undergone changes in their firmware. These updates have altered how their API is accessible:

New Behavior: The API is no longer available when the inverter is connected to your home Wi-Fi network.
Current Access Point: The API remains accessible, but only through the inverter's own broadcasted Wi-Fi network (SSID).
Solution for Integration: To use this sensor with updated inverters, you'll need to set up a reverse proxy system. This involves:

Using a device like a Raspberry Pi
Configuring the Raspberry Pi with two network connections:
a) One connection to your home network
b) Another Wi-Fi connection to the inverter's SSID
Setting up NGINX to act as a reverse proxy

This setup allows you to maintain access to the inverter's API while it's not directly exposed on your main network.

NGINX proxy

IPTables:
iptables -t nat -A PREROUTING -p tcp -d 192.168.1.1 --dport 888 -j DNAT --to-destination 5.8.8.8:80