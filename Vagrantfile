Vagrant.configure("2") do |config|
  config.vm.provider :digital_ocean do |provider, override|
    override.ssh.private_key_path = '~/.ssh/id_rsa' # this automatically creates a private ssh key in your local machine at ~/.ssh/id_rsa and adds a public ssh key in settings>security>ssh keys in your digital ocean account authenticated with digitalocean token so you dont need to do all of this manually
    override.vm.box = 'digital_ocean'
    override.vm.box_url = "https://github.com/devopsgroup-io/vagrant-digitalocean/raw/master/box/digital_ocean.box"
    
    if ENV['DIGITALOCEAN_TOKEN']
      provider.token = ENV['DIGITALOCEAN_TOKEN']
    else
      puts "ERROR: DIGITALOCEAN_TOKEN environment variable not set"
      exit 1
    end

    provider.image = 'ubuntu-20-04-x64'
    provider.region = 'blr1'
    provider.size = 's-2vcpu-2gb'
  end

  # Configure rsync for file synchronization
  config.vm.synced_folder ".", "/vagrant", 
    type: "rsync",
    rsync__exclude: [".git/", "node_modules/", "dist/", ".vagrant/"],
    rsync__auto: true,
    rsync__args: ["--verbose", "--archive", "--delete", "-z"]

  # Add a shell provisioner to create the vagrant user
  config.vm.provision "shell", inline: <<-SHELL
    if ! id -u vagrant >/dev/null 2>&1; then
      useradd -m -s /bin/bash vagrant
      echo "vagrant ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/vagrant
      chmod 440 /etc/sudoers.d/vagrant
    fi
  SHELL

  config.vm.provision "shell", path: "setup.sh"

  # Add a shell provisioner to deploy services
  config.vm.provision "shell", inline: <<-SHELL
    cd /vagrant
    docker compose up -d
    echo "Services deployed! Access them at http://$(curl -s ifconfig.me):8080"
  SHELL
end
