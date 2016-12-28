#!/usr/bin/env bash

echo "set grub-pc/install_devices /dev/sda" | debconf-communicate

apt-get update -y
apt-get upgrade -y

apt-get install -y nodejs
apt-get install -y npm

