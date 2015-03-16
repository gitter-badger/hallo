# configure bashrc
cp /vagrant/vagrant/.bashrc /home/vagrant/.bashrc

sudo apt-get update
sudo apt-get install -y python-software-properties git tmux vim build-essential libssl-dev curl htop

wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh

source /home/vagrant/.nvm/nvm.sh

# Installing Node.JS
echo "Installing Node.JS..."

nvm install stable
nvm use stable
nvm alias default stable

echo "Installing Gulp..."

npm install gulp

echo "Installing Bower..."

npm install bower

# configure vim
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
cp /vagrant/vagrant/.vimrc ~/.vimrc
vim +PluginInstall +qall