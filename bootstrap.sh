#!/usr/bin/env bash

#echo "set grub-pc/install_devices /dev/sda" | debconf-communicate

#apt-get update -y
#apt-get upgrade -y

wget https://nodejs.org/dist/v6.9.2/node-v6.9.2-linux-x64.tar.xz

sudo tar -C /usr/local --strip-components 1 -xf node-v6.9.2-linux-x64.tar.xz
