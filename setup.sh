#!/bin/bash

# Function to wait for apt locks to release
wait_for_apt() {
    while ps aux | grep -q '[a]pt'; do
        echo "Waiting for apt to finish..."
        sleep 1
    done
}

# Function to install Docker (for ubuntu vm)
install_docker() {
    echo "Installing Docker..."
    # Add Docker's official GPG key:
    wait_for_apt
    sudo DEBIAN_FRONTEND=noninteractive apt-get update
    sudo DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc || {
        echo "Failed to download Docker GPG key"
        return 1
    }
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" |
        sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

    wait_for_apt
    sudo DEBIAN_FRONTEND=noninteractive apt-get update
    sudo DEBIAN_FRONTEND=noninteractive apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin || {
        echo "Failed to install Docker packages"
        return 1
    }

    # Create docker group and add users
    sudo groupadd -f docker
    sudo usermod -aG docker vagrant
    sudo usermod -aG docker ubuntu

    # Start and enable Docker service
    sudo systemctl start docker
    sudo systemctl enable docker

    # Verify Docker installation
    docker --version || {
        echo "Docker installation verification failed"
        return 1
    }
}

# Function to install Make
install_make() {
    echo "Installing Make..."
    wait_for_apt
    sudo DEBIAN_FRONTEND=noninteractive apt-get update
    sudo DEBIAN_FRONTEND=noninteractive apt-get install -y make || {
        echo "Failed to install Make"
        return 1
    }

    # Verify Make installation
    make --version || {
        echo "Make installation verification failed"
        return 1
    }
}

# Main setup function
main() {
    echo "Starting setup..."
    wait_for_apt
    sudo DEBIAN_FRONTEND=noninteractive apt-get update || {
        echo "Initial apt-get update failed"
        exit 1
    }

    install_docker || {
        echo "Docker installation failed"
        exit 1
    }

    install_make || {   # NOTE: there is no need of makefile over here so remove in future
        echo "Make installation failed"
        exit 1
    }

    echo "Setup completed successfully!"
}

# Run main setup
main
