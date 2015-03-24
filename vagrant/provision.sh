# configure bashrc
cp /vagrant/vagrant/.bashrc /home/vagrant/.bashrc

echo "Updating package list..."
sudo apt-get update

echo "Installing NodeJs..."
sudo apt-get install -y python-software-properties

echo "Installing Git..."
sudo apt-get install -y git

echo "Installing Tmux..."
sudo apt-get install -y tmux

echo "Installing Vim..."
sudo apt-get install -y vim

echo "Installing build-essential..."
sudo apt-get install -y build-essential

echo "Installing libssl-dev..."
sudo apt-get install -y libssl-dev

echo "Installing curl..."
sudo apt-get install -y curl

echo "Installing htop..."
sudo apt-get install -y htop

echo "Installing NodeJs..."
sudo apt-get install -y nodejs

echo "Installing NPM..."
sudo apt-get install -y npm

echo "Installing NVM..."
git clone git://github.com/creationix/nvm.git ~/.nvm
# npm install -g nvm
source /home/vagrant/.nvm/nvm.sh

echo "Config NVM..."
nvm install stable
nvm use stable
nvm alias default stable

echo "Installing Project dependencies..."
npm install -g bower
npm install -g gulp
cd /vagrant/
npm install
npm bower install

echo '  _   _                    ____  _  '
echo ' | \ | |                  / __ \(_) '
echo ' |  \| | _____   _____   | |  | |_  '
echo ' | . ` |/ _ \ \ / / _ \  | |  | | | '
echo ' | |\  | (_) \ V / (_) | | |__| | | '
echo ' |_| \_|\___/ \_/ \___/   \____/|_| '

# # configure vim
# # git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
# # cp /vagrant/vagrant/.vimrc ~/.vimrc
# # vim +PluginInstall +qall
