# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  # config.vm.boot_timeout = 300
  config.vm.box = "hashicorp/precise64"
  config.vm.box_check_update = false
  config.vm.hostname = 'oi-box'
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "private_network", ip: "192.168.33.10"
  # config.vm.network "public_network"
  config.vm.post_up_message = "Hello Oi"
  config.vm.provision "shell", path: "vagrant/provision.sh", privileged: false

   config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = false

    # Customize the amount of memory on the VM:
    #vb.memory = "1024"
   end

  # config.vm.synced_folder "../data", "/vagrant_data"
  # config.vm.usable_port_range = 2200..2250

end
