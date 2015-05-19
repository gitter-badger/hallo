echo "#"
echo "# Updating package list..."
echo "#"
sudo apt-get update

echo "#"
echo "# Installing esential packages.."
echo "#"
# network
sudo apt-get install -y -q git-core
sudo apt-get install -y -q build-essential checkinstall
sudo apt-get install -y -q libssl-dev
sudo apt-get install -y -q wget
sudo apt-get install -y -q curl
sudo apt-get install -y -q net-tools
sudo apt-get install -y -q netcat
sudo apt-get install -y -q tcpdump

# version control
sudo sudo apt-get install -y git
echo '[color]
  ui = true
[color "branch"]
  current = yellow bold
  local = green bold
  remote = cyan bold
[color "diff"]
  meta = yellow bold
  frag = magenta bold
  old = red bold
  new = green bold
  whitespace = red reverse
[color "status"]
  added = green bold
  changed = yellow bold
  untracked = red bold
' > /etc/gitconfig

# echo "#"
# echo "# Installing ZSH"
# echo "#"
# sudo curl -L http://install.ohmyz.sh | sh
# apt-get install zsh -y
# git clone git://github.com/robbyrussell/oh-my-zsh.git /home/vagrant/.oh-my-zsh
# cp /home/vagrant/.oh-my-zsh/templates/zshrc.zsh-template /home/vagrant/.zshrc
# chsh -s /usr/bin/zsh vagrant
# echo 'export PATH=vendor/bin:$PATH'  >> /home/vagrant/.zshrc
# source /home/vagrant/.zshrc

echo "#"
echo "# Installing NVM"
echo "#"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.1/install.sh | bash
echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.zshrc
source /home/vagrant/.zshrc

echo "#"
echo "# Installing stable node"
echo "#"
nvm install stable
nvm use stable

echo "#"
echo "# Installing Bower"
echo "#"
npm install -g bower

echo "#"
echo "# Installing Gulp"
echo "#"
npm install -g gulp

echo "#"
echo "# Installing Gulp"
echo "#"
npm install -g coffee-script

echo "#"
echo "# Installing Project dependencies"
echo "#"
cd /vagrant/
npm install
npm bower install

echo "#"
echo "#"
echo "#"
echo '  _   _                    ____  _  '
echo ' | \ | |                  / __ \(_) '
echo ' |  \| | _____   _____   | |  | |_  '
echo ' | . ` |/ _ \ \ / / _ \  | |  | | | '
echo ' | |\  | (_) \ V / (_) | | |__| | | '
echo ' |_| \_|\___/ \_/ \___/   \____/|_| '
echo "#"
echo "#"
echo "#"

cd /vagrant
ls
