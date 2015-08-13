# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/trusty64"
  # config.vm.box = "hashicorp/precise64"

  config.vm.box_check_update = false

  config.vm.hostname = "hallo-box"

  config.ssh.forward_agent = true
  config.vm.network "forwarded_port", guest: 3000, host: 3000, auto_correct: true

  # config.vm.network "private_network", ip: "192.168.33.10"
  # config.vm.network "public_network"

  config.vm.post_up_message = "Hallo > 'vagrant ssh'para conectar "

  config.vm.provision "shell", path: "vagrant/provision.sh", privileged: false

  # config.vm.synced_folder "../data", "/vagrant_data"

  # config.vm.usable_port_range = 2200..2250

  config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = false
  #   # Customize the amount of memory on the VM:
  #   #vb.memory = "1024"
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant","1"]
  end

end
